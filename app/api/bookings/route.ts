import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Booking from '@/app/models/Booking';
import connectToDatabase from '@/lib/mongodb';
import { authOptions } from '@/lib/auth-options';

interface BookingRequestBody {
    propertyId: string;
    name: string;
    email: string;
    mobile: string;
    date: string;
    time: string;
    message?: string;
    propertyTitle: string;
    propertyEmail?: string;
    propertyAddress: string;
    propertyPrice: number;
    propertyCurrency: string;
    propertyImages?: string[];
    propertyStatus?: string;
    propertyListingStatus?: string;
    propertyContact?: string;
}

export async function POST(request: NextRequest) {
    try {
        console.log('Starting booking process...');

        await connectToDatabase();
        console.log('Database connected');

        const session = await getServerSession(authOptions);
        console.log('Session user:', session?.user?.email);

        if (!session?.user) {
            console.log(' No session found');
            return NextResponse.json(
                { error: 'Unauthorized. Please log in to book a property.' },
                { status: 401 }
            );
        }

        const body: BookingRequestBody = await request.json();
        console.log(' Request body:', {
            propertyId: body.propertyId,
            name: body.name,
            email: body.email,
            propertyEmail: body.propertyEmail 
        });

        // Validate required fields
        const requiredFields: (keyof BookingRequestBody)[] = [
            'propertyId', 'name', 'email', 'mobile', 'date', 'time'
        ];
        const missingFields = requiredFields.filter(field => !body[field]);

        if (missingFields.length > 0) {
            console.log(' Missing fields:', missingFields);
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

        // Validate mobile number
        const mobileRegex = /^[0-9+\-\s()]{10,}$/;
        if (!mobileRegex.test(body.mobile)) {
            return NextResponse.json(
                { error: 'Invalid mobile number format' },
                { status: 400 }
            );
        }

        // Validate date
        const selectedDate = new Date(body.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            return NextResponse.json(
                { error: 'Selected date cannot be in the past' },
                { status: 400 }
            );
        }

        // Verify email matches session
        if (session.user.email !== body.email) {
            console.log('Email mismatch:', {
                sessionEmail: session.user.email,
                bodyEmail: body.email
            });
            return NextResponse.json(
                { error: 'Email does not match logged in user' },
                { status: 400 }
            );
        }

        console.log('Creating booking in database...');

        // Create booking with all property details including email
        const bookingData = {
            propertyId: body.propertyId,
            userId: session.user.id || session.user.email,
            userName: body.name,
            userEmail: body.email,
            userMobile: body.mobile,
            bookingDate: body.date,
            bookingTime: body.time,
            message: body.message || '',
            propertyDetails: {
                title: body.propertyTitle,
                email: body.propertyEmail || '',
                address: body.propertyAddress,
                price: body.propertyPrice,
                currency: body.propertyCurrency,
                images: body.propertyImages || [],
                status: body.propertyStatus,
                listingStatus: body.propertyListingStatus,
                contact: body.propertyContact,
            },
            status: 'pending' as const
        };

        console.log('Booking data to save:', bookingData);

        const booking = await Booking.create(bookingData);

        console.log(' Booking created successfully:', {
            id: booking._id,
            propertyEmail: booking.propertyDetails.email 
        });

        return NextResponse.json({
            success: true,
            message: 'Booking request submitted successfully',
            booking: {
                id: booking._id,
                propertyId: booking.propertyId,
                bookingDate: booking.bookingDate,
                bookingTime: booking.bookingTime,
                status: booking.status,
                propertyDetails: booking.propertyDetails 
            },
            user: {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                role: session.user.role
            }
        }, { status: 201 });

    } catch (error: unknown) {
        console.error(' Booking API error:', error);

        if (error instanceof Error) {
            if (error.name === 'ValidationError') {
                return NextResponse.json(
                    { error: 'Validation error: ' + error.message },
                    { status: 400 }
                );
            }

            // MongoDB duplicate error
            const mongoError = error as { code?: number };
            if (mongoError.code === 11000) {
                return NextResponse.json(
                    { error: 'Duplicate booking found' },
                    { status: 400 }
                );
            }
        }

        return NextResponse.json(
            { error: 'Internal server error. Please try again.' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();

        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '10');
        const page = parseInt(searchParams.get('page') || '1');

        const userBookings = await Booking.find({
            userId: session.user.id || session.user.email
        })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit);

        const totalBookings = await Booking.countDocuments({
            userId: session.user.id || session.user.email
        });

        return NextResponse.json({
            success: true,
            bookings: userBookings,
            pagination: {
                page,
                limit,
                total: totalBookings,
                pages: Math.ceil(totalBookings / limit)
            },
            userInfo: {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: session.user.role
            }
        });

    } catch (error: unknown) {
        console.error('Get bookings API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}