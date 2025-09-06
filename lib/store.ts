import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../app/features/user/userAuthSlice';
import loaderReducer from '../app/features/loader/loaderSlice';
import locationReducer from '../app/features/location/locationSlice';
import propertiesReducer from "../app/features/Properties/propertySlice"
import propertyCategoryReducer from "../app/features/property/propertyCategorySlice"
import skeletionReducer from '../app/features/skeleton/skeletonSlice';
import searchLocationReducer from '../app/features/SearchLocation/SearchLocationSlice'
export const store = configureStore({
    reducer: {
        // Add your reducers here
        user: userReducer,
        location: locationReducer, // Assuming locationSlice is similar to loaderSlice
        loader: loaderReducer,
        properties: propertiesReducer,
        propertyCategory: propertyCategoryReducer,
        skeleton: skeletionReducer,
        searchLocation: searchLocationReducer

    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch