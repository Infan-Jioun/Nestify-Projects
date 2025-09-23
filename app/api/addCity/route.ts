
import AddCity from "@/app/models/addCity";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    await connectToDatabase();
    try {
        const data = await req.json();
        const newCity = await AddCity.create(data);
        return NextResponse.json(newCity, { status: 201 });
    } catch {
        return NextResponse.json({ message: "Failed to create city" }, { status: 500 });
    }
}