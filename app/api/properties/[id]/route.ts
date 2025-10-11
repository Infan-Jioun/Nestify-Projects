// app/api/properties/[id]/route.ts
import Property from '@/app/models/properties';
import { authOptions } from '@/lib/auth-options';
import connectToDatabase from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { SessionUser } from '@/app/Types/properties';

// GET - Get single property by ID
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    await connectToDatabase();
    try {
        const { id } = await context.params;
        
        if (!id) {
            return NextResponse.json({ message: "ID is required" }, { status: 400 });
        }

        const property = await Property.findById(id);
        
        if (!property) {
            return NextResponse.json({ message: "Property not found" }, { status: 404 });
        }

        return NextResponse.json(property, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch property:", error);
        return NextResponse.json({ message: "Failed to fetch property" }, { status: 500 });
    }
}

// DELETE - Delete property by ID
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        
        const { id } = await context.params;

        if (!id) {
            return NextResponse.json({ message: "Property id is required" }, { status: 400 });
        }

        const deletedProperty = await Property.findByIdAndDelete(id);
        
        if (!deletedProperty) {
            return NextResponse.json({ message: "Property not found" }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true,
            message: "Property deleted successfully", 
            property: deletedProperty 
        }, { status: 200 });
    } catch (error: unknown) {
        console.error("Failed to delete property:", error);
        
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return NextResponse.json({ 
            error: "Failed to delete property",
            details: errorMessage 
        }, { status: 500 });
    }
}

// PUT - Update property
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();

        const { id } = await context.params;
        const propertyId = id;

        if (!propertyId) {
            return NextResponse.json({ error: 'Property ID is required' }, { status: 400 });
        }

        const body = await req.json();
        console.log('Update request body:', body);

        // Define allowed fields for update
        const allowedFields = [
            'status', 'title', 'price', 'currency', 'propertySize', 'address',
            'geoCountryLocation', 'yearBuild', 'images', 'videos', 'contactNumber',
            'bedrooms', 'bathrooms', 'drawingRoom', 'kitchen', 'floor', 'furnishing',
            'floorArea', 'parkingSpaces', 'roomsSections', 'landArea', 'plotNumber',
            'landType', 'facilities', 'propertyFacilities', 'districtName'
        ];

        const updateData: Record<string, unknown> = {};

        // Filter only allowed fields
        Object.keys(body).forEach(field => {
            if (allowedFields.includes(field)) {
                updateData[field] = body[field];
            }
        });

        // Add updatedAt timestamp
        updateData.updatedAt = new Date();

        // Validate status if provided
        if (updateData.status) {
            const validStatuses = ['Available', 'Rented', 'Sold', 'Pending'];
            if (!validStatuses.includes(updateData.status as string)) {
                return NextResponse.json(
                    { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
                    { status: 400 }
                );
            }
        }

        // Check if property exists
        const existingProperty = await Property.findById(propertyId);
        if (!existingProperty) {
            return NextResponse.json({ error: 'Property not found' }, { status: 404 });
        }

        // Update the property
        const updatedProperty = await Property.findByIdAndUpdate(
            propertyId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedProperty) {
            return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
        }

        console.log('Property updated successfully:', {
            id: updatedProperty._id,
            updatedFields: Object.keys(updateData)
        });

        return NextResponse.json({
            success: true,
            message: 'Property updated successfully',
            property: updatedProperty
        }, { status: 200 });

    } catch (error: unknown) {
        console.error('Property update API error:', error);

        if (error instanceof Error) {
            // MongoDB validation error
            if (error.name === 'ValidationError') {
                return NextResponse.json(
                    { error: 'Validation error: ' + error.message },
                    { status: 400 }
                );
            }

            // Cast error (invalid ID format)
            if (error.name === 'CastError') {
                return NextResponse.json(
                    { error: 'Invalid property ID format' },
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