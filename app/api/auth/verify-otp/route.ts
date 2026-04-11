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

        // Valid OTP খোঁজো
        const otpRecord = await OTP.findOne({
            email,
            expiresAt: { $gt: new Date() },
            verified: false,
        });

        if (!otpRecord) {
            return NextResponse.json(
                { error: "OTP expired or not found. Please request a new one." },
                { status: 400 }
            );
        }

        // Attempt check
        if (otpRecord.attempts >= 5) {
            return NextResponse.json(
                { error: "Too many attempts. Please request a new OTP." },
                { status: 400 }
            );
        }

        // OTP মিলছে কিনা check করো
        if (otpRecord.otp !== otp) {
            otpRecord.attempts += 1;
            await otpRecord.save();
            return NextResponse.json(
                { error: `Invalid OTP. ${5 - otpRecord.attempts} attempts remaining.` },
                { status: 400 }
            );
        }

     
        otpRecord.verified = true;
        await otpRecord.save();


        await User.findOneAndUpdate(
            { email },
            {
                emailVerified: true,
                emailVerifyToken: null,
                emailVerifyExpire: null,
            }
        );

        await OTP.deleteMany({ email });

        return NextResponse.json({
            message: "Email verified successfully! You can now login.",
            success: true,
        });

    } catch (error) {
        console.error("Confirm verification error:", error);
        return NextResponse.json(
            { error: "Failed to verify email" },
            { status: 500 }
        );
    }
}