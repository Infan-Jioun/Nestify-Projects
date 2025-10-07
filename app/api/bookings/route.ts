
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

import Booking from '@/app/models/Booking';
import connectToDatabase from '@/lib/mongodb';


export async function POST(request: NextRequest) {
    try {

        await connectToDatabase();

        // Get server session using your authOptions
        const session = await getServerSession(authOptions);

        // Check if user is authenticated
        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized. Please log in to book a property.' },
                { status: 401 }
            );
        }

        const body = await request.json();

        // Validate required fields
        const requiredFields = ['propertyId', 'name', 'email', 'mobile', 'date', 'time'];
        const missingFields = requiredFields.filter(field => !body[field]);

        if (missingFields.length > 0) {
            return NextResponse.json(
                { error: `Missing required fields: ${missingFields.join(', ')}` },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        
        const mobileRegex = /^[0-9+\-\s()]{10,}$/;
        if (!mobileRegex.test(body.mobile)) {
            return NextResponse.json(
                { error: 'Invalid mobile number format' },
                { status: 400 }
            );
        }

        // Validate date (should not be in the past)
        const selectedDate = new Date(body.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            return NextResponse.json(
                { error: 'Selected date cannot be in the past' },
                { status: 400 }
            );
        }

        // Verify that the logged in user matches the booking email
        if (session.user.email !== body.email) {
            return NextResponse.json(
                { error: 'Email does not match logged in user' },
                { status: 400 }
            );
        }

        // Create booking in MongoDB
        const booking = await Booking.create({
            propertyId: body.propertyId,
            userId: session.user.id!,
            userName: body.name,
            userEmail: body.email,
            userMobile: body.mobile,
            bookingDate: body.date,
            bookingTime: body.time,
            message: body.message || '',
            propertyDetails: {
                title: body.propertyTitle,
                address: body.propertyAddress,
                price: body.propertyPrice,
                currency: body.propertyCurrency,
                images: body.propertyImages || []
            },
            status: 'pending'
        });

        console.log('Booking saved to MongoDB:', booking);

        return NextResponse.json({
            success: true,
            message: 'Booking request submitted successfully',
            booking: {
                id: booking._id,
                propertyId: booking.propertyId,
                bookingDate: booking.bookingDate,
                bookingTime: booking.bookingTime,
                status: booking.status
            },
            user: {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                role: session.user.role
            }
        }, { status: 201 });

    } catch (error) {
        console.error('Booking API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// GET endpoint to fetch user's bookings
export async function GET(request: NextRequest) {
    try {
        // Connect to MongoDB first
        await connectToDatabase();

        // Get server session
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);

        // Fetch bookings from MongoDB
        const userBookings = await Booking.find({
            userId: session.user.id
        }).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            bookings: userBookings,
            userInfo: {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: session.user.role
            }
        });

    } catch (error) {
        console.error('Get bookings API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}