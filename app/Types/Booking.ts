export interface FormDataType {
    name: string;
    email: string;
    mobile: string;
    date: string;
    time: string;
    message: string;
}

export interface BookingModalProps {
    property: {
        _id?: string;
        title: string;
        address: string;
        price: number;
        currency: string;
        email?: string;
        images?: string[];
        status?: string;
        listingStatus?: string;
        contactNumber?: string;
    };
    children: React.ReactNode;
}

export interface UserType {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

export interface LoginPromptProps {
    property: BookingModalProps['property'];
    onLoginRedirect: () => void;
    onClose: () => void;
}

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
        email?: string;
    };
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    createdAt: string;
    updatedAt: string;
}

export interface BookingStats {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
}

export interface StatusOption {
    value: string;
    label: string;
    color: string;
}