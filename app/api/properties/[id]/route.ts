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
