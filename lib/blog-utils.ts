import { BlogPost } from "@/app/Types/BlogPost";


export const getFeaturedImage = (post: BlogPost): string => {
    if (post.featuredImage && typeof post.featuredImage === "string" && post.featuredImage.trim() !== "") {
        return post.featuredImage;
    }
    return "/api/placeholder/400/300";
};

export const getAuthorAvatar = (author?: BlogPost["author"]): string => {
    if (author?.avatar && author.avatar.trim() !== "") {
        return author.avatar;
    }
    return "/api/placeholder/40/40";
};

export const formatDate = (dateString: string): string => {
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