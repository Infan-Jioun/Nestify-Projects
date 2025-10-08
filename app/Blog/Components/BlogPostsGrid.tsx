// BlogPostsGrid.tsx
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Eye, Heart, ArrowRight, Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogCardSkeleton } from "./BlogSkeletons";
import { BlogPost } from "@/app/Types/BlogPost";

interface BlogPostsGridProps {
    posts: BlogPost[];
    loading: boolean;
    currentPage: number;
    totalPages: number;
    onLoadMore: () => void;
    getFeaturedImage: (post: BlogPost) => string;
    getAuthorAvatar: (author?: BlogPost["author"]) => string;
    formatDate: (dateString: string) => string;
    searchTerm: string;
    onClearFilters: () => void;
}

export const BlogPostsGrid = ({
    posts,
    loading,
    currentPage,
    totalPages,
    onLoadMore,
    getFeaturedImage,
    getAuthorAvatar,
    formatDate,
    searchTerm,
    onClearFilters
}: BlogPostsGridProps) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                    <BlogCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <Card className="text-center py-16 max-w-2xl mx-auto bg-white/50 backdrop-blur-sm">
                <CardContent>
                    <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {searchTerm ? "No articles found" : "No articles available"}
                    </h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        {searchTerm
                            ? "Try adjusting your search terms or browse different categories to discover relevant content."
                            : "No blog posts are available at the moment. Please check back later."
                        }
                    </p>
                    <Button
                        onClick={onClearFilters}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        {searchTerm ? "Clear Filters & Show All" : "Refresh Page"}
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {posts.map((post) => (
                    <Card key={post._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 group hover:translate-y-2">
                        <div className="relative overflow-hidden">
                            <Image
                                src={getFeaturedImage(post)}
                                alt={post.title}
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
                                {post.title}
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
                        onClick={onLoadMore}
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
                            `Load More (${posts.length} of ${totalPages * 9})`
                        )}
                    </Button>
                </div>
            )}
        </>
    );
};