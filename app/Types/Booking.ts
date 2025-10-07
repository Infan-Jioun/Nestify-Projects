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