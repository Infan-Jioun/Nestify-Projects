import Property from "@/app/models/properties";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ name: string }> }) {
    try {
        await connectToDatabase();

        const params = await context.params;
        const categoryName = decodeURIComponent(params.name);
        const properties = await Property.find({
            "category.name": {
                $regex: new RegExp(`^${categoryName}$`, 'i')
            }
        });

        if (!properties || properties.length === 0) {
            return NextResponse.json(
                { message: "No properties found for this category" },
                { status: 404 }
            );
        }

        return NextResponse.json(properties, { status: 200 });
    } catch (error) {
        console.error("Error fetching properties by category:", error);
        return NextResponse.json(
            { message: "Failed to fetch properties" },
            { status: 500 }
        );
    }
}