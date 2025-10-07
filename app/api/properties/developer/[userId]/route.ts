
import { NextRequest, NextResponse } from 'next/server';
import Property from '../../../../models/properties';
import connectToDatabase from '@/lib/mongodb';


export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        await connectToDatabase();

        const { userId } = await params;

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            );
        }

       
        const properties = await Property.find({ ownerId: userId })
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            properties: properties,
            totalProperties: properties.length
        });

    } catch (error: unknown) {
        console.error('Get developer properties error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}