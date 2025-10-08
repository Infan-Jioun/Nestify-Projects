// app/api/auth/verify-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/app/models/user";
import OTP from "@/app/models/otp";
import { sendEmail } from "@/lib/nodemailer";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Delete previous OTPs for this email
        await OTP.deleteMany({ email });

        // Save new OTP
        await OTP.create({
            email,
            otp,
            expiresAt
        });

        // Send verification email with OTP
        const otpMessage = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f9fafb; }
                    .header { text-align: center; padding: 20px 0; }
                    .logo { font-size: 24px; font-weight: bold; color: #22c55e; }
                    .content { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                    .otp-code { font-size: 32px; font-weight: bold; color: #22c55e; text-align: center; margin: 20px 0; padding: 15px; background: #f0fdf4; border-radius: 8px; letter-spacing: 5px; }
                    .warning { color: #dc2626; font-size: 14px; text-align: center; }
                    .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="logo">Nestify</div>
                    </div>
                    <div class="content">
                        <h2 style="text-align: center; color: #1f2937;">Verify Your Email Address</h2>
                        <p style="color: #4b5563; line-height: 1.6;">Use the OTP code below to verify your email address:</p>
                        
                        <div class="otp-code">${otp}</div>
                        
                        <p class="warning">This OTP will expire in 10 minutes.</p>
                        
                        <p style="color: #4b5563; line-height: 1.6;">If you didn't request this, please ignore this email.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 Nestify. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

        await sendEmail({
            to: email,
            subject: "Your Nestify Verification OTP",
            html: otpMessage
        });

        return NextResponse.json({
            message: "Verification OTP sent to your email",
            success: true
        });

    } catch (error) {
        console.error("Send verification OTP error:", error);
        return NextResponse.json(
            { error: "Failed to send verification OTP" },
            { status: 500 }
        );
    }
}