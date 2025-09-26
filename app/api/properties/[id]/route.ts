import Property from '@/app/models/properties';
import connectToDatabase from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
    await connectToDatabase();
    try {
        const id = req.nextUrl.searchParams.get("id");
        let query = {};
        if (id) {
            query = { geoCountryLocation: { $regex: new RegExp(`^${id}$`, 'i') } };
        }
        const properties = await Property.find(query);
        return NextResponse.json(properties, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to fetch properties" }, { status: 500 });
    }

} 