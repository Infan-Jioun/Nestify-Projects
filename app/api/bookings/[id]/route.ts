import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Booking from '@/app/models/Booking';
import Property from '@/app/models/properties';
import connectToDatabase from '@/lib/mongodb';
import { authOptions } from '@/lib/auth-options';

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();

        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Await the params first
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: 'Booking ID is required' },
                { status: 400 }
            );
        }

        const body = await request.json();
        const { bookingDate, bookingTime, message } = body;

        // Validate required fields
        if (!bookingDate || !bookingTime) {
            return NextResponse.json(
                { error: 'Date and time are required' },
                { status: 400 }
            );
        }

        // Validate date format
        const selectedDate = new Date(bookingDate);
        if (isNaN(selectedDate.getTime())) {
            return NextResponse.json(
                { error: 'Invalid date format' },
                { status: 400 }
            );
        }

        // Validate date is not in the past
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            return NextResponse.json(
                { error: 'Selected date cannot be in the past' },
                { status: 400 }
            );
        }

        // Validate time format
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(bookingTime)) {
            return NextResponse.json(
                { error: 'Invalid time format' },
                { status: 400 }
            );
        }

        // Find and update the booking
        const booking = await Booking.findOneAndUpdate(
            {
                _id: id,
                userId: session.user.id || session.user.email
            },
            {
                bookingDate,
                bookingTime,
                ...(message && { message }),
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!booking) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Booking rescheduled successfully',
            booking
        });

    } catch (error: unknown) {
        console.error('Reschedule booking error:', error);

        // Handle specific MongoDB errors
        if (error instanceof Error && error.name === 'CastError') {
            return NextResponse.json(
                { error: 'Invalid booking ID format' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();

        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Await the params first
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: 'Booking ID is required' },
                { status: 400 }
            );
        }

        // Find the booking first to get propertyId
        const existingBooking = await Booking.findOne({
            _id: id,
            userId: session.user.id || session.user.email
        });

        if (!existingBooking) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            );
        }

        const propertyId = existingBooking.propertyId;

        // Update the booking status to cancelled
        const booking = await Booking.findOneAndUpdate(
            {
                _id: id,
                userId: session.user.id || session.user.email
            },
            {
                status: 'cancelled',
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!booking) {
            return NextResponse.json(
                { error: 'Failed to cancel booking' },
                { status: 500 }
            );
        }

        // Update property status back to Available
        if (propertyId) {
            try {
                await Property.findByIdAndUpdate(
                    propertyId,
                    {
                        status: 'Available',
                        updatedAt: new Date()
                    },
                    { new: true }
                );
            } catch (propertyError) {
                console.error('Error updating property status:', propertyError);
                // Continue even if property update fails
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Booking cancelled successfully',
            booking,
            propertyId
        });

    } catch (error: unknown) {
        console.error('Cancel booking error:', error);

        // Handle specific MongoDB errors
        if (error instanceof Error && error.name === 'CastError') {
            return NextResponse.json(
                { error: 'Invalid booking ID format' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}