import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    image?: string | null;

}

interface UserState {
    users: User[];
    userLoader: boolean;
    currentUser: User | null;
    error: string | null;
    loading: boolean
}

const initialState: UserState = {
    users: [],
    userLoader: false,
    currentUser: null,
    error: null,
    loading: false
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

// Fetch single user
export const fetchUserById = createAsyncThunk(
    "user/fetchUserById",
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/users/${id}`);
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
export const deletedUser = createAsyncThunk(
    "user/deleteUser",
    async (id: string, { rejectWithValue }) => {
        try {
            await fetch(`/api/users/${id}`, { method: "DELETE" });
            const res = await fetch("/api/users");
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
        clearError: (state) => {
            state.error = null;
        },
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

            // Fetch User By ID
            .addCase(fetchUserById.pending, (state) => {
                state.userLoader = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.userLoader = false;
                state.currentUser = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.userLoader = false;
                state.error = action.payload as string;
            })

            // Update User
            .addCase(updateUser.pending, (state) => {
                state.userLoader = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.userLoader = false;
                const updatedUser = action.payload;
                const index = state.users.findIndex(user => user._id === updatedUser._id);
                if (index !== -1) {
                    state.users[index] = updatedUser;
                }
                if (state.currentUser && state.currentUser._id === updatedUser._id) {
                    state.currentUser = updatedUser;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.userLoader = false;
                state.error = action.payload as string;
            })

            // Delete User
            .addCase(deletedUser.fulfilled, (state, action) => {
                state.users = action.payload;
            });
    },
});

export const { setUsers, setUserLoader, setCurrentUser, clearError } = userAuthSlice.actions;
export default userAuthSlice.reducer;