import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/user";
import connectToDatabase from "@/lib/mongodb";
import { Types } from "mongoose";

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase();

    
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const id = parts[parts.length - 1]; 

    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully", id }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
