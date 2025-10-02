import BlogPost from '@/app/models/BlogPost';
import connectToDatabase from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const featuredPosts = await BlogPost.find({
      isPublished: true,
      isFeatured: true
    })
    .sort({ publishedAt: -1 })
    .limit(6)
    .lean();

    return NextResponse.json(featuredPosts);

  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}