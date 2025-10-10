import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PropertyType } from '@/app/Types/properties';
import { updatePropertyStatus, setPropertyAvailable, setPropertySold } from '../Properties/propertySlice';
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
    rescheduleLoading: { [bookingId: string]: boolean };
    cancelLoading: { [bookingId: string]: boolean };
}
interface Booking {
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
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    createdAt: string;
    updatedAt: string;
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
    success: false,
    rescheduleLoading: {},
    cancelLoading: {}
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
                    name: formData.name,
                    email: formData.email,
                    mobile: formData.mobile,
                    date: formData.date,
                    time: formData.time,
                    message: formData.message,
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
                // API call to update property status
                dispatch(updatePropertyStatus({
                    propertyId: property._id,
                    status: "Sold"
                }));

                // Local state update immediately
                dispatch(setPropertySold(property._id));
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

// Thunk to reschedule a booking
export const rescheduleBooking = createAsyncThunk<
    { success: boolean; booking: Booking },
    {
        bookingId: string;
        bookingDate: string;
        bookingTime: string;
        message?: string;
    },
    { rejectValue: string }
>(
    "booking/reschedule",
    async ({ bookingId, bookingDate, bookingTime, message }, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/bookings/${bookingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bookingDate,
                    bookingTime,
                    message
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to reschedule booking");
            }

            const result = await response.json();
            return result;

        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Failed to reschedule booking");
        }
    }
);

// Thunk to cancel a booking
export const cancelBooking = createAsyncThunk<
    { success: boolean; booking: Booking; propertyId: string },
    { bookingId: string; propertyId: string },
    { rejectValue: string }
>(
    "booking/cancel",
    async ({ bookingId, propertyId }, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(`/api/bookings/${bookingId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to cancel booking");
            }

            const result = await response.json();

            // When booking is cancelled, update property status back to "Available"
            if (result.success && propertyId) {
                // API call to update property status
                dispatch(updatePropertyStatus({
                    propertyId: propertyId,
                    status: "Available"
                }));

                // Local state update immediately
                dispatch(setPropertyAvailable(propertyId));
            }

            return {
                ...result,
                propertyId
            };

        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Failed to cancel booking");
        }
    }
);

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
            state.success = false;
            state.error = null;
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
        },
        clearBookingError: (state) => {
            state.error = null;
        },
        clearBookingSuccess: (state) => {
            state.success = false;
        },
        setRescheduleLoading: (state, action: PayloadAction<{ bookingId: string; loading: boolean }>) => {
            state.rescheduleLoading[action.payload.bookingId] = action.payload.loading;
        },
        setCancelLoading: (state, action: PayloadAction<{ bookingId: string; loading: boolean }>) => {
            state.cancelLoading[action.payload.bookingId] = action.payload.loading;
        }
    },
    extraReducers: (builder) => {
        builder
            // Submit Booking
            .addCase(submitBooking.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(submitBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                if (action.payload.propertyId) {
                    state.recentBookings = [
                        action.payload.propertyId,
                        ...state.recentBookings.filter(id => id !== action.payload.propertyId)
                    ].slice(0, 10);
                }
                state.formData = initialState.formData;
                state.isAutoFilled = false;
            })
            .addCase(submitBooking.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || "Failed to submit booking";
            })
            // Reschedule Booking
            .addCase(rescheduleBooking.pending, (state, action) => {
                const bookingId = action.meta.arg.bookingId;
                state.rescheduleLoading[bookingId] = true;
                state.error = null;
            })
            .addCase(rescheduleBooking.fulfilled, (state, action) => {
                const bookingId = action.meta.arg.bookingId;
                state.rescheduleLoading[bookingId] = false;
                state.success = true;
            })
            .addCase(rescheduleBooking.rejected, (state, action) => {
                const bookingId = action.meta.arg.bookingId;
                state.rescheduleLoading[bookingId] = false;
                state.error = action.payload || "Failed to reschedule booking";
            })
            // Cancel Booking
            .addCase(cancelBooking.pending, (state, action) => {
                const bookingId = action.meta.arg.bookingId;
                state.cancelLoading[bookingId] = true;
                state.error = null;
            })
            .addCase(cancelBooking.fulfilled, (state, action) => {
                const bookingId = action.meta.arg.bookingId;
                state.cancelLoading[bookingId] = false;
                state.success = true;
            })
            .addCase(cancelBooking.rejected, (state, action) => {
                const bookingId = action.meta.arg.bookingId;
                state.cancelLoading[bookingId] = false;
                state.error = action.payload || "Failed to cancel booking";
            });
    }
});

export const { setBookingFormData,
    updateBookingFormField,
    resetBookingForm,
    clearAutoFill,
    addRecentBooking,
    clearRecentBookings,
    clearBookingError,
    clearBookingSuccess,
    setRescheduleLoading,
    setCancelLoading
} = bookingSlice.actions;

export default bookingSlice.reducer;