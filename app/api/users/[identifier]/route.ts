import { NextResponse } from "next/server";
import User from "@/app/models/user";
import connectToDatabase from "@/lib/mongodb";
import { Types } from "mongoose";

export async function GET(
    req: Request,
    context: { params: { identifier: string } }
) {
    try {
        await connectToDatabase();
        const { identifier } = context.params;
        if (!identifier) {
            return NextResponse.json({ error: "Missing identifier" }, { status: 400 });
        }
        let user = null;
        if (Types.ObjectId.isValid(identifier)) {
            user = await User.findById(identifier).select("-password -resetTokenHash -resetTokenExpiry");
        }


        if (!user) {
            user = await User.findOne({
                $or: [
                    { slug: identifier },
                    { email: identifier },
                    { providerId: identifier }
                ]
            }).select("-password -resetTokenHash -resetTokenExpiry");
        }

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
