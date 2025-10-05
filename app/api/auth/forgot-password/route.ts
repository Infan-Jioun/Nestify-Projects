
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectToDatabase from "@/lib/mongodb";
import User from "@/app/models/user";
import { sendEmail } from "@/lib/nodemailer";

export async function POST(request: NextRequest) {
    console.log(" Forgot Password API Started");

    try {
        // Environment variables check
        console.log(" Environment Check:", {
            hasEmailUser: !!process.env.EMAIL_USER,
            hasEmailPassword: !!process.env.EMAIL_PASSWORD,
            hasEmailFrom: !!process.env.EMAIL_FROM,
            nextAuthUrl: process.env.NEXTAUTH_URL
        });

        // Request body parse
        let body;
        try {
            body = await request.json();
            console.log(" Request Body:", body);
        } catch (parseError) {
            console.error(" JSON Parse Error:", parseError);
            return NextResponse.json(
                { error: "Invalid JSON in request body" },
                { status: 400 }
            );
        }

        const { email } = body;

        // Email validation
        if (!email) {
            console.log(" Email missing in request");
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        // Email format check
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            console.log(" Invalid email format:", email);
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        console.log(" Connecting to database...");
        await connectToDatabase();

        console.log(" Searching user with email:", email);
        const user = await User.findOne({ email });

        if (!user) {
            console.log(" User not found with email:", email);
            // Security purpose-এ always success message return করুন
            return NextResponse.json(
                {
                    message: "If that email exists, we sent a reset link.",
                    success: true
                },
                { status: 200 }
            );
        }

        console.log(" User found:", {
            id: user._id,
            email: user.email,
            name: user.name
        });

     
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

      
        const resetPasswordExpire = new Date(Date.now() + 60 * 60 * 1000);

        console.log(" Saving reset token to database...");

       
        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpire = resetPasswordExpire;
        await user.save();

        console.log(" Reset token saved to database");

       
        const resetUrl = `${process.env.NEXTAUTH_URL}/ResetPassword/${resetToken}`;
        console.log(" Reset URL:", resetUrl);

       
        const message = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; }
          .button { background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; }
          .footer { margin-top: 20px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Password Reset Request</h2>
          <p>Hello <strong>${user.name || 'User'}</strong>,</p>
          <p>You requested a password reset for your Nestify account.</p>
          <p>Click the button below to reset your password:</p>
          <p style="text-align: center;">
            <a href="${resetUrl}" class="button" style="color: white;">Reset Your Password</a>
          </p>
          <p>Or copy and paste this link in your browser:<br/>
            <code style="background: #f4f4f4; padding: 10px; border-radius: 5px; word-break: break-all;">${resetUrl}</code>
          </p>
          <p><strong> This link will expire in 1 hour.</strong></p>
          <p>If you didn't request this, please ignore this email.</p>
          <div class="footer">
            <p>Best regards,<br/><strong>Nestify Team</strong></p>
          </div>
        </div>
      </body>
      </html>
    `;

        console.log(" Attempting to send email...");

        try {
            // Email send করুন
            await sendEmail({
                to: user.email,
                subject: "Nestify - Password Reset Request",
                html: message,
            });

            console.log("🎉 Email sent successfully!");

            return NextResponse.json(
                {
                    message: "Password reset link has been sent to your email.",
                    success: true
                },
                { status: 200 }
            );

        } catch (emailError) {
            console.error(" Email sending failed:", emailError);

            // Reset token clear করুন যদি email send fail হয়
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            return NextResponse.json(
                {
                    error: "Failed to send reset email. Please try again later.",
                    success: false
                },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error(" Forgot password error:", error);
        return NextResponse.json(
            {
                error: "Internal server error. Please try again.",
                success: false
            },
            { status: 500 }
        );
    }
}