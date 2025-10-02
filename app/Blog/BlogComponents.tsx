"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchBlogPosts, fetchFeaturedPosts } from "../features/blog/blogSlice";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Calendar, Clock, Eye, Heart, Search, ArrowRight, Home,
     Tag, BookOpen, TrendingUp, Building, HomeIcon
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BlogPost } from "../Types/BlogPost";

// Skeleton Loader Components
const BlogCardSkeleton = () => (
    <Card className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse hover:shadow-lg transition-all duration-300">
        <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300"></div>
        <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="h-3 bg-gray-200 rounded-full w-20"></div>
                <div className="h-3 bg-gray-200 rounded-full w-16"></div>
            </div>
            <div className="h-5 bg-gray-200 rounded-full mb-3"></div>
            <div className="h-4 bg-gray-200 rounded-full mb-4 w-3/4"></div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="h-3 bg-gray-200 rounded-full w-16"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded-full w-24"></div>
            </div>
        </CardContent>
    </Card>
);

const FeaturedPostSkeleton = () => (
    <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 border border-green-100 rounded-3xl p-8 animate-pulse">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="h-80 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl"></div>
            <div className="space-y-5">
                <div className="h-4 bg-gray-200 rounded-full w-32"></div>
                <div className="h-8 bg-gray-200 rounded-full w-full"></div>
                <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
                <div className="h-12 bg-gray-200 rounded-full w-40"></div>
            </div>
        </div>
    </div>
);

