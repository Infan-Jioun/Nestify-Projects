// app/api/bookings/[id]/route.ts
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
        const { status, bookingDate, bookingTime, message } = body;

        // Validate status if provided
        if (status && !['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
            return NextResponse.json(
                { error: 'Invalid status value' },
                { status: 400 }
            );
        }

        // Prepare update data
        const updateData: {
            status?: string;
            bookingDate?: string;
            bookingTime?: string;
            message?: string;
            updatedAt: Date;
        } = {
            updatedAt: new Date()
        };

        if (status) updateData.status = status;
        if (bookingDate) updateData.bookingDate = bookingDate;
        if (bookingTime) updateData.bookingTime = bookingTime;
        if (message !== undefined) updateData.message = message;

        // Find and update the booking
        const booking = await Booking.findOneAndUpdate(
            {
                _id: id
            },
            updateData,
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
            message: 'Booking updated successfully',
            booking: {
                _id: booking._id.toString(),
                propertyId: booking.propertyId,
                userId: booking.userId,
                userName: booking.userName,
                userEmail: booking.userEmail,
                userMobile: booking.userMobile,
                bookingDate: booking.bookingDate,
                bookingTime: booking.bookingTime,
                message: booking.message,
                propertyDetails: booking.propertyDetails,
                status: booking.status,
                createdAt: booking.createdAt.toISOString(),
                updatedAt: booking.updatedAt.toISOString()
            }
        });

    } catch (error: unknown) {
        console.error('Update booking error:', error);

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
            _id: id
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
                _id: id
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
            booking: {
                _id: booking._id.toString(),
                propertyId: booking.propertyId,
                status: booking.status
            },
            propertyId
        });

    } catch (error: unknown) {
        console.error('Cancel booking error:', error);

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