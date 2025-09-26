
import Property from '@/app/models/properties';
import connectToDatabase from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

type Params = { 
  params: { 
    id: string 
  } 
};

export async function GET(req: NextRequest, { params }: Params) {
  await connectToDatabase();
  
  try {
    const property = await Property.findById(params.id);
    
    if (!property) {
      return NextResponse.json(
        { message: "Property not found" }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(property, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch property" }, 
      { status: 500 }
    );
  }
}

