// app/api/properties/real_estate_developer/by-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import connectToDatabase from '@/lib/mongodb';
import Property from '@/app/models/properties';
import { SessionUser } from '@/app/Types/properties';

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { error: 'Unauthorized - Please log in' },
                { status: 401 }
            );
        }

        const url = new URL(req.url);
        const email = url.searchParams.get('email');

        if (!email) {
            return NextResponse.json(
                { error: 'Email query parameter is required' },
                { status: 400 }
            );
        }

        // Type-safe session user access
        const sessionUser = session.user as SessionUser;
        const userEmail = sessionUser.email;
        const userRole = sessionUser.role || 'user';

        // Check permissions
        const allowed =
            userEmail === email ||
            userRole === 'admin' ||
            userRole === 'owner' ||
            userRole === 'moderator';

        if (!allowed) {
            return NextResponse.json(
                { error: 'Forbidden - You do not have permission to access these properties' },
                { status: 403 }
            );
        }

        await connectToDatabase();

        // Query properties by email in multiple fields
        const query = {
            $or: [
                { ownerId: email },
                { userId: email },
                { email: email }
            ]
        };

        const properties = await Property.find(query)
            .sort({ createdAt: -1 })
            .select('-__v') // Exclude version key
            .lean();

        const count = properties.length;

        return NextResponse.json({
            success: true,
            email,
            count,
            properties
        });

    } catch (error: unknown) {
        console.error('Error in /api/properties/by-email:', error);

        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch properties by email',
                details: errorMessage
            },
            { status: 500 }
        );
    }
}