import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getStorefrontSettings } from '@/lib/storefrontSettings.server';
import { hash } from 'bcryptjs';
import { sendAffiliateApplicationReceivedEmail } from '@/lib/email';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeChannelUrl(value: unknown) {
  if (typeof value !== 'string' || value.length > 500) return null;
  try {
    const url = new URL(value.trim());
    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const storefrontSettings = await getStorefrontSettings();

    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const mobileNumber = typeof body?.mobileNumber === 'string' ? body.mobileNumber.trim() : '';
    const channelLink1 = normalizeChannelUrl(body?.channelLink1);
    const channelLink2 = normalizeChannelUrl(body?.channelLink2);

    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }
    
    if (!mobileNumber || !channelLink1) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }

    // Default dummy values for Prisma schema fields the user removed from the frontend
    const fullName = email.split('@')[0];
    const city = 'Not Provided';
    const socialPlatform = 'Other';
    const socialProfileUrl = channelLink1;
    const followerCount = 0;
    const contentCategory = channelLink2 || 'Not Provided';
    const paymentInformation = {};

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const temporaryPassword = await hash(Math.random().toString(36).slice(-10), 10);
      user = await prisma.user.create({
        data: {
          email,
          name: fullName,
          password: temporaryPassword,
          role: 'USER',
        },
      });
    }

    const existingProfile = await prisma.affiliateProfile.findUnique({
      where: { creatorId: user.id },
    });

    if (existingProfile && ['Pending', 'Under Review', 'Approved'].includes(existingProfile.status)) {
      return NextResponse.json(
        { error: 'You already have an active or pending affiliate profile.' },
        { status: 400 },
      );
    }

    let profile;
    if (existingProfile) {
      profile = await prisma.affiliateProfile.update({
        where: { creatorId: user.id },
        data: {
          fullName,
          mobileNumber,
          email,
          city,
          socialPlatform,
          socialProfileUrl,
          followerCount,
          contentCategory,
          paymentInformation,
          status: 'Pending',
        },
      });
    } else {
      profile = await prisma.affiliateProfile.create({
        data: {
          creatorId: user.id,
          fullName,
          mobileNumber,
          email,
          city,
          socialPlatform,
          socialProfileUrl,
          followerCount,
          contentCategory,
          paymentInformation,
          status: 'Pending',
        },
      });
    }

    // Create or update the legacy AffiliateApplication record for the Admin Panel
    const existingApp = await prisma.affiliateApplication.findFirst({ where: { email } });
    if (existingApp) {
      await prisma.affiliateApplication.update({
        where: { id: existingApp.id },
        data: {
          channelLink1,
          channelLink2: channelLink2 || null,
          status: 'PENDING',
        }
      });
    } else {
      await prisma.affiliateApplication.create({
        data: {
          email,
          channelLink1,
          channelLink2: channelLink2 || null,
          status: 'PENDING',
        },
      });
    }

    try {
      // Fire automated welcome email synchronously but catch errors so DB transaction isn't rolled back
      await sendAffiliateApplicationReceivedEmail(email, fullName);
      console.log(`Successfully sent affiliate welcome email to ${email}`);
    } catch (emailError) {
      console.error('Failed to send affiliate welcome email (SMTP error or config missing):', emailError);
      // We continue since the DB save was successful!
    }

    return NextResponse.json({
      success: true,
      message: 'Your application has been received and is currently pending review.',
    });
  } catch (error) {
    console.error('Affiliate application database or schema validation error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred processing your application.' },
      { status: 500 },
    );
  }
}
