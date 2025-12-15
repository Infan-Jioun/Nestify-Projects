import Property from '@/app/models/properties';
import { authOptions } from '@/lib/auth-options';
import connectToDatabase from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

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

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params

        if (!id) {
            return NextResponse.json(
                { error: 'Property ID is required' },
                { status: 400 }
            )
        }

        await connectToDatabase()

        // Check if property exists
        const existingProperty = await Property.findById(id)
        if (!existingProperty) {
            return NextResponse.json(
                { error: 'Property not found' },
                { status: 404 }
            )
        }

        const body = await req.json()

        // Validate required fields
        const requiredFields = [
            'title',
            'category',
            'price',
            'currency',
            'propertySize',
            'contactNumber',
            'address',
            'geoCountryLocation',
            'email',
            'status'
        ]

        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    { error: `${field} is required` },
                    { status: 400 }
                )
            }
        }

        // Validate category
        if (!body.category || !body.category.name) {
            return NextResponse.json(
                { error: 'Category is required' },
                { status: 400 }
            )
        }

        // Validate status
        const validStatuses = ['Available', 'Rented', 'Sold', 'Pending']
        if (!validStatuses.includes(body.status)) {
            return NextResponse.json(
                { error: 'Invalid status value' },
                { status: 400 }
            )
        }

        // Update the property
        const updatedProperty = await Property.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        )

        return NextResponse.json({
            success: true,
            message: 'Property updated successfully',
            property: updatedProperty
        })

    } catch (error) {
        console.error('Error updating property:', error)

        if (error instanceof Error && error.name === 'ValidationError') {
            return NextResponse.json(
                { error: 'Validation error', details: error.message },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Failed to update property' },
            { status: 500 }
        )
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

