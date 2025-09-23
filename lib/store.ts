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
import citySliceReducer from '../app/features/city/citySlice'
export const store = configureStore({
    reducer: {
        // Add your reducers here
        user: userReducer,
        // LoaderReducer
        loader: loaderReducer,
        skeleton: skeletionReducer,

        // Property Reducer
        properties: propertiesReducer,
        propertyCategory: propertyCategoryReducer,
        propertyFacilities: propertyFacilitiesReducer,
        location: locationReducer,
        searchLocation: searchLocationReducer,
        filter: filterSliceReducer,
        city: citySliceReducer


    },

})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch