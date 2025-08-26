import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../app/features/user/userAuthSlice';
import loaderReducer from '../app/features/loader/loaderSlice';
import locationReducer from '../app/features/location/locationSlice';
export const store = configureStore({
    reducer: {
        // Add your reducers here
        loader: loaderReducer,
        user: userReducer,
        location: locationReducer, // Assuming locationSlice is similar to loaderSlice
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch