import { PropertyType, CategoryField } from '@/app/Types/properties'

export interface EditPropertyModalProps {
    property: PropertyType | null
    isOpen: boolean
    onClose: () => void
    onSave: (propertyData: PropertyType) => Promise<void> | void
    loading?: boolean
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
}

export interface FacilityType {
    id: string
    name: string
    icon: React.ComponentType<{ className?: string }>
}