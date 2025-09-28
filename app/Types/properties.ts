export interface CategoryField {
    id: string;
    name: string;
    value: string | number | boolean;
}

export interface Category {
    name: string;
    fields: CategoryField[];
}

export interface PropertyType {
    _id?: string;
    title: string;
    category: Category;
    listingStatus: string
    price: number;
    currency: string;
    propertySize: number;
    address: string;
    geoCountryLocation: string;
    geoLocation?: {
        lat?: number;
        lng?: number;
    };
    yearBuild?: number;
    images: string[];
    videos: string[];
    ownerId?: string;
    contactNumber: string;
    email: string;
    status: "Available" | "Rented" | "Sold" | "Pending";
    bedrooms?: number;
    bathrooms?: number;
    drawingRoom?: number;
    kitchen?: number;
    floor?: number;
    furnishing?: string;
    floorArea?: number;
    parkingSpaces?: number;
    roomsSections?: number;
    landArea?: number;
    plotNumber?: string;
    landType?: string;
    facilities?: string;
    propertyFacilities: string[];
    createdAt?: string;
    updatedAt?: string;
    isFavorite?: boolean;

}

