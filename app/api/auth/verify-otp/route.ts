
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
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
            email, otp,
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

        // Mark as verified
        otpRecord.verified = true;
        await otpRecord.save();

        return NextResponse.json({
            message: "OTP verified successfully",
            success: true
        });

    } catch (error) {
        console.error("Verify OTP error:", error);
        return NextResponse.json(
            { error: "Failed to verify OTP" },
            { status: 500 }
        );
    }
}