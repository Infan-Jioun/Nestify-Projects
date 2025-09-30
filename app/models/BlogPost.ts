import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogPost extends Document {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    author: {
        name: string;
        avatar: string;
        bio: string;
    };
    categories: string[];
    tags: string[];
    readTime: number;
    publishedAt: string;
    isPublished: boolean;
    views: number;
    likes: number;
}

// Define schema
const BlogPostSchema: Schema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        excerpt: { type: String, required: true },
        content: { type: String, required: true },
        featuredImage: { type: String, required: true }, 
        author: {
            name: { type: String, required: true },
            avatar: { type: String, default: "" },
            bio: { type: String, default: "" },
        },
        categories: [{ type: String }],
        tags: [{ type: String }],
        readTime: { type: Number, default: 0 },
        publishedAt: { type: Date, default: Date.now },
        isPublished: { type: Boolean, default: false },
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const BlogPost: Model<IBlogPost> =
    mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

export default BlogPost;
