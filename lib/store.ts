import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../app/features/user/userAuthSlice';
import loaderReducer from '../app/features/loader/loaderSlice';
import locationReducer from '../app/features/location/locationSlice';
import propertyReducer from '../app/features/property/propertySlice';
import skeletionReducer from '../app/features/skeleton/skeletonSlice';

export const store = configureStore({
    reducer: {
        // Add your reducers here
        user: userReducer,
        location: locationReducer, // Assuming locationSlice is similar to loaderSlice
        loader: loaderReducer,
        property: propertyReducer, // Assuming propertySlice is similar to loaderSlice
        skeleton: skeletionReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch