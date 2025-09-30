import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BlogPost } from "@/app/Types/BlogPost";

// State typea
interface BlogState {
  posts: BlogPost[];
  featuredPosts: BlogPost[];
  currentPost: BlogPost | null;
  loading: boolean;
  error: string | null;
  totalPosts: number;
  currentPage: number;
  totalPages: number;
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
};

// Fetch all blog posts with pagination
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

// Fetch single post by slug
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

// Like a blog post
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

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all posts
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.totalPosts = action.payload.total;
        state.totalPages = action.payload.pages;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch posts";
      })

      // Fetch featured posts
      .addCase(fetchFeaturedPosts.fulfilled, (state, action) => {
        state.featuredPosts = action.payload;
      })

      // Fetch single post
      .addCase(fetchBlogPostBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPostBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchBlogPostBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch post";
      })

      // Like post
      .addCase(likeBlogPost.fulfilled, (state, action) => {
        const { postId, likes } = action.payload;
        if (state.currentPost && state.currentPost.id === postId) {
          state.currentPost.likes = likes;
        }
        const post = state.posts.find((p) => p.id === postId);
        if (post) {
          post.likes = likes;
        }
      });
  },
});

export const { clearCurrentPost, clearError, setPage } = blogSlice.actions;
export default blogSlice.reducer;