export default function BlogComponents() {
    const dispatch = useDispatch<AppDispatch>();
    const { posts, featuredPosts, loading, error, totalPages, currentPage } = useSelector(
        (state: RootState) => state.blog
    );

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const categories = [
        { name: "Real Estate Tips", icon: <BookOpen size={16} /> },
        { name: "Market Trends", icon: <TrendingUp size={16} /> },
        { name: "Home Improvement", icon: <HomeIcon size={16} /> },
        { name: "Investment Guide", icon: <Building size={16} /> },
        { name: "Legal Advice", icon: <Tag size={16} /> },
        { name: "Interior Design", icon: <Home size={16} /> }
    ];

    useEffect(() => {
        const loadData = async () => {
            try {
                await Promise.all([
                    dispatch(fetchBlogPosts({ page: 1, limit: 9, category: selectedCategory })),
                    dispatch(fetchFeaturedPosts())
                ]);
            } catch (err) {
                console.error("Error loading blog data:", err);
            } finally {
                setIsInitialLoad(false);
            }
        };

        loadData();
    }, [dispatch, selectedCategory]);

    // Filter posts based on search term
    const filteredPosts = posts?.filter(post =>
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.categories?.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
    ) || [];

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return "";
        }
    };

    const loadMore = () => {
        if (currentPage < totalPages) {
            dispatch(fetchBlogPosts({ page: currentPage + 1, limit: 9, category: selectedCategory }));
        }
    };


    const getFeaturedImage = (post: BlogPost) => {
        if (post.featuredImage && typeof post.featuredImage === "string" && post.featuredImage.trim() !== "") {
            return post.featuredImage;
        }
        return "/api/placeholder/400/300";
    };


    const getAuthorAvatar = (author?: BlogPost["author"]): string => {
        if (author?.avatar && author.avatar.trim() !== "") {
            return author.avatar;
        }
        return "/api/placeholder/40/40"; // Fallback avatar
    };


    if (error && isInitialLoad) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center py-16">
                <div className="container mx-auto px-4 text-center">
                    <Card className="bg-white/80 backdrop-blur-sm border border-red-200 rounded-3xl p-8 max-w-md mx-auto shadow-lg">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-3xl">⚠️</span>
                        </div>
                        <h2 className="text-red-600 text-2xl font-bold mb-3">Error Loading Blog</h2>
                        <p className="text-red-500 mb-6">{error}</p>
                        <Button
                            onClick={() => window.location.reload()}
                            variant="outline"
                            className="rounded-full border-red-200 text-red-600 hover:bg-red-50"
                        >
                            Try Again
                        </Button>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen ">
            {/* Header Section */}
            <section className="relative py-16 px-6 text-center bg-gradient-to-br from-gray-900 via-green-500 to-emerald-500 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute top-0 left-0 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-bounce"></div>

                {/* Geometric Patterns */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-32 h-32 border-2 border-green-300 rounded-lg rotate-45"></div>
                    <div className="absolute bottom-32 right-32 w-24 h-24 border-2 border-emerald-300 rounded-full"></div>
                    <div className="absolute top-40 right-40 w-16 h-16 border border-white rotate-12"></div>
                </div>

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

                <div className="relative container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        {/* Breadcrumb */}
                        <nav className="flex justify-center mb-12">
                            <div className="flex items-center gap-4 text-sm text-green-100/80">
                                <Link href="/" className="hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                                    <Home size={16} className="group-hover:scale-110 transition-transform" />
                                    Home
                                </Link>
                                <span className="text-green-400">/</span>
                                <span className="text-white font-medium">Blog</span>
                            </div>
                        </nav>

                        {/* Main Content */}
                        <div className="mb-16">
                            {/* Premium Badge */}
                            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl mb-8 border border-green-400/30 backdrop-blur-sm">
                                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                                <span className="font-semibold tracking-wide">🏆 INDUSTRY INSIGHTS</span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
                                Real Estate
                                <span className="block bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent mt-4">
                                    Intelligence
                                </span>
                            </h1>

                            {/* Subheading */}
                            <p className="text-xl md:text-2xl text-green-100/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                                Strategic insights, market analytics, and expert perspectives to empower your property investment decisions
                            </p>


                        </div>

                        {/* Scroll Indicator */}
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 right-20 w-6 h-6 bg-green-400 rounded-full animate-float opacity-60"></div>
                <div className="absolute bottom-40 left-32 w-4 h-4 bg-emerald-300 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-60 right-44 w-3 h-3 bg-white rounded-full animate-float opacity-30" style={{ animationDelay: '2s' }}></div>
            </section>            {/* Categories Filter */}
            <section className="bg-white/80 backdrop-blur-sm border-b border-gray-100 ">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Button
                            variant={selectedCategory === "" ? "default" : "outline"}
                            onClick={() => setSelectedCategory("")}
                            className="rounded-full px-6 py-2.5 transition-all duration-300 border-green-200 hover:border-green-400"
                        >
                            📖 All Articles
                        </Button>
                        {categories.map((category) => (
                            <Button
                                key={category.name}
                                variant={selectedCategory === category.name ? "default" : "outline"}
                                onClick={() => setSelectedCategory(category.name)}
                                className="rounded-full px-5 py-2.5 transition-all duration-300 border-green-200 hover:border-green-400 flex items-center gap-2"
                            >
                                {category.icon}
                                {category.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Posts */}
            <section className="container mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-4 bg-green-50 text-green-600 border-green-200 px-4 py-1.5 rounded-full">
                        <TrendingUp size={16} className="mr-2" />
                        Featured Content
                    </Badge>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Stories</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">Curated insights from our real estate experts</p>
                </div>

                {loading && isInitialLoad ? (
                    <FeaturedPostSkeleton />
                ) : featuredPosts && featuredPosts.length > 0 ? (
                    <Card className="bg-gradient-to-br from-green-50 via-white to-emerald-50 border border-green-100 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500">
                        <div className="grid lg:grid-cols-2 gap-10 items-center">
                            <div className="relative group">
                                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                    <Image
                                        src={getFeaturedImage(featuredPosts[0])}
                                        alt={featuredPosts[0].title || "Featured Post"}
                                        width={600}
                                        height={400}
                                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="absolute top-4 left-4">
                                    <Badge className="bg-green-500 text-white border-0 px-3 py-1.5 rounded-full">
                                        Featured
                                    </Badge>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <span className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                                        <Calendar size={16} className="text-green-600" />
                                        {formatDate(featuredPosts[0].publishedAt)}
                                    </span>
                                    <span className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                                        <Clock size={16} className="text-blue-600" />
                                        {featuredPosts[0].readTime || 5} min read
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 leading-tight">
                                    {featuredPosts[0].title || "Featured Post Title"}
                                </h3>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {featuredPosts[0].excerpt || "Discover amazing insights about real estate market trends and investment opportunities."}
                                </p>
                                <div className="flex items-center gap-6 text-sm text-gray-500">
                                    <span className="flex items-center gap-2">
                                        <Eye size={16} />
                                        {featuredPosts[0].views || 0} views
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Heart size={16} />
                                        {featuredPosts[0].likes || 0} likes
                                    </span>
                                </div>
                                {featuredPosts && featuredPosts.length > 0 && (
                                    <Link
                                        href={`/Blog/${featuredPosts[0].slug || featuredPosts[0]._id}`}
                                        className="block"
                                    >
                                        <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-x-1">
                                            Read Full Story
                                            <ArrowRight size={18} className="ml-2" />
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </Card>
                ) : (
                    <Card className="text-center py-16 bg-white/50 backdrop-blur-sm">
                        <CardContent>
                            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen size={40} className="text-gray-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Featured Posts</h3>
                            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                No featured posts available at the moment. Check back later for updates.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </section>

            {/* Blog Posts Grid */}
            <section className="container mx-auto px-4 py-8 pb-24">
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-4 bg-blue-50 text-blue-600 border-blue-200 px-4 py-1.5 rounded-full">
                        <BookOpen size={16} className="mr-2" />
                        Latest Articles
                    </Badge>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Insights</h2>
                    <p className="text-gray-600 text-lg">Stay updated with the latest real estate market trends and expert advice</p>
                </div>

                {loading && isInitialLoad ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <BlogCardSkeleton key={index} />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            {filteredPosts.map((post) => (
                                <Card key={post._id || post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 group hover:translate-y-2">
                                    <div className="relative overflow-hidden">
                                        <Image
                                            src={getFeaturedImage(post)}
                                            alt={post.title || "Blog Post"}
                                            width={400}
                                            height={250}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <Badge className="bg-green-500 text-white border-0 px-3 py-1 rounded-full text-xs">
                                                {post.categories?.[0] || "Uncategorized"}
                                            </Badge>
                                        </div>
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-t-2xl"></div>
                                    </div>

                                    <CardContent className="p-6">
                                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                                            <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full">
                                                <Calendar size={12} />
                                                {formatDate(post.publishedAt)}
                                            </span>
                                            <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-full">
                                                <Clock size={12} />
                                                {post.readTime || 5} min
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors duration-300 leading-tight">
                                            {post.title || "Untitled Post"}
                                        </h3>

                                        <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed">
                                            {post.excerpt || "No excerpt available for this post."}
                                        </p>

                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <Image
                                                        src={getAuthorAvatar(post.author)}
                                                        alt={post.author?.name || "Author"}
                                                        width={36}
                                                        height={36}
                                                        className="rounded-full border-2 border-green-100"
                                                    />
                                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">
                                                    {post.author?.name || "Unknown Author"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Eye size={12} />
                                                    {post.views || 0}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Heart size={12} />
                                                    {post.likes || 0}
                                                </span>
                                            </div>
                                        </div>

                                        <Link href={`/Blog/${post.slug || post._id}`} className="block">
                                            <Button
                                                variant="outline"
                                                className="w-full border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 hover:text-green-700 rounded-xl transition-all duration-300 group-hover:scale-105"
                                            >
                                                Read More
                                                <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {currentPage < totalPages && (
                            <div className="text-center">
                                <Button
                                    onClick={loadMore}
                                    variant="outline"
                                    className="px-10 py-3 rounded-full border-green-300 text-green-600 hover:bg-green-500 hover:text-white hover:border-green-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                                            Loading...
                                        </div>
                                    ) : (
                                        `Load More (${posts?.length || 0} of ${totalPages * 9})`
                                    )}
                                </Button>
                            </div>
                        )}
                    </>
                )}

                {filteredPosts.length === 0 && !loading && (
                    <Card className="text-center py-16 max-w-2xl mx-auto bg-white/50 backdrop-blur-sm">
                        <CardContent>
                            <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search size={40} className="text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">No articles found</h3>
                            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                Try adjusting your search terms or browse different categories to discover relevant content.
                            </p>
                            <Button
                                onClick={() => { setSearchTerm(""); setSelectedCategory(""); }}
                                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Clear Filters & Show All
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </section>

            {/* Newsletter Section */}
            <section className="bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-400/10 rounded-full blur-3xl"></div>

                <div className="relative container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-0 px-4 py-2 rounded-full backdrop-blur-sm">
                            💌 Stay Informed
                        </Badge>
                        <h2 className="text-4xl font-bold mb-4">Stay Updated with Market Insights</h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                            Get the latest real estate trends, investment opportunities, and expert advice delivered directly to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                            <Input
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