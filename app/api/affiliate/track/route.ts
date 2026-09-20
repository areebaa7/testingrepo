import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const ref = url.searchParams.get('ref');
  const redirect = url.searchParams.get('redirect') || '/';

  if (!ref) {
    return NextResponse.redirect(new URL(redirect, request.url));
  }

  try {
    const profile = await prisma.affiliateProfile.findUnique({
      where: { assignedAffiliateLinkRef: ref },
    });

    if (profile && profile.status === 'Approved') {
      const response = NextResponse.redirect(new URL(redirect, request.url));
      
      // Set secure cookie for 14 days
      response.cookies.set('affiliate_ref', ref, {
        path: '/',
        maxAge: 60 * 60 * 24 * 14,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      return response;
    }
  } catch (error) {
    console.error('Affiliate tracking error:', error);
  }

  return NextResponse.redirect(new URL(redirect, request.url));
}
