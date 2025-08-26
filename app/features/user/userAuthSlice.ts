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
}

const initialState: UserState = {
    users: [],
}
// delete user slice
export const deletedUser = createAsyncThunk(
    "user/deleteUser",
    async (id: string, { rejectWithValue }) => {
        try {
            await fetch(`/api/users/${id}`, { method: "DELETE" })
            return id;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
)
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deletedUser.fulfilled, (state, action) => {
            state.users = state.users?.filter((user) => user._id !== action.payload);
        })
    }

})
export const { setUsers } = userSlice.actions
export default userSlice.reducer;