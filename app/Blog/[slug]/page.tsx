"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchBlogPostBySlug, likeBlogPost, incrementViewCount } from "@/app/features/blog/blogSlice";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Calendar,
    Clock,
    Eye,
    Heart,
    ArrowLeft,
    Share2,
    User,
    BookOpen,
    Facebook,
    Twitter,
    Linkedin,
    MessageCircle
} from "lucide-react";
import toast from "react-hot-toast";
import { BlogPost } from "@/app/Types/BlogPost";

// Skeleton Loader
const BlogPostSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 py-8">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back Button Skeleton */}
                <div className="mb-8 animate-pulse">
                    <div className="h-10 w-32 bg-gray-200 rounded-full"></div>
                </div>

                {/* Featured Image Skeleton */}
                <div className="mb-8 animate-pulse">
                    <div className="h-96 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl"></div>
                </div>

                {/* Content Skeleton */}
                <div className="space-y-4 animate-pulse">
                    <div className="h-8 bg-gray-200 rounded-full w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-full"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-full"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
                </div>
            </div>
        </div>
    </div>
);

export default function BlogPostPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { slug } = useParams();
    const router = useRouter();

    const { currentPost, loading, error } = useSelector(
        (state: RootState) => state.blog
    );

    const [isLiked, setIsLiked] = useState(false);
    const [isSharing, setIsSharing] = useState(false);

    useEffect(() => {
        if (slug) {
            dispatch(fetchBlogPostBySlug(slug as string));
            // Increment view count
            dispatch(incrementViewCount(slug as string));
        }
    }, [dispatch, slug]);

    const handleLike = () => {
        if (currentPost && !isLiked) {
            dispatch(likeBlogPost(currentPost._id));
            setIsLiked(true);
        }
    };

    const handleShare = async (platform: string) => {
        if (!currentPost) return;

        const url = window.location.href;
        const title = currentPost.title;
        const text = currentPost.excerpt;

        switch (platform) {
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'copy':
                await navigator.clipboard.writeText(url);
                toast.success('Link copied to clipboard!');
                break;
        }
        setIsSharing(false);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return "";
        }
    };

    const getFeaturedImage = (post: BlogPost) => {
        if (post?.featuredImage && typeof post.featuredImage === "string" && post.featuredImage.trim() !== "") {
            return post.featuredImage;
        }
        return "/api/placeholder/800/400";
    };

    // Get author avatar with fallback
    const getAuthorAvatar = (author?: BlogPost["author"]): string => {
        if (author?.avatar && author.avatar.trim() !== "") {
            return author.avatar;
        }
        return "/api/placeholder/40/40";
    };

    if (loading) {
        return <BlogPostSkeleton />;
    }

    if (error || !currentPost) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center py-16">
                <div className="container mx-auto px-4 text-center">
                    <Card className="bg-white/80 backdrop-blur-sm border border-red-200 rounded-3xl p-8 max-w-md mx-auto shadow-lg">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-3xl">⚠️</span>
                        </div>
                        <h2 className="text-red-600 text-2xl font-bold mb-3">Post Not Found</h2>
                        <p className="text-red-500 mb-6">
                            {error || "The blog post you're looking for doesn't exist."}
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button
                                onClick={() => router.back()}
                                variant="outline"
                                className="rounded-full border-red-200 text-red-600 hover:bg-red-50"
                            >
                                <ArrowLeft size={16} className="mr-2" />
                                Go Back
                            </Button>
                            <Link href="/Blog">
                                <Button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full">
                                    Browse Blog
                                </Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
            {/* Header Navigation */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/Blog">
                            <Button
                                variant="ghost"
                                className="rounded-full hover:bg-green-50 hover:text-green-600 transition-all duration-300"
                            >
                                <ArrowLeft size={18} className="mr-2" />
                                Back to Blog
                            </Button>
                        </Link>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsSharing(!isSharing)}
                                className="rounded-full border-green-200 text-green-600 hover:bg-green-50"
                            >
                                <Share2 size={16} className="mr-2" />
                                Share
                            </Button>

                            <Button
                                variant={isLiked ? "default" : "outline"}
                                size="sm"
                                onClick={handleLike}
                                disabled={isLiked}
                                className={`rounded-full ${isLiked
                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                    : 'border-red-200 text-red-600 hover:bg-red-50'
                                    }`}
                            >
                                <Heart size={16} className={`mr-2 ${isLiked ? 'fill-current' : ''}`} />
                                {isLiked ? 'Liked' : 'Like'} {currentPost.likes || 0}
                            </Button>
                        </div>
                    </div>

                    {/* Share Options */}
                    {isSharing && (
                        <div className="mt-4 p-4 bg-white rounded-2xl border border-green-200 shadow-lg">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-gray-900">Share this post</h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsSharing(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </Button>
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    onClick={() => handleShare('facebook')}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                                >
                                    <Facebook size={16} className="mr-2" />
                                    Facebook
                                </Button>
                                <Button
                                    onClick={() => handleShare('twitter')}
                                    className="flex-1 bg-sky-500 hover:bg-sky-600 text-white rounded-xl"
                                >
                                    <Twitter size={16} className="mr-2" />
                                    Twitter
                                </Button>
                                <Button
                                    onClick={() => handleShare('linkedin')}
                                    className="flex-1 bg-blue-700 hover:bg-blue-800 text-white rounded-xl"
                                >
                                    <Linkedin size={16} className="mr-2" />
                                    LinkedIn
                                </Button>
                                <Button
                                    onClick={() => handleShare('copy')}
                                    variant="outline"
                                    className="flex-1 rounded-xl border-green-200 text-green-600 hover:bg-green-50"
                                >
                                    <MessageCircle size={16} className="mr-2" />
                                    Copy Link
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <article className="max-w-4xl mx-auto">
                    {/* Featured Image */}
                    <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src={getFeaturedImage(currentPost)}
                            alt={currentPost.title}
                            width={800}
                            height={400}
                            className="w-full h-96 object-cover"
                        />
                    </div>

                    {/* Article Header */}
                    <header className="mb-8 text-center">
                        <div className="flex flex-wrap gap-2 justify-center mb-6">
                            {currentPost.categories?.map((category: string, index: number) => (
                                <Badge
                                    key={index}
                                    className="bg-green-500 text-white border-0 px-4 py-2 rounded-full text-sm"
                                >
                                    {category}
                                </Badge>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            {currentPost.title}
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
                            {currentPost.excerpt}
                        </p>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 mb-8">
                            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                                <Calendar size={16} className="text-green-600" />
                                <span>{formatDate(currentPost.publishedAt)}</span>
                            </div>

                            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                                <Clock size={16} className="text-blue-600" />
                                <span>{currentPost.readTime || 5} min read</span>
                            </div>

                            <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
                                <Eye size={16} className="text-purple-600" />
                                <span>{currentPost.views || 0} views</span>
                            </div>

                            <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full">
                                <Heart size={16} className="text-red-600" />
                                <span>{currentPost.likes || 0} likes</span>
                            </div>
                        </div>

                        {/* Author Info */}
                        <Card className="inline-block bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl p-6">
                            <CardContent className="p-0">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <Image
                                            src={getAuthorAvatar(currentPost.author)}
                                            alt={currentPost.author?.name || "Author"}
                                            width={60}
                                            height={60}
                                            className="rounded-full border-4 border-green-100"
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900 text-lg">
                                            {currentPost.author?.name || "Unknown Author"}
                                        </h3>
                                        <p className="text-gray-600 text-sm mt-1 max-w-md">
                                            {currentPost.author?.bio || "Real estate expert and content creator."}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </header>

                    {/* Article Content */}
                    <div className="prose prose-lg max-w-none 
                                  prose-headings:text-gray-900 
                                  prose-p:text-gray-700 
                                  prose-p:leading-relaxed
                                  prose-a:text-green-600 
                                  prose-a:no-underline
                                  prose-a:border-b-2
                                  prose-a:border-green-300
                                  prose-a:hover:border-green-500
                                  prose-strong:text-gray-900
                                  prose-blockquote:border-l-green-400
                                  prose-blockquote:bg-green-50
                                  prose-blockquote:py-2
                                  prose-ul:list-disc
                                  prose-ol:list-decimal
                                  prose-li:marker:text-green-500
                                  mb-12">
                        <div dangerouslySetInnerHTML={{
                            __html: currentPost.content?.replace(/\n/g, '<br/>') || "No content available."
                        }} />
                    </div>

                    {/* Tags */}
                    {currentPost.tags && currentPost.tags.length > 0 && (
                        <div className="mb-12">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <BookOpen size={20} className="mr-2 text-green-600" />
                                Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {currentPost.tags.map((tag: string, index: number) => (
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className="bg-white border-green-200 text-green-700 px-3 py-1 rounded-full hover:bg-green-50 transition-colors"
                                    >
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Call to Action */}
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 text-center">
                        <CardContent>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Enjoyed this article?
                            </h3>
                            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                Discover more insights about real estate, investment opportunities,
                                and market trends in our blog.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <Link href="/Blog">
                                    <Button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                                        Explore More Articles
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsSharing(true)}
                                    className="rounded-full border-green-300 text-green-600 hover:bg-green-50"
                                >
                                    <Share2 size={18} className="mr-2" />
                                    Share with Friends
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </article>
            </main>

            {/* Newsletter Section */}
            <section className="bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white py-20 mt-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-400/10 rounded-full blur-3xl"></div>

                <div className="relative container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-0 px-4 py-2 rounded-full backdrop-blur-sm">
                            💌 Stay Updated
                        </Badge>
                        <h2 className="text-3xl font-bold mb-4">Never Miss an Update</h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                            Get the latest real estate insights, market trends, and expert advice
                            delivered directly to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 rounded-2xl border-0 bg-white/10 backdrop-blur-lg text-white placeholder-gray-300 py-3 px-5 focus:bg-white/20 focus:ring-2 focus:ring-green-300 transition-all duration-300"
                            />
                            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                Subscribe Now
                            </Button>
                        </div>
                        <p className="text-gray-400 text-sm mt-4">No spam, unsubscribe at any time</p>
                    </div>
                </div>
            </section>
        </div>
    );
}