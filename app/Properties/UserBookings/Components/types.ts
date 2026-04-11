export interface Booking {
    _id: string;
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
        address: string;
        price: number;
        currency: string;
        images?: string[];
        status?: string;
        listingStatus?: string;
        contact?: string;
    };
    status: "pending" | "confirmed" | "cancelled" | "completed";
    createdAt: string;
    updatedAt: string;
}

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message: string;
}