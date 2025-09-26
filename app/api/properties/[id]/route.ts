import Property from '@/app/models/properties';
import connectToDatabase from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

// Route params টাইপ
interface RouteParams {
    id: string;
}

export async function GET(
    req: NextRequest,
    { params }: { params: RouteParams }
) {
    await connectToDatabase();

    if (!params.id) {
        return NextResponse.json({ message: 'Invalid property ID' }, { status: 400 });
    }

    try {
        const property = await Property.findById(params.id);

        if (!property) {
            return NextResponse.json({ message: 'Property not found' }, { status: 404 });
        }

        return NextResponse.json(property, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to fetch property' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: RouteParams }
) {
    await connectToDatabase();

    if (!params.id) {
        return NextResponse.json({ message: 'Invalid property ID' }, { status: 400 });
    }

    try {
        const property = await Property.findByIdAndDelete(params.id);

        if (!property) {
            return NextResponse.json({ message: 'Property not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Property deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to delete property' }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: RouteParams }
) {
    await connectToDatabase();

    if (!params.id) {
        return NextResponse.json({ message: 'Invalid property ID' }, { status: 400 });
    }

    try {
        const data = await req.json();
        const property = await Property.findByIdAndUpdate(params.id, data, { new: true });

        if (!property) {
            return NextResponse.json({ message: 'Property not found' }, { status: 404 });
        }

        return NextResponse.json(property, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to update property' }, { status: 500 });
    }
}
