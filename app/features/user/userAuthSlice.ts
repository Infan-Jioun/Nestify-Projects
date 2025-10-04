import { Role } from "@/lib/roles";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    _id: string;
    name: string;
    email: string;
    role: Role;
    image?: string | null;
    bio?: string | null;
    location?: string | null;
    slug?: string | null;
    website?: string | null;
}

interface UserState {
    users: User[];
    userLoader: boolean;
    currentUser: User | null;
    deletedUser?: User | null;
    error: string | null;
    loading: boolean;
}

const initialState: UserState = {
    users: [],
    userLoader: false,
    currentUser: null,
    error: null,
    loading: false,
    deletedUser: null
};

// Fetch all users
export const fetchUsers = createAsyncThunk(
    "user/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/users");
            if (!res.ok) {
                throw new Error("Failed to fetch users");
            }
            const data: User[] = await res.json();
            return data;
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
);
// updateUserRole
export const updateUserRole = createAsyncThunk(
    "user/updateUserRole",
    async (
        { id, role }: { id: string; role: Role },
        { rejectWithValue, dispatch }
    ) => {
        try {
            const res = await fetch(`/api/users/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role }),
            });
            if (!res.ok) throw new Error("Failed to update user role");

            const data: User = await res.json();

            await dispatch(fetchUsers());

            return data;
        } catch (err: unknown) {
            if (err instanceof Error) return rejectWithValue(err.message);
            return rejectWithValue("An unknown error occurred");
        }
    }
);
// Fetch single user by slug
export const fetchUserBySlug = createAsyncThunk(
    "user/fetchUserBySlug",
    async (slug: string, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/users/${slug}`);
            if (!res.ok) {
                throw new Error("Failed to fetch user");
            }
            const data: User = await res.json();
            return data;
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
);

// Fetch single user by ID
export const fetchUserById = createAsyncThunk(
    "user/fetchUserById",
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/users/id/${id}`);
            if (!res.ok) {
                throw new Error("Failed to fetch user");
            }
            const data: User = await res.json();
            return data;
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
);

// Update user
export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (userData: Partial<User> & { _id: string }, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/users/${userData._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!res.ok) {
                throw new Error("Failed to update user");
            }

            const data: User = await res.json();
            return data;
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
);

// Delete user
export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/users/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete user");
            }
            const data = await res.json();
            return data.deletedUserId;
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
);

const userAuthSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        setUserLoader: (state, action: PayloadAction<boolean>) => {
            state.userLoader = action.payload;
        },
        setCurrentUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
        },

        setDeletedUser: (state, action: PayloadAction<User | null>) => {
            state.deletedUser = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearCurrentUser: (state) => {
            state.currentUser = null;
        },
        updateCurrentUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.currentUser) {
                state.currentUser = { ...state.currentUser, ...action.payload };
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.userLoader = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.userLoader = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.userLoader = false;
                state.error = action.payload as string;
            })

            .addCase(updateUserRole.fulfilled, (state, action: PayloadAction<User>) => {
                const updatedUser = action.payload;
                const index = state.users.findIndex((u) => u._id === updatedUser._id);
                if (index !== -1) state.users[index] = updatedUser;

                if (state.currentUser?._id === updatedUser._id) state.currentUser = updatedUser;
            })
            // Fetch User By Slug
            .addCase(fetchUserBySlug.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserBySlug.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchUserBySlug.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.currentUser = null;
            })

            // Fetch User By ID
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update User
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const updatedUser = action.payload;

                // Update in users array
                const index = state.users.findIndex(user => user._id === updatedUser._id);
                if (index !== -1) {
                    state.users[index] = updatedUser;
                }

                // Update current user if it's the same user
                if (state.currentUser && state.currentUser._id === updatedUser._id) {
                    state.currentUser = updatedUser;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete User
            .addCase(deleteUser.fulfilled, (state, action) => {
                const deletedUserId = action.payload;
                state.users = state.users.filter(user => user._id !== deletedUserId);

                if (state.currentUser && state.currentUser._id === deletedUserId) {
                    state.currentUser = null;
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const {
    setUsers,
    setUserLoader,
    setCurrentUser,
    clearError,
    setDeletedUser,
    clearCurrentUser,
    updateCurrentUser
} = userAuthSlice.actions;

export default userAuthSlice.reducer;