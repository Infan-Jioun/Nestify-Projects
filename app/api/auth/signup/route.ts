import User from "@/app/models/user";
import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import OTP from "@/app/models/otp";
import { sendEmail } from "@/lib/nodemailer";

export async function POST(request: Request) {
    const { name, email, password, location, mobile, role } = await request.json();

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    if (!name || !email || !password) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
        return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    if (password.length < 8) {
        return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 });
    }

    try {
        await connectToDatabase();
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            if (!existingUser.emailVerified) {
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

                await OTP.deleteMany({ email });
                await OTP.create({ email, otp, expiresAt });

                const otpMessage = getOtpEmailTemplate(otp);
                await sendEmail({
                    to: email,
                    subject: "Your Nestify Verification OTP",
                    html: otpMessage,
                });

                return NextResponse.json({
                    message: "Account already exists but not verified. A new OTP has been sent to your email.",
                    success: true,
                    needsVerification: true,
                }, { status: 200 });
            }

            return NextResponse.json({ message: "User Already Exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            location: location || null,
            mobile: mobile || null,
            role: role || "user",
            emailVerified: false,
            provider: "credentials",
        });

        await newUser.save();

        // OTP generate করো
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await OTP.deleteMany({ email });
        await OTP.create({ email, otp, expiresAt });

        const otpMessage = getOtpEmailTemplate(otp);
        await sendEmail({
            to: email,
            subject: "Your Nestify Verification OTP",
            html: otpMessage,
        });

        return NextResponse.json({
            message: "Registration successful! Please check your email for the verification OTP.",
            success: true,
        }, { status: 201 });

    } catch (error) {
        console.log("Signup error:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

function getOtpEmailTemplate(otp: string): string {
    return `
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
                <div class="header"><div class="logo">Nestify</div></div>
                <div class="content">
                    <h2 style="text-align: center; color: #1f2937;">Welcome to Nestify!</h2>
                    <p style="color: #4b5563; line-height: 1.6;">Please use the OTP code below to verify your email address:</p>
                    <div class="otp-code">${otp}</div>
                    <p class="warning">This OTP will expire in 10 minutes.</p>
                    <p style="color: #4b5563; line-height: 1.6;">If you didn't create an account with Nestify, please ignore this email.</p>
                </div>
                <div class="footer"><p>&copy; 2024 Nestify. All rights reserved.</p></div>
            </div>
        </body>
        </html>
    `;
}