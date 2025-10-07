import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookingFormData {
    name: string;
    email: string;
    mobile: string;
    date: string;
    time: string;
    message: string;
}

interface BookingState {
    formData: BookingFormData;
    isAutoFilled: boolean;
    recentBookings: string[];
}

const initialState: BookingState = {
    formData: {
        name: "",
        email: "",
        mobile: "",
        date: "",
        time: "",
        message: ""
    },
    isAutoFilled: false,
    recentBookings: []
};

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setBookingFormData: (state, action: PayloadAction<Partial<BookingFormData>>) => {
            state.formData = { ...state.formData, ...action.payload };
            state.isAutoFilled = true;
        },
        updateBookingFormField: (state, action: PayloadAction<{ field: keyof BookingFormData; value: string }>) => {
            state.formData[action.payload.field] = action.payload.value;
        },
        resetBookingForm: (state) => {
            state.formData = initialState.formData;
            state.isAutoFilled = false;
        },
        clearAutoFill: (state) => {
            state.isAutoFilled = false;
        },
        addRecentBooking: (state, action: PayloadAction<string>) => {
            state.recentBookings = [
                action.payload,
                ...state.recentBookings.filter(id => id !== action.payload)
            ].slice(0, 10); 
        },
        clearRecentBookings: (state) => {
            state.recentBookings = [];
        }
    }
});

export const {setBookingFormData, updateBookingFormField, resetBookingForm,
    clearAutoFill,
    addRecentBooking,
    clearRecentBookings
} = bookingSlice.actions;

export default bookingSlice.reducer;