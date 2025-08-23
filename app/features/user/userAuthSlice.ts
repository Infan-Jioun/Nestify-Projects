import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string | null;
}
interface UserState {
    users: User[] | null;
}

const initialState: UserState = {
    users: [],
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        }
    }

})
export const { setUsers } = userSlice.actions
export default userSlice.reducer;