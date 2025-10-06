import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/app/models/user";

export async function POST(request: NextRequest) {
    try {
        console.log(" Reset Password API Called");

        const { token, password } = await request.json();

        if (!token || !password) {
            console.log(" Missing token or password");
            return NextResponse.json(
                { error: "Token and password are required" },
                { status: 400 }
            );
        }


        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        console.log(" Searching user with valid token...");

        await connectToDatabase();

        const user = await User.findOne({
            resetPasswordToken, 
            resetPasswordExpire: { $gt: new Date() }, 
        });

        if (!user) {
            console.log(" Invalid or expired token");
            return NextResponse.json(
                { error: "Invalid or expired reset token" },
                { status: 400 }
            );
        }
        console.log(" Valid token found for user:", user.email);
        const hashedPassword = await bcrypt.hash(password, 12);
    
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        console.log(" Password reset successful for:", user.email);

        return NextResponse.json(
            {
                message: "Password reset successful. You can now login with your new password.",
                success: true
            },
            { status: 200 }
        );

    } catch (error) {
        console.error(" Reset password error:", error);
        return NextResponse.json(
            {
                error: "Internal server error",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}