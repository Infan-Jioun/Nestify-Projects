// app/api/auth/confirm-verification/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/app/models/user";
import OTP from "@/app/models/otp";

export async function POST(request: NextRequest) {
    try {
        const { email, otp } = await request.json();

        if (!email || !otp) {
            return NextResponse.json(
                { error: "Email and OTP are required" },
                { status: 400 }
            );
        }

        await connectToDatabase();

        // Find valid OTP
        const otpRecord = await OTP.findOne({
            email,
            otp,
            expiresAt: { $gt: new Date() },
            verified: false
        });

        if (!otpRecord) {
            return NextResponse.json(
                { error: "Invalid or expired OTP" },
                { status: 400 }
            );
        }

        // Check attempts
        if (otpRecord.attempts >= 3) {
            return NextResponse.json(
                { error: "Too many attempts. Please request a new OTP." },
                { status: 400 }
            );
        }

        // Increment attempts
        otpRecord.attempts += 1;
        await otpRecord.save();

        if (otpRecord.otp !== otp) {
            return NextResponse.json(
                { error: "Invalid OTP" },
                { status: 400 }
            );
        }

        // Mark OTP as verified and verify user email
        otpRecord.verified = true;
        await otpRecord.save();

        // Update user email verification status
        await User.findOneAndUpdate(
            { email },
            { 
                emailVerified: true,
                emailVerifyToken: null,
                emailVerifyExpire: null
            }
        );

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        });

    } catch (error) {
        console.error("Verify email error:", error);
        return NextResponse.json(
            { error: "Failed to verify email" },
            { status: 500 }
        );
    }
}