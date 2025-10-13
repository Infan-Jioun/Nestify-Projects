import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectToDatabase from '@/lib/mongodb';
import UserModel from '@/app/models/user';
import { authOptions } from '@/lib/auth-options';

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ userExists: false });
        }

        await connectToDatabase();
        const existingUser = await UserModel.findOne({ email: session.user.email });

        return NextResponse.json({
            userExists: !!existingUser
        });
    } catch (error) {
        console.error('Check user error:', error);
        return NextResponse.json({ userExists: false });
    }
}