import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../app/features/user/userAuthSlice';
import loaderReducer from '../app/features/loader/loaderSlice';
export const store = configureStore({
    reducer: {
        // Add your reducers here
        loader: loaderReducer,
        user: userReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch