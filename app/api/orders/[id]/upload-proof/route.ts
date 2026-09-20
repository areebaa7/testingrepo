import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import prisma from '@/lib/prisma';
import { sendPaymentProofReceivedEmail } from '@/lib/email';
import { assertRequestSize, MAX_RECEIPT_BYTES, validateUploadFile } from '@/lib/uploadSecurity';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    assertRequestSize(request, MAX_RECEIPT_BYTES + 256 * 1024);
    
    // Handle Next.js 14/15 params
    const resolvedParams = context.params instanceof Promise ? await context.params : context.params;
    const orderId = resolvedParams?.id;

    if (!orderId) {
      return NextResponse.json({ success: false, error: 'Order ID is required.' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found.' }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: 'Payment proof image is required.' }, { status: 400 });
    }

    const validated = await validateUploadFile(file, { allowImages: true, allowVideos: false, imageMaxBytes: MAX_RECEIPT_BYTES, receipt: true });
    
    const fileBuffer = (validated as any)?.buffer || validated;

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'receipts' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(Buffer.from(fileBuffer));
    });

    const publicUrl = (uploadResult as any).secure_url;

    // Update the order with the new screenshot URL
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentProofScreenshotUrl: publicUrl,
        status: order.status === 'NEW' || order.status === 'PENDING' ? 'PAYMENT_PENDING' : undefined,
      }
    });

    // Fire off the email notification and await, catching errors so it doesn't fail the upload
    if (order.shippingEmail) {
      try {
        await sendPaymentProofReceivedEmail(order.shippingEmail, order.id);
        console.log(`Successfully sent payment proof received email to ${order.shippingEmail}`);
      } catch (emailErr) {
        console.error('Failed to send proof received email (SMTP error or config missing):', emailErr);
        // Continue since the upload and DB update succeeded
      }
    }

    return NextResponse.json({ success: true, url: publicUrl });

  } catch (error: any) {
    console.error('Upload proof database or file handling error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
