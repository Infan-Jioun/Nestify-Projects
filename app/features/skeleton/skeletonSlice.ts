import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SkeletonState {
    skeletonLoading: boolean;
}
const initialState: SkeletonState = {
    skeletonLoading: false,

}
const skeletonSlice = createSlice({
    name: "skeleton",
    initialState,
    reducers: {
        setSkeletonLoading(state, action: PayloadAction<boolean>) {
            state.skeletonLoading = action.payload;
        }
    }
});
export const { setSkeletonLoading } = skeletonSlice.actions;
export default skeletonSlice.reducer;