import { PropertyType } from "mongodb";


export interface BookingModalProps {
    property: PropertyType;
    children: React.ReactNode;
}

export interface FormDataType {
    name: string;
    email: string;
    mobile: string;
    date: string;
    time: string;
    message: string;
}
