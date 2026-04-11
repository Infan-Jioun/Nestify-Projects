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
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
        }

        const body = await request.json();
        const { bookingDate, bookingTime, message, status } = body;

        if (bookingDate && bookingTime) {
            const booking = await Booking.findOneAndUpdate(
                { _id: id },
                {
                    bookingDate: new Date(bookingDate),
                    bookingTime: bookingTime,
                    ...(message !== undefined && { message }),
                    updatedAt: new Date(),
                },
                { new: true }
            );

            if (!booking) {
                return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
            }

            return NextResponse.json({
                success: true,
                message: 'Booking rescheduled successfully',
                booking: {
                    _id: booking._id.toString(),
                    bookingDate: booking.bookingDate,
                    bookingTime: booking.bookingTime,
                    message: booking.message,
                    status: booking.status,
                    userId: booking.userId,
                    propertyId: booking.propertyId,
                    userName: booking.userName,
                    userEmail: booking.userEmail,
                    userMobile: booking.userMobile,
                    propertyDetails: booking.propertyDetails,
                    createdAt: booking.createdAt,
                    updatedAt: booking.updatedAt,
                },
            });
        }

        // ── Status update only ──
        if (status) {
            if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
                return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
            }

            const booking = await Booking.findOneAndUpdate(
                { _id: id },
                { status, updatedAt: new Date() },
                { new: true }
            );

            if (!booking) {
                return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
            }

            return NextResponse.json({
                success: true,
                message: 'Booking status updated successfully',
                booking: {
                    _id: booking._id.toString(),
                    status: booking.status,
                },
            });
        }

        return NextResponse.json(
            { error: 'bookingDate + bookingTime or status is required' },
            { status: 400 }
        );

    } catch (error: unknown) {
        console.error('Update booking error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
        }

        const existingBooking = await Booking.findOne({ _id: id });
        if (!existingBooking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        const propertyId = existingBooking.propertyId;

        const booking = await Booking.findOneAndUpdate(
            { _id: id },
            { status: 'cancelled', updatedAt: new Date() },
            { new: true }
        );

        if (!booking) {
            return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 });
        }

        if (propertyId) {
            try {
                await Property.findByIdAndUpdate(propertyId, {
                    status: 'Available',
                    updatedAt: new Date(),
                });
            } catch (propertyError) {
                console.error('Error updating property status:', propertyError);
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Booking cancelled successfully',
            booking: {
                _id: booking._id.toString(),
                status: booking.status,
            },
        });

    } catch (error: unknown) {
        console.error('Cancel booking error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}