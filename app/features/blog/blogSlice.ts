"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

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

// State type
interface BlogState {
  posts: BlogPost[];
  featuredPosts: BlogPost[];
  currentPost: BlogPost | null;
  loading: boolean;
  error: string | null;
  totalPosts: number;
  currentPage: number;
  totalPages: number;
  operationLoading: boolean;
  operationError: string | null;
}

const initialState: BlogState = {
  posts: [],
  featuredPosts: [],
  currentPost: null,
  loading: false,
  error: null,
  totalPosts: 0,
  currentPage: 1,
  totalPages: 1,
  operationLoading: false,
  operationError: null,
};

// Fetch all blog posts
export const fetchBlogPosts = createAsyncThunk<
  { posts: BlogPost[]; total: number; pages: number; currentPage?: number },
  { page?: number; limit?: number; category?: string },
  { rejectValue: string }
>("blog/fetchPosts", async ({ page = 1, limit = 9, category }, { rejectWithValue }) => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(category && { category }),
    });

    const response = await axios.get(`/api/blog?${params}`);
    return {
      ...response.data,
      currentPage: page // manually add currentPage
    };
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to fetch blog posts");
  }
});

// Fetch featured posts
export const fetchFeaturedPosts = createAsyncThunk<BlogPost[], void, { rejectValue: string }>(
  "blog/fetchFeatured",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/blog/featured");
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to fetch featured posts");
    }
  }
);

// Fetch single post by ID
export const fetchBlogPostById = createAsyncThunk<BlogPost, string, { rejectValue: string }>(
  "blog/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/blog/id/${id}`);
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to fetch blog post");
    }
  }
);

// Fetch single post by Slug
export const fetchBlogPostBySlug = createAsyncThunk<BlogPost, string, { rejectValue: string }>(
  "blog/fetchBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/blog/${slug}`);
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to fetch blog post");
    }
  }
);

// Create new blog post
export const createBlogPost = createAsyncThunk<
  BlogPost,
  Omit<BlogPost, '_id' | 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes'>,
  { rejectValue: string }
>("blog/createPost", async (postData, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/blog", postData);
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to create blog post");
  }
});

// Update blog post
export const updateBlogPost = createAsyncThunk<
  BlogPost,
  { id: string; data: Partial<BlogPost> },
  { rejectValue: string }
>("blog/updatePost", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/api/blog/${id}`, data);
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to update blog post");
  }
});

// Delete blog post
export const deleteBlogPost = createAsyncThunk<string, string, { rejectValue: string }>(
  "blog/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/blog/${id}`);
      return id;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(error.response?.data?.message || "Failed to delete blog post");
    }
  }
);

// Like blog post
export const likeBlogPost = createAsyncThunk<
  { postId: string; likes: number },
  string,
  { rejectValue: string }
