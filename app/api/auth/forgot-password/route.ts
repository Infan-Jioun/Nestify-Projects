import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectToDatabase from "@/lib/mongodb";
import User from "@/app/models/user";
import { sendEmail } from "@/lib/nodemailer";

export async function POST(request: NextRequest) {
    const startTime = Date.now();

    try {
        console.log('🚀 PRODUCTION: Forgot Password API Called');

        // Enhanced environment check
        const envCheck = {
            NODE_ENV: process.env.NODE_ENV,
            EMAIL_USER_SET: !!process.env.EMAIL_USER,
            EMAIL_PASSWORD_SET: !!process.env.EMAIL_PASSWORD,
            NEXTAUTH_URL: process.env.NEXTAUTH_URL,
            MONGODB_URL_SET: !!process.env.MONGODB_URL
        };

        console.log('🔍 Production Environment Check:', envCheck);

        // Parse request
        let body;
        try {
            body = await request.json();
        } catch (error) {
            console.error('❌ JSON Parse Error:', error);
            return NextResponse.json(
                { error: "Invalid request format" },
                { status: 400 }
            );
        }

        const { email } = body;

        // Validation
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
        }

        // Database connection
        try {
            await connectToDatabase();
            console.log('✅ Production database connected');
        } catch (dbError) {
            console.error('❌ Production database error:', dbError);
            return NextResponse.json(
                { error: "Service temporarily unavailable" },
                { status: 503 }
            );
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            console.log('⚠️ User not found (security response)');
            return NextResponse.json(
                { message: "If that email exists, we sent a reset link." },
                { status: 200 }
            );
        }

        console.log(`✅ User found: ${user.email}`);

        // Generate secure token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        const resetPasswordExpire = new Date(Date.now() + 60 * 60 * 1000);

        // Save token
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpire = resetPasswordExpire;
        await user.save();

        // Create reset URL - Use production URL
        const baseUrl = process.env.NEXTAUTH_URL || 'https://nestify-projects.vercel.app';
        const resetUrl = `${baseUrl}/ResetPassword/${resetToken}`;

        console.log(`🔗 Reset URL created for ${user.email}`);

        // Email content
        const message = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 20px; 
            background-color: #f9f9f9;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white; 
            padding: 30px; 
            border-radius: 10px; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border: 1px solid #e1e1e1;
          }
          .header { 
            text-align: center; 
            margin-bottom: 30px;
            border-bottom: 2px solid #22c55e;
            padding-bottom: 15px;
          }
          .button { 
            background-color: #22c55e; 
            color: white; 
            padding: 14px 28px; 
            text-decoration: none; 
            border-radius: 6px; 
            display: inline-block; 
            font-weight: bold;
            font-size: 16px;
            margin: 20px 0;
            text-align: center;
          }
          .footer { 
            margin-top: 30px; 
            font-size: 14px; 
            color: #666; 
            border-top: 1px solid #e1e1e1;
            padding-top: 20px;
          }
          .code { 
            background: #f4f4f4; 
            padding: 15px; 
            border-radius: 5px; 
            word-break: break-all; 
            font-family: monospace; 
            font-size: 14px;
            margin: 15px 0;
            border: 1px solid #ddd;
          }
          @media only screen and (max-width: 600px) {
            .container { padding: 20px; }
            .button { display: block; margin: 20px auto; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="color: #22c55e; margin: 0;">Nestify</h1>
            <p style="margin: 10px 0 0 0; color: #666;">Password Reset Request</p>
          </div>
          
          <p>Hello <strong>${user.name || 'User'}</strong>,</p>
          <p>You requested a password reset for your Nestify account.</p>
          
          <div style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset Your Password</a>
          </div>
          
          <p>Or copy and paste this link in your browser:</p>
          <div class="code">${resetUrl}</div>
          
          <p><strong style="color: #dc2626;">⚠️ This link will expire in 1 hour.</strong></p>
          <p>If you didn't request this reset, please ignore this email. Your account remains secure.</p>
          
          <div class="footer">
            <p>Best regards,<br><strong>The Nestify Team</strong></p>
            <p style="font-size: 12px; color: #999;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

        // Send email
        try {
            console.log(`📨 Production: Attempting to send email to ${user.email}`);

            await sendEmail({
                to: user.email,
                subject: "Reset Your Nestify Password",
                html: message,
            });

            const endTime = Date.now();
            console.log(`🎉 PRODUCTION SUCCESS: Email sent in ${endTime - startTime}ms`);

            return NextResponse.json(
                {
                    message: "Password reset link has been sent to your email.",
                    success: true
                },
                { status: 200 }
            );

        } catch (emailError) {
            console.error('❌ PRODUCTION EMAIL FAILURE:', emailError);

            // Clear invalid token
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            return NextResponse.json(
                {
                    error: "We're experiencing high demand. Please try again in a few minutes.",
                    success: false
                },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('❌ PRODUCTION API ERROR:', error);
        const endTime = Date.now();
        console.log(`💥 Request failed after ${endTime - startTime}ms`);

        return NextResponse.json(
            {
                error: "Service temporarily unavailable. Please try again.",
                success: false
            },
            { status: 500 }
        );
    }
}