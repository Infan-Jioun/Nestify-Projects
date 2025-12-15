import { CategoryField as OriginalCategoryField } from '@/app/Types/properties'

export interface FacilityType {
    id: string
    name: string
    icon: React.ComponentType<{ className?: string }>
}

export interface CategoryField {
    name: string
    label: string
    type: 'number' | 'text'
}

export interface EditPropertyInputs {
    title: string
    status: 'Available' | 'Rented' | 'Sold' | 'Pending'
    price: number
    currency: string
    propertySize: number
    contactNumber: string
    address: string
    geoCountryLocation: string
    districtName?: string
    images: string[]
    videos: string[]
    email: string
    propertyFacilities: string[]
    category: {
        name: string
        fields: OriginalCategoryField[]
    }
    // Category-specific fields
    bedrooms?: number
    bathrooms?: number
    drawingRoom?: number
    kitchen?: number
    floor?: number
    furnishing?: string
    floorArea?: number
    parkingSpaces?: number
    roomsSections?: number
    landArea?: number
    plotNumber?: string
    landType?: string
    facilities?: string
}
export interface FacilityType {
    id: string
    name: string
    icon: React.ComponentType<{ className?: string }>
}