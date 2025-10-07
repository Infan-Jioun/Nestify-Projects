import Property from '@/app/models/properties';
import { authOptions } from '@/lib/auth-options';
import connectToDatabase from '@/lib/mongodb';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

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
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch property" }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  await connectToDatabase();
  try {
    const { id } = await context.params;

    if (!id) return NextResponse.json({ message: "Property id is required" }, { status: 400 });

    const deletedProperty = await Property.findByIdAndDelete(id);
    if (!deletedProperty) return NextResponse.json({ message: "Property not found" }, { status: 404 });

    return NextResponse.json({ message: "Property deleted successfully", property: deletedProperty }, { status: 200 });
  } catch (err) {
    console.error("Failed to delete property:", err);
    return NextResponse.json({ message: "Failed to delete property" }, { status: 500 });
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('Starting property status update...');

    await connectToDatabase();
    console.log('Database connected');

    const session = await getServerSession(authOptions);
    console.log('Session user:', session?.user?.email);

    if (!session?.user) {
      console.log('No session found - Unauthorized');
      return NextResponse.json(
        { error: 'Unauthorized. Please log in to update property.' },
        { status: 401 }
      );
    }


    const { id } = await params;
    const propertyId = id;

    console.log('Property ID to update:', propertyId);

    if (!propertyId) {
      return NextResponse.json(
        { error: 'Property ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log('Update request body:', body);

    const allowedFields = ['status'];
    const invalidFields = Object.keys(body).filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0) {
      return NextResponse.json(
        { error: `Only status field can be updated. Invalid fields: ${invalidFields.join(', ')}` },
        { status: 400 }
      );
    }

    const validStatuses = ['Available', 'Rented', 'Sold', 'Pending'];
    if (body.status && !validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

  
    const existingProperty = await Property.findById(propertyId);
    if (!existingProperty) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    console.log('Existing property found:', {
      id: existingProperty._id,
      currentStatus: existingProperty.status
    });

 
    const updateData: { status?: string; updatedAt?: Date } = {};
    if (body.status) {
      updateData.status = body.status;
    }
    updateData.updatedAt = new Date();

    console.log('Data to update:', updateData);


    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProperty) {
      return NextResponse.json(
        { error: 'Failed to update property' },
        { status: 500 }
      );
    }

    console.log('Property updated successfully:', {
      id: updatedProperty._id,
      newStatus: updatedProperty.status
    });

    return NextResponse.json({
      success: true,
      message: 'Property status updated successfully',
      property: {
        _id: updatedProperty._id,
        title: updatedProperty.title,
        status: updatedProperty.status,
        price: updatedProperty.price,
        address: updatedProperty.address,
        updatedAt: updatedProperty.updatedAt
      }
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

  
      if (error.name === 'CastError') {
        return NextResponse.json(
          { error: 'Invalid property ID' },
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