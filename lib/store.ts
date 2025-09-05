import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../app/features/user/userAuthSlice';
import loaderReducer from '../app/features/loader/loaderSlice';
import locationReducer from '../app/features/location/locationSlice';
import propertyCategoryReducer from "../app/features/property/propertyCategorySlice"
import skeletionReducer from '../app/features/skeleton/skeletonSlice';

export const store = configureStore({
    reducer: {
        // Add your reducers here
        user: userReducer,
        location: locationReducer, // Assuming locationSlice is similar to loaderSlice
        loader: loaderReducer,
        propertyCategory: propertyCategoryReducer, 
        skeleton: skeletionReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch