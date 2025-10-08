import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Eye, Heart, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeaturedPostSkeleton } from "./BlogSkeletons";
import { BlogPost } from "@/app/Types/BlogPost";

interface FeaturedPostProps {
    featuredPost: BlogPost | null;
    loading: boolean;
    getFeaturedImage: (post: BlogPost) => string;
    formatDate: (dateString: string) => string;
}

export const FeaturedPost = ({
    featuredPost,
    loading,
    getFeaturedImage,
    formatDate
}: FeaturedPostProps) => {
    if (loading) {
        return <FeaturedPostSkeleton />;
    }

    if (!featuredPost) {
        return (
            <Card className="text-center py-16 bg-white/50 backdrop-blur-sm">
                <CardContent>
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BookOpen size={40} className="text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">No Featured Posts</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        {"No featured posts available at the moment. Check back later for updates."}
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-gradient-to-br from-green-50 via-white to-emerald-50 border border-green-100 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="relative group">
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                        <Image
                            src={getFeaturedImage(featuredPost)}
                            alt={featuredPost.title}
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
                            {formatDate(featuredPost.publishedAt)}
                        </span>
                        <span className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                            <Clock size={16} className="text-blue-600" />
                            {featuredPost.readTime || 5} min read
                        </span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 leading-tight">
                        {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        {featuredPost.excerpt || "Discover amazing insights about real estate market trends and investment opportunities."}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                            <Eye size={16} />
                            {featuredPost.views || 0} views
                        </span>
                        <span className="flex items-center gap-2">
                            <Heart size={16} />
                            {featuredPost.likes || 0} likes
                        </span>
                    </div>
                    <Link href={`/Blog/${featuredPost.slug || featuredPost._id}`} className="block">
                        <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-x-1">
                            Read Full Story
                            <ArrowRight size={18} className="ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
};