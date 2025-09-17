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

export async function DELETE(req: NextRequest) {
    await connectToDatabase();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ message: "Property id is required" }, { status: 400 });

        const deletedProperty = await Property.findByIdAndDelete(id);
        if (!deletedProperty) return NextResponse.json({ message: "Property not found" }, { status: 404 });

        return NextResponse.json({ message: "Property deleted successfully", property: deletedProperty }, { status: 200 });
    } catch (err) {
        console.error("Failed to delete property:", err);
        return NextResponse.json({ message: "Failed to delete property" }, { status: 500 });
    }
}
