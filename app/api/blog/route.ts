import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import BlogPost from '@/app/models/BlogPost';
import { FilterQuery } from 'mongoose';

// GET: Fetch all blog posts with pagination and filtering
export async function GET(request: NextRequest) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '9');
        const category = searchParams.get('category');
        const authorId = searchParams.get('authorId');
        const searchQuery = searchParams.get('query');
        const featured = searchParams.get('featured');

        const skip = (page - 1) * limit;

        // filter with proper typing
        const filter: FilterQuery<typeof BlogPost> = { isPublished: true };

        if (category) {
            filter.categories = { $in: [category] };
        }
        if (authorId) {
            filter['author._id'] = authorId;
        }
        if (searchQuery) {
            filter.$or = [
                { title: { $regex: searchQuery, $options: 'i' } },
                { excerpt: { $regex: searchQuery, $options: 'i' } },
                { content: { $regex: searchQuery, $options: 'i' } },
                { tags: { $in: [new RegExp(searchQuery, 'i')] } },
            ];
        }
        if (featured === 'true') {
            filter.isFeatured = true;
        }

        const posts = await BlogPost.find(filter)
            .sort({ publishedAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const totalPosts = await BlogPost.countDocuments(filter);
        const totalPages = Math.ceil(totalPosts / limit);

        return NextResponse.json({
            posts,
            total: totalPosts,
            pages: totalPages,
            currentPage: page,
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

// POST: Create a new blog post
export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();

        const body = await request.json();

        const requiredFields = ['title', 'slug', 'content', 'author'];
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json({ message: `${field} is required` }, { status: 400 });
            }
        }

        const existingPost = await BlogPost.findOne({ slug: body.slug });
        if (existingPost) {
            return NextResponse.json({ message: 'Slug already exists' }, { status: 400 });
        }

        const wordCount = body.content.trim().split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200);

        const newPost = new BlogPost({
            title: body.title,
            slug: body.slug,
            excerpt: body.excerpt || `${body.content.substring(0, 150)}...`,
            content: body.content,
            featuredImage: body.featuredImage || null,
            categories: body.categories || [],
            tags: body.tags || [],
            author: {
                name: body.author.name,
                bio: body.author.bio || '',
                avatar: body.author.avatar || '',
            },
            readTime,
            isPublished: body.isPublished !== undefined ? body.isPublished : true,
            isFeatured: body.isFeatured || false,
            publishedAt: body.publishedAt || new Date(),
            views: 0,
            likes: 0,
        });

        const savedPost = await newPost.save();
        return NextResponse.json(savedPost, { status: 201 });
    } catch (error) {
        console.error('Error creating blog post:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
