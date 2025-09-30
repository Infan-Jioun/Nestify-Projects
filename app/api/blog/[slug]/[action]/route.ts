import { NextRequest, NextResponse } from 'next/server';

import BlogPost from '@/app/models/BlogPost';
import connectToDatabase from '@/lib/mongodb';

// POST: Handle blog post actions (like, view, etc.)
export async function POST(
    request: NextRequest,
    { params }: { params: { slug: string; action: string } }
) {
    try {
        await connectToDatabase();

        const { action, slug } = params;
        const post = await BlogPost.findOne({ slug });

        if (!post) {
            return NextResponse.json(
                { message: 'Blog post not found' },
                { status: 404 }
            );
        }

        let updateData: any = {};
        let responseData: any = { postId: post._id };

        switch (action) {
            case 'like':
                updateData = { $inc: { likes: 1 } };
                responseData.likes = post.likes + 1;
                break;

            case 'view':
                updateData = { $inc: { views: 1 } };
                responseData.views = post.views + 1;
                break;

            default:
                return NextResponse.json(
                    { message: 'Invalid action' },
                    { status: 400 }
                );
        }

        await BlogPost.findOneAndUpdate(
            { slug },
            updateData
        );

        return NextResponse.json(responseData);

    } catch (error) {
        console.error(`Error performing ${params.action} on blog post:`, error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}