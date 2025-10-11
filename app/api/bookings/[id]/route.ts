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

        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: 'Booking ID is required' },
                { status: 400 }
            );
        }

        const body = await request.json();
        const { status } = body;

        if (!status || !['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
            return NextResponse.json(
                { error: 'Valid status is required' },
                { status: 400 }
            );
        }

        const booking = await Booking.findOneAndUpdate(
            { _id: id },
            {
                status: status,
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
            message: 'Booking status updated successfully',
            booking: {
                _id: booking._id.toString(),
                status: booking.status
            }
        });

    } catch (error: unknown) {
        console.error('Update booking error:', error);
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

        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: 'Booking ID is required' },
                { status: 400 }
            );
        }

        const existingBooking = await Booking.findOne({ _id: id });

        if (!existingBooking) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            );
        }

        const propertyId = existingBooking.propertyId;

        const booking = await Booking.findOneAndUpdate(
            { _id: id },
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

        if (propertyId) {
            try {
                await Property.findByIdAndUpdate(
                    propertyId,
                    {
                        status: 'Available',
                        updatedAt: new Date()
                    }
                );
            } catch (propertyError) {
                console.error('Error updating property status:', propertyError);
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Booking cancelled successfully',
            booking: {
                _id: booking._id.toString(),
                status: booking.status
            }
        });

    } catch (error: unknown) {
        console.error('Cancel booking error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}