import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/user";
import connectToDatabase from "@/lib/mongodb";
import { Types } from "mongoose";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ identifier: string }> }
) {
  try {
    await connectToDatabase();

    const { identifier } = await context.params;

    if (!identifier) {
      return NextResponse.json({ error: "Identifier required" }, { status: 400 });
    }

    let user = null;

    if (Types.ObjectId.isValid(identifier)) {
      user = await User.findById(identifier).select(
        "-password -resetTokenHash -resetTokenExpiry"
      );
    }

    if (!user) {
      user = await User.findOne({
        $or: [
          { slug: identifier },
          { email: identifier },
          { providerId: identifier },
        ],
      }).select("-password -resetTokenHash -resetTokenExpiry");
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ identifier: string }> }
) {
  try {
    await connectToDatabase();


    const { identifier } = await context.params;

    if (!identifier) {
      return NextResponse.json({ message: "User identifier required" }, { status: 400 });
    }

    let deletedUser = null;

    if (Types.ObjectId.isValid(identifier)) {
      deletedUser = await User.findByIdAndDelete(identifier);
    }
    if (!deletedUser) {
      deletedUser = await User.findOneAndDelete({
        $or: [
          { slug: identifier },
          { email: identifier },
          { providerId: identifier },
        ],
      });
    }

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User successfully deleted",
      deletedUserId: deletedUser._id.toString()
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    return NextResponse.json(
      { message: "Deletion failed" },
      { status: 500 }
    );
  }
}
export async function PUT(req: NextRequest, context: Promise<{ params: { identifier: string } }>) {
  try {
    await connectToDatabase();
    const { identifier } = await context.params;
 
    const { role } = await req.json();

    const validRoles = ["user", "admin", "real_estate_developer"];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const user = Types.ObjectId.isValid(identifier)
      ? await User.findById(identifier)
      : await User.findOne({ $or: [{ slug: identifier }, { email: identifier }, { providerId: identifier }] });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });


    user.role = role;
    await user.save();

    return NextResponse.json({ message: "Role updated successfully", user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}