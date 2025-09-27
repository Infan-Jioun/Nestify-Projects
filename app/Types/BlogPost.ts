export interface BlogPost {
    _id: string;
    id?: string;
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