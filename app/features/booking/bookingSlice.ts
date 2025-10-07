import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PropertyType } from '@/app/Types/properties';
import { updatePropertyStatus } from '../Properties/propertySlice';
import { FormDataType } from '@/app/Types/Booking';


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
    loading: boolean;
    error: string | null;
    success: boolean;
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
    recentBookings: [],
    loading: false,
    error: null,
    success: false
};

// Thunk to submit a booking
export const submitBooking = createAsyncThunk<
    { success: boolean; bookingId: string; propertyId: string },
    {
        formData: FormDataType;
        property: PropertyType;
        currentUser: { id: string; name?: string | null; email?: string | null; image?: string | null }
    },
    { rejectValue: string }
>(
    "booking/submit",
    async ({ formData, property, currentUser }, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // User form data
                    name: formData.name,
                    email: formData.email,
                    mobile: formData.mobile,
                    date: formData.date,
                    time: formData.time,
                    message: formData.message,

                    // Property data
                    propertyId: property._id,
                    propertyTitle: property.title,
                    propertyAddress: property.address,
                    propertyPrice: property.price,
                    propertyEmail: property.email || "info@property.com",
                    propertyCurrency: property.currency,
                    propertyImages: property.images || [],
                    propertyStatus: property.status,
                    propertyListingStatus: property.listingStatus,
                    propertyContact: property.contactNumber,

                    // User session info
                    userId: currentUser.id,
                    userImage: currentUser.image,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to submit booking");
            }

            const result = await response.json();

            // If booking is successful, update property status to "Sold"
            if (result.success && property._id) {
                dispatch(updatePropertyStatus({
                    propertyId: property._id,
                    status: "Sold"
                }));
            }

            return {
                success: true,
                bookingId: result.booking.id,
                propertyId: property._id || ""
            };

        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Failed to submit booking");
        }
    }
);

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        // Set booking form data
        setBookingFormData: (state, action: PayloadAction<Partial<BookingFormData>>) => {
            state.formData = { ...state.formData, ...action.payload };
            state.isAutoFilled = true;
        },

        // Update a single booking form field
        updateBookingFormField: (state, action: PayloadAction<{ field: keyof BookingFormData; value: string }>) => {
            state.formData[action.payload.field] = action.payload.value;
        },

        // Reset the booking form
        resetBookingForm: (state) => {
            state.formData = initialState.formData;
            state.isAutoFilled = false;
            state.success = false;
            state.error = null;
        },

        // Clear auto-fill flag
        clearAutoFill: (state) => {
            state.isAutoFilled = false;
        },

        // Add a recent booking
        addRecentBooking: (state, action: PayloadAction<string>) => {
            state.recentBookings = [
                action.payload,
                ...state.recentBookings.filter(id => id !== action.payload)
            ].slice(0, 10);
        },

        // Clear recent bookings
        clearRecentBookings: (state) => {
            state.recentBookings = [];
        },

        // Clear errors
        clearBookingError: (state) => {
            state.error = null;
        },

        // Clear success state
        clearBookingSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Booking submission - pending
            .addCase(submitBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            // Booking submission - fulfilled
            .addCase(submitBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;

                // Add to recent bookings
                if (action.payload.propertyId) {
                    state.recentBookings = [
                        action.payload.propertyId,
                        ...state.recentBookings.filter(id => id !== action.payload.propertyId)
                    ].slice(0, 10);
                }

                // Reset form
                state.formData = initialState.formData;
                state.isAutoFilled = false;
            })
            // Booking submission - rejected
            .addCase(submitBooking.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || "Failed to submit booking";
            });
    }
});

export const {
    setBookingFormData,
    updateBookingFormField,
    resetBookingForm,
    clearAutoFill,
    addRecentBooking,
    clearRecentBookings,
    clearBookingError,
    clearBookingSuccess
} = bookingSlice.actions;

export default bookingSlice.reducer;
