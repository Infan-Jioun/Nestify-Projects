import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../app/features/user/userAuthSlice';
import loaderReducer from '../app/features/loader/loaderSlice';
import locationReducer from '../app/features/location/locationSlice';
import propertiesReducer from "../app/features/Properties/propertySlice"
import propertyCategoryReducer from "../app/features/property/propertyCategorySlice"
import skeletionReducer from '../app/features/skeleton/skeletonSlice';
import searchLocationReducer from '../app/features/SearchLocation/SearchLocationSlice'
import propertyFacilitiesReducer from '../app/features/propertyFacilties/propertyFaciltiesSlice'
import filterSliceReducer from '../app/features/filter/filterSlice'
import districtSliceReducer from '../app/features/district/districtSlice'
import blogSliceReducer from '../app/features/blog/blogSlice'
import searchSliceReducer from '../app/features/search/searchSlice';
import bookmarkReducer from '../app/features/bookmark/bookmarkSlice';

export const store = configureStore({
    reducer: {
        // Add your reducers here
        user: userReducer,
        // LoaderReducer
        loader: loaderReducer,
        skeleton: skeletionReducer,
        blog: blogSliceReducer,
        // Property Reducer
        properties: propertiesReducer,
        propertyCategory: propertyCategoryReducer,
        propertyFacilities: propertyFacilitiesReducer,
        location: locationReducer,
        searchLocation: searchLocationReducer,
        filter: filterSliceReducer,
        district: districtSliceReducer,
        search: searchSliceReducer,
        bookmarks: bookmarkReducer,


    },


})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch