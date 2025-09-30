import BlogPost from '@/app/models/BlogPost';
import connectToDatabase from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';


// GET: Search blog posts
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');

    if (!query) {
      return NextResponse.json(
        { message: 'Search query is required' },
        { status: 400 }
      );
    }

    const skip = (page - 1) * limit;

    const searchFilter = {
      isPublished: true,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { excerpt: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { 'tags': { $in: [new RegExp(query, 'i')] } },
        { 'categories': { $in: [new RegExp(query, 'i')] } }
      ]
    };

    const posts = await BlogPost.find(searchFilter)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPosts = await BlogPost.countDocuments(searchFilter);
    const totalPages = Math.ceil(totalPosts / limit);

    return NextResponse.json({
      posts,
      total: totalPosts,
      pages: totalPages,
      currentPage: page
    });

  } catch (error) {
    console.error('Error searching blog posts:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}