import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/user";
import connectToDatabase from "@/lib/mongodb";
import { Types } from "mongoose";
export async function GET(
    req: NextRequest,
    context: { params: { identifier: string } }
) {
    try {
        await connectToDatabase();

        const { identifier } = context.params; // সরাসরি access

        if (!identifier)
            return NextResponse.json(
                { error: "Identifier required" },
                { status: 400 }
            );

        let user = null;

        // MongoDB ObjectId
        if (Types.ObjectId.isValid(identifier)) {
            user = await User.findById(identifier).select(
                "-password -resetTokenHash -resetTokenExpiry"
            );
        }

        // slug / email / providerId
        if (!user) {
            user = await User.findOne({
                $or: [
                    { slug: identifier },
                    { providerId: identifier },
                    { email: identifier },
                ],
            }).select("-password -resetTokenHash -resetTokenExpiry");
        }

        if (!user)
            return NextResponse.json({ error: "User not found" }, { status: 404 });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await connectToDatabase();
        const url = new URL(req.url);
        const parts = url.pathname.split("/");
        const id = parts[parts.length - 1];
        if (!id || !Types.ObjectId.isValid(id)) {
            return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
        } const deletedUser = await User.findByIdAndDelete(id); if (!deletedUser) { return NextResponse.json({ error: "User not found" }, { status: 404 }); } return NextResponse.json({ message: "User deleted successfully", id }, { status: 200 });
    } catch (error) { console.error("Error deleting user:", error); return NextResponse.json({ error: "Failed to delete user" }, { status: 500 }); }
}