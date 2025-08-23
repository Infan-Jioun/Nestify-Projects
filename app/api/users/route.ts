import User from "@/app/models/user";
import connectToDatabase from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDatabase();
    const users = await User.find({});
    if (!users) {
        return NextResponse.json(users, { status: 200 });
    } else {
        return NextResponse.json(users, { status: 404, statusText: "No users found" });
    }

}