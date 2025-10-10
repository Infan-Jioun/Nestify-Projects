import {  NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/app/models/user";

export async function GET() {
    try {
        await connectToDatabase();
        const users = await User.find({}).lean();
        return NextResponse.json(users); 
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 });
    }
}




