import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/app/models/BlogPost';


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { message: 'Invalid blog post ID' },
        { status: 400 }
      );
    }

    const post = await BlogPost.findById(params.id);

    if (!post) {
      return NextResponse.json(
        { message: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);

  } catch (error) {
    console.error('Error fetching blog post by ID:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}