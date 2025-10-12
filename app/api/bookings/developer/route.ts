
import Booking from '@/app/models/Booking';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json(
                { error: 'Developer email is required' },
                { status: 400 }
            );
        }

        const bookings = await Booking.find({
            'propertyDetails.email': email
        }).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            bookings: bookings
        });

    } catch (error) {
        console.error('Error fetching developer bookings:', error);
        return NextResponse.json(
            { error: 'Failed to fetch bookings' },
            { status: 500 }
        );
    }
}