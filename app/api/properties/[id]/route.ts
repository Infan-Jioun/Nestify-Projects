import Property from '@/app/models/properties';
import connectToDatabase from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  await connectToDatabase();
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }
    const property = await Property.findById(id);
    if (!property) {
      return NextResponse.json({ message: "Property not found" }, { status: 404 });
    }
    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch property" }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  await connectToDatabase();
  try {
    const { id } = await context.params;

    if (!id) return NextResponse.json({ message: "Property id is required" }, { status: 400 });

    const deletedProperty = await Property.findByIdAndDelete(id);
    if (!deletedProperty) return NextResponse.json({ message: "Property not found" }, { status: 404 });

    return NextResponse.json({ message: "Property deleted successfully", property: deletedProperty }, { status: 200 });
  } catch (err) {
    console.error("Failed to delete property:", err);
    return NextResponse.json({ message: "Failed to delete property" }, { status: 500 });
  }
}
