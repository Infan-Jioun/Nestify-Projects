"use client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BlogPost } from "@/app/Types/BlogPost";

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
  { posts: BlogPost[]; total: number; pages: number },
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
    return response.data;
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

// Create new blog post
export const createBlogPost = createAsyncThunk<
  BlogPost,
  Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'likes'>,
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
// আপনার existing blogSlice-এ এই actions থাকা উচিত
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

export const likeBlogPost = createAsyncThunk<
  { postId: string; likes: number },
  string,
  { rejectValue: string }
>("blog/likePost", async (postId, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/blog/${postId}/like`);
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to like post");
  }
});

export const incrementViewCount = createAsyncThunk<
  { postId: string; views: number },
  string,
  { rejectValue: string }
>("blog/incrementViews", async (postId, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/blog/${postId}/view`);
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(error.response?.data?.message || "Failed to increment view count");
  }
});

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Posts
    builder.addCase(fetchBlogPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBlogPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload.posts;
      state.totalPosts = action.payload.total;
      state.totalPages = action.payload.pages;
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
    builder.addCase(fetchBlogPostBySlug.fulfilled, (state, action) => {
      state.currentPost = action.payload;
    });

    // Fetch By ID
    builder.addCase(fetchBlogPostById.fulfilled, (state, action) => {
      state.currentPost = action.payload;
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
    builder.addCase(updateBlogPost.fulfilled, (state, action) => {
      const index = state.posts.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) state.posts[index] = action.payload;
    });

    // Delete Post
    builder.addCase(deleteBlogPost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((p) => p._id !== action.payload);
    });
  },
});

export default blogSlice.reducer;