>("blog/likePost", async (slug, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/blog/${slug}/like`);
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to like post");
  }
});

// Increment view count
export const incrementViewCount = createAsyncThunk<
  { postId: string; views: number },
  string,
  { rejectValue: string }
>("blog/incrementViews", async (slug, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/blog/${slug}/view`);
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to increment view count");
  }
});

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    clearError: (state) => {
      state.error = null;
      state.operationError = null;
    },
    clearOperationError: (state) => {
      state.operationError = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Fetch Posts - FIXED: currentPage issue
    builder.addCase(fetchBlogPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBlogPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload.posts;
      state.totalPosts = action.payload.total;
      state.totalPages = action.payload.pages;
      state.currentPage = action.payload.currentPage || 1; // Fixed: use provided currentPage or default to 1
    });
    builder.addCase(fetchBlogPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Error loading posts";
    });

    // Featured Posts
    builder.addCase(fetchFeaturedPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFeaturedPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.featuredPosts = action.payload;
    });
    builder.addCase(fetchFeaturedPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Error loading featured posts";
    });

    // Fetch By Slug
    builder.addCase(fetchBlogPostBySlug.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBlogPostBySlug.fulfilled, (state, action) => {
      state.loading = false;
      state.currentPost = action.payload;
    });
    builder.addCase(fetchBlogPostBySlug.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Error loading blog post";
    });

    // Fetch By ID
    builder.addCase(fetchBlogPostById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBlogPostById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentPost = action.payload;
    });
    builder.addCase(fetchBlogPostById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Error loading blog post";
    });

    // Create Post
    builder.addCase(createBlogPost.pending, (state) => {
      state.operationLoading = true;
      state.operationError = null;
    });
    builder.addCase(createBlogPost.fulfilled, (state, action) => {
      state.operationLoading = false;
      state.posts.unshift(action.payload);
    });
    builder.addCase(createBlogPost.rejected, (state, action) => {
      state.operationLoading = false;
      state.operationError = action.payload || "Error creating post";
    });

    // Update Post
    builder.addCase(updateBlogPost.pending, (state) => {
      state.operationLoading = true;
      state.operationError = null;
    });
    builder.addCase(updateBlogPost.fulfilled, (state, action) => {
      state.operationLoading = false;
      const index = state.posts.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      if (state.currentPost && state.currentPost._id === action.payload._id) {
        state.currentPost = action.payload;
      }
    });
    builder.addCase(updateBlogPost.rejected, (state, action) => {
      state.operationLoading = false;
      state.operationError = action.payload || "Error updating post";
    });

    // Delete Post
    builder.addCase(deleteBlogPost.pending, (state) => {
      state.operationLoading = true;
      state.operationError = null;
    });
    builder.addCase(deleteBlogPost.fulfilled, (state, action) => {
      state.operationLoading = false;
      state.posts = state.posts.filter((p) => p._id !== action.payload);
    });
    builder.addCase(deleteBlogPost.rejected, (state, action) => {
      state.operationLoading = false;
      state.operationError = action.payload || "Error deleting post";
    });

    // Like Post
    builder.addCase(likeBlogPost.fulfilled, (state, action) => {
      const { postId, likes } = action.payload;

      // Current post update
      if (state.currentPost && state.currentPost._id === postId) {
        state.currentPost.likes = likes;
      }

      // Posts array update
      const postIndex = state.posts.findIndex(p => p._id === postId);
      if (postIndex !== -1) {
        state.posts[postIndex].likes = likes;
      }

      // Featured posts array update
      const featuredIndex = state.featuredPosts.findIndex(p => p._id === postId);
      if (featuredIndex !== -1) {
        state.featuredPosts[featuredIndex].likes = likes;
      }
    });

    // Increment View Count
    builder.addCase(incrementViewCount.fulfilled, (state, action) => {
      const { postId, views } = action.payload;

      // Current post update
      if (state.currentPost && state.currentPost._id === postId) {
        state.currentPost.views = views;
      }

      // Posts array update
      const postIndex = state.posts.findIndex(p => p._id === postId);
      if (postIndex !== -1) {
        state.posts[postIndex].views = views;
      }

      // Featured posts array update
      const featuredIndex = state.featuredPosts.findIndex(p => p._id === postId);
      if (featuredIndex !== -1) {
        state.featuredPosts[featuredIndex].views = views;
      }
    });
  },
});

export const { clearCurrentPost, clearError, clearOperationError, setCurrentPage } = blogSlice.actions;
export default blogSlice.reducer;

// Helper functions
// Get featured image safely
export const getFeaturedImage = (post: BlogPost): string => {
  if (typeof post.featuredImage === "string" && post.featuredImage.trim() !== "") {
    return post.featuredImage;
  }
  return "/api/placeholder/400/300"; // Fallback
};

// Get author avatar safely
export const getAuthorAvatar = (author?: BlogPost["author"]): string => {
  if (author?.avatar && author.avatar.trim() !== "") {
    return author.avatar;
  }
  return "/api/placeholder/40/40"; // Fallback
};