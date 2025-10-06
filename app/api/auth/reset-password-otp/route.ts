import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/app/models/user";
import OTP from "@/app/models/otp";

export async function POST(request: NextRequest) {
  console.log("🔧 Reset Password OTP API Called");

  try {
    const body = await request.json();
    console.log(" Request body received:", body);

    const { email, otp, newPassword } = body;

    console.log(" Parsed values:", {
      email: email ? `Set (${email})` : 'MISSING',
      otp: otp ? `Set (${otp.length} chars)` : 'MISSING',
      newPassword: newPassword ? `Set (${newPassword.length} chars)` : 'MISSING'
    });

    if (!email || !otp || !newPassword) {
      const missing = [];
      if (!email) missing.push('email');
      if (!otp) missing.push('otp');
      if (!newPassword) missing.push('newPassword');

      console.error(" Missing required fields:", missing);
      return NextResponse.json(
        {
          error: "Email, OTP and new password are required",
          missingFields: missing
        },
        { status: 400 }
      );
    }

    await connectToDatabase();
    console.log(" Database connected");

    // Verify OTP first
    console.log(" Searching for OTP record...");
    const otpRecord = await OTP.findOne({
      email,
      otp,
      verified: true,
      expiresAt: { $gt: new Date() }
    });

    console.log(" OTP Record found:", otpRecord ? 'YES' : 'NO');

    if (!otpRecord) {
      console.error(" OTP validation failed - record not found or invalid");
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    console.log(" OTP verified successfully");

    // Find user
    console.log("Searching for user...");
    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found with email:", email);
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    console.log(" User found:", user.email);

    // Hash new password
    console.log(" Hashing new password...");
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    console.log(" Updating user password...");
    user.password = hashedPassword;
    await user.save();

    // Delete used OTP
    console.log(" Deleting used OTP...");
    await OTP.deleteOne({ _id: otpRecord._id });

    console.log(" Password reset completed successfully!");

    return NextResponse.json({
      message: "Password reset successfully",
      success: true
    });

  } catch (error) {
    console.error(" Reset password OTP error:", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}