import Property from "@/app/models/properties";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// GET: fetch all properties
export async function GET(req: NextRequest) {
    await connectToDatabase();

    try {
        const properties = await Property.find({});
        return NextResponse.json(properties, { status: 200 });
    } catch (err) {
        console.error("Failed to fetch properties:", err);
        return NextResponse.json(
            { message: "Failed to fetch properties" },
            { status: 500 }
        );
    }
}

// POST: create new property
export async function POST(req: NextRequest) {
    await connectToDatabase();

    try {
        const data = await req.json();
        console.log("Received data for new property:", data);
        const newProperty = await Property.create(data);
        console.log("Created new property:", newProperty);
        return NextResponse.json(newProperty, { status: 201 });
    } catch (err) {
        console.error("Failed to create property:", err);
        return NextResponse.json(
            { message: "Failed to create property" },
            { status: 500 }
        );
    }
}
