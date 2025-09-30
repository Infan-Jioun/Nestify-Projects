import BlogPost from "@/app/models/BlogPost";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();

    const { slug } = await context.params; 

    const post = await BlogPost.findOne({ slug });

    if (!post) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
