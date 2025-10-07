import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Property from '../../../models/properties';
import connectToDatabase from '@/lib/mongodb';
import { authOptions } from '@/lib/auth-options';
import User from '@/app/models/user';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();

        const { id } = await params;
        const developerId = id;

        if (!developerId) {
            return NextResponse.json(
                { error: 'Developer ID is required' },
                { status: 400 }
            );
        }


        const developer = await User.findById(developerId);

        if (!developer) {
            return NextResponse.json(
                { error: 'Developer not found' },
                { status: 404 }
            );
        }
        if (developer.role !== 'real_estate_developer') {
            return NextResponse.json(
                { error: 'User is not a real estate developer' },
                { status: 400 }
            );
        }

        
        const properties = await Property.find({ ownerId: developerId })
            .sort({ createdAt: -1 });

        const totalProperties = properties.length;
        const availableProperties = properties.filter(p => p.status === 'Available').length;
        const soldProperties = properties.filter(p => p.status === 'Sold').length;
        const rentedProperties = properties.filter(p => p.status === 'Rented').length;

        return NextResponse.json({
            success: true,
            developer: {
                _id: developer._id,
                name: developer.name,
                email: developer.email,
                role: developer.role,
                bio: developer.bio,
                location: developer.location,
                website: developer.website,
                mobile: developer.mobile,
                image: developer.image,
                createdAt: developer.createdAt,
                slug: developer.slug
            },
            properties: properties,
            statistics: {
                total: totalProperties,
                available: availableProperties,
                sold: soldProperties,
                rented: rentedProperties
            }
        });

    } catch (error: unknown) {
        console.error('Get developer profile error:', error);

        if (error instanceof Error && error.name === 'CastError') {
            return NextResponse.json(
                { error: 'Invalid developer ID' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}