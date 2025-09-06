import Property from "@/app/models/properties";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    await connectToDatabase();

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { message: "Property id is required" },
                { status: 400 }
            );
        }

        const deletedProperty = await Property.findByIdAndDelete(id);

        if (!deletedProperty) {
            return NextResponse.json(
                { message: "Property not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Property deleted successfully", property: deletedProperty },
            { status: 200 }
        );
    } catch (error) {
        console.error("Failed to delete property:", error);
        return NextResponse.json(
            { message: "Failed to delete property" },
            { status: 500 }
        );
    }
}
