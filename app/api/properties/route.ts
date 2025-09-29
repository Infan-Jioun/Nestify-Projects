
import Property from "@/app/models/properties";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await connectToDatabase();
    try {
        const properties = await Property.find({});
        return NextResponse.json(properties, { status: 200 });
    } catch (err) {
        console.error("Failed to fetch properties:", err);
        return NextResponse.json({ message: "Failed to fetch properties" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await connectToDatabase();
    try {
        const data = await req.json();
        
        const newProperty = await Property.create(data);
        return NextResponse.json(newProperty, { status: 201 });
    } catch (err) {
        console.error("Failed to create property:", err);
        return NextResponse.json({ message: "Failed to create property" }, { status: 500 });
    }
}

