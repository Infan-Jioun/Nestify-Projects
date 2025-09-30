import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';
import BlogPost from '@/app/models/BlogPost';
import connectToDatabase from '@/lib/mongodb';

type BlogAction = 'like' | 'view';

interface RouteParams {
    params: {
        slug: string;
        action: string;
    };
}

export async function POST(req: NextRequest, { params }: RouteParams
) {
    try {
        await connectToDatabase();

        const { slug, action } = await params;
        if (action !== 'like' && action !== 'view') {
            return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
        }

        const post = await BlogPost.findOne({ slug });
        if (!post) {
            return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
        }

        const updateData: { $inc: { likes?: number; views?: number } } = { $inc: {} };
        const responseData: { postId: string; likes?: number; views?: number } = {
            postId: post._id instanceof Types.ObjectId ? post._id.toString() : String(post._id),
        };

        if (action === 'like') {
            updateData.$inc.likes = 1;
            responseData.likes = post.likes + 1;
        } else if (action === 'view') {
            updateData.$inc.views = 1;
            responseData.views = post.views + 1;
        }

        await BlogPost.findOneAndUpdate({ slug }, updateData);

        return NextResponse.json(responseData);
    } catch (error) {
        console.error(`Error performing ${(await params).action} on blog post:`, error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}