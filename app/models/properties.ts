
import mongoose, { Schema, Document } from 'mongoose';

export interface IProperty extends Document {
    title: string;
    category: {
        name: string;
        fields: Array<{
            id: string;
            name: string;
            value: string | number | boolean;
        }>;
    };
    listingStatus: string;
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
    status: 'Available' | 'Rented' | 'Sold' | 'Pending';
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
    districtName?: string;
    isFavorite?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PropertySchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Property title is required'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters']
        },
        category: {
            name: {
                type: String,
                required: true
            },
            fields: [{
                id: String,
                name: String,
                value: Schema.Types.Mixed
            }]
        },
        listingStatus: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: [true, 'Property price is required'],
            min: [0, 'Price cannot be negative']
        },
        currency: {
            type: String,
            required: true,
            default: 'USD'
        },
        propertySize: {
            type: Number,
            required: true,
            min: [0, 'Property size cannot be negative']
        },
        address: {
            type: String,
            required: [true, 'Property address is required'],
            trim: true
        },
        geoCountryLocation: {
            type: String,
            required: true
        },
        geoLocation: {
            lat: Number,
            lng: Number
        },
        yearBuild: Number,
        images: [String],
        videos: [String],
        ownerId: String,
        contactNumber: {
            type: String,
            required: [true, 'Contact number is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
        },
        status: {
            type: String,
            enum: ['Available', 'Rented', 'Sold', 'Pending'],
            default: 'Available'
        },
        bedrooms: Number,
        bathrooms: Number,
        drawingRoom: Number,
        kitchen: Number,
        floor: Number,
        furnishing: String,
        floorArea: Number,
        parkingSpaces: Number,
        roomsSections: Number,
        landArea: Number,
        plotNumber: String,
        landType: String,
        facilities: String,
        propertyFacilities: [String],
        districtName: String,
        isFavorite: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

// Index for better performance
PropertySchema.index({ status: 1 });
PropertySchema.index({ ownerId: 1 });
PropertySchema.index({ 'category.name': 1 });

export default mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema);