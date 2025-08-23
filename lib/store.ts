import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../app/features/user/userAuthSlice';
export const store = configureStore({
    reducer: {
        // Add your reducers here
        user: userReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch