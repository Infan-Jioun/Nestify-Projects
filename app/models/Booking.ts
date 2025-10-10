import  { Schema, Document, models, model } from 'mongoose';

export interface IBooking extends Document {
    propertyId: string;
    userId: string;
    userName: string;
    userEmail: string;
    userMobile: string;
    bookingDate: string;
    bookingTime: string;
    message: string;
    propertyDetails: {
        title: string;
        email?: string;
        address: string;
        price: number;
        currency: string;
        images?: string[];
        status?: string;
        listingStatus?: string;
        contact?: string;
    };
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema: Schema = new Schema({
    propertyId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userMobile: {
        type: String,
        required: true
    },
    bookingDate: {
        type: String,
        required: true
    },
    bookingTime: {
        type: String,
        required: true
    },
    message: {
        type: String,
        default: ''
    },
    propertyDetails: {
        title: { type: String, required: true },
        email: { type: String },
        address: { type: String, required: true },
        price: { type: Number, required: true },
        currency: { type: String, required: true },
        images: { type: [String], default: [] },
        status: { type: String },
        listingStatus: { type: String },
        contact: { type: String }
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const Booking = models.Booking || model<IBooking>('Booking', BookingSchema);
export default Booking;