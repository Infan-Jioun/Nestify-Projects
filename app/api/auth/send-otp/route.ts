import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import OTP from "@/app/models/otp";
import { sendEmail } from "@/lib/nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectToDatabase();

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Delete previous OTPs for this email
    await OTP.deleteMany({ email });

    // Save new OTP
    await OTP.create({
      email,
      otp,
      expiresAt
    });

    // Send OTP email
    const message = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          .container { max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; }
          .otp-code { font-size: 32px; font-weight: bold; color: #22c55e; text-align: center; margin: 20px 0; }
          .warning { color: #dc2626; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Your OTP Code</h2>
          <p>Use the following OTP to reset your password:</p>
          <div class="otp-code">${otp}</div>
          <p class="warning">This OTP will expire in 5 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      </body>
      </html>
    `;

    await sendEmail({
      to: email,
      subject: "Your Nestify OTP Code",
      html: message
    });

    return NextResponse.json({ 
      message: "OTP sent to your email",
      success: true 
    });

  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}