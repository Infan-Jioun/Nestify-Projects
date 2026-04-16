import { Metadata } from "next";
import BlogPostPage from "../Components/BlogPostPage";


type Props = {
    params: Promise<{ slug: string }>;
};

async function getBlogPost(slug: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${slug}`,
            { cache: "no-store" }
        );
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        return {
            title: "Post Not Found | Nestify Blog",
            description: "This blog post does not exist or has been removed.",
        };
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nestify-projects.vercel.app";

    return {
        title: `${post.title} | Nestify Blog`,
        description: post.excerpt || post.description || "Read this article on Nestify Blog.",
        keywords: post.tags || [],
        authors: post.author?.name ? [{ name: post.author.name }] : [],
        openGraph: {
            title: post.title,
            description: post.excerpt || "",
            url: `${baseUrl}/Blog/${slug}`,
            siteName: "Nestify",
            type: "article",
            publishedTime: post.publishedAt,
            authors: post.author?.name ? [post.author.name] : [],
            ...(post.featuredImage && {
                images: [
                    {
                        url: post.featuredImage,
                        width: 1200,
                        height: 630,
                        alt: post.title,
                    },
                ],
            }),
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt || "",
            ...(post.featuredImage && { images: [post.featuredImage] }),
        },
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    return <BlogPostPage />;
}