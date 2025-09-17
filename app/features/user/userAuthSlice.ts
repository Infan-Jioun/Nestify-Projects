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
}

const initialState: UserState = {
    users: [],
    userLoader: false,
};


export const deletedUser = createAsyncThunk(
    "user/deleteUser",
    async (id: string, { rejectWithValue }) => {
        try {
            await fetch(`/api/users/${id}`, { method: "DELETE" })
            const res = await fetch("/api/users")
            const data: User[] = await res.json()
            return data
        } catch (err: unknown) {
            if (err instanceof Error) {
                return rejectWithValue(err.message);
            }
            return rejectWithValue("An unknown error occurred");
        }
    }
)
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        setUserLoader: (state, action: PayloadAction<boolean>) => {
            state.userLoader = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deletedUser.fulfilled, (state, action) => {
            state.users = action.payload
        })
    }
})

export const { setUsers, setUserLoader } = userSlice.actions;
export default userSlice.reducer;
