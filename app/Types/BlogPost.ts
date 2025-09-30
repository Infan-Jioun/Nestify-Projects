export interface Author {
    name?: string;
    avatar?: string;
}
export interface BlogPost {
    _id: string;
    id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage: File | string;
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

export interface BlogState {
    posts: BlogPost[];
    featuredPosts: BlogPost[];
    currentPost: BlogPost | null;
    loading: boolean;
    error: string | null;
    totalPosts: number;
    currentPage: number;
    totalPages: number;
}

// Get featured image safely
const getFeaturedImage = (post: BlogPost): string => {
    if (typeof post.featuredImage === "string" && post.featuredImage.trim() !== "") {
        return post.featuredImage;
    }
    return "/api/placeholder/400/300"; // Fallback
};

// Get author avatar safely
const getAuthorAvatar = (author?: BlogPost["author"]): string => {
    if (author?.avatar && author.avatar.trim() !== "") {
        return author.avatar;
    }
    return "/api/placeholder/40/40"; // Fallback
};
