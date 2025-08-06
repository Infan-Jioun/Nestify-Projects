import User from "@/app/models/user";
import connectToDatabsae from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
    const { name, email, password } = await request.json();
    const isVaildEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    if (!name || !email || !password) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }
    if (!isVaildEmail(email)) {
        return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
    }
    if (!password) {
        return NextResponse.json({ message: "password do not match" }, { status: 400 })
    }
    if (password.length < 8) {
        return NextResponse.json({ message: "Password must be 8 digit" }, { status: 400 })
    }
    try {
        await connectToDatabsae();
        const existisgUser = await User.findOne({ email });
        if (existisgUser) {
            return NextResponse.json({ message: "User Already Exist" }, { status: 400 })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        return NextResponse.json({ message: " Welcome to our website" }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({message : "Something went wrong"}, {status : 500})
    }

}