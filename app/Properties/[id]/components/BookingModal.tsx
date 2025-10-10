// components/BookingModal.tsx
"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UserInfoBadge from "./UserInfoBadge";
import LoginPrompt from "./LoginPrompt";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { BookingModalProps, FormDataType } from "@/app/Types/Booking";
import { BookingHeader } from "./BookingHeader";
import { PropertySummary } from "./PropertySummary";
import { BookingForm } from "./BookingForm";
import { submitBooking, resetBookingForm, setBookingFormData, updateBookingFormField } from "../../../features/booking/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/lib/store";
import { updatePropertyStatusLocal } from "../../../features/Properties/propertySlice";
import { PropertyType } from "@/app/Types/properties";
import { useRouter } from "next/navigation";

const BookingModal = ({ property, children }: BookingModalProps & { property: Partial<PropertyType> }) => {
    const { data: session } = useSession();
    const currentUser = session?.user;
    const dispatch = useAppDispatch();

    const { loading, error, success } = useAppSelector((state: RootState) => state.booking);
    const formData = useAppSelector((state: RootState) => state.booking.formData);
    const isAutoFilled = useAppSelector((state: RootState) => state.booking.isAutoFilled);
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [hasCheckedUser, setHasCheckedUser] = useState(false);

    const isPropertySold = property.status === "Sold";

    // Auto-fill booking form if user is logged in
    useEffect(() => {
        if (open && currentUser && !isPropertySold) {
            const autoFillData: FormDataType = {
                name: currentUser.name || "",
                email: currentUser.email || "",
                mobile: "",
                date: "",
                time: "",
                message: `Hello, I'm interested in viewing "${property.title}" located at ${property.address}. Please contact me to schedule a visit.`,
            };
            dispatch(setBookingFormData(autoFillData));
        }
    }, [open, currentUser, property, isPropertySold, dispatch]);

    // Reset form when modal closes
    useEffect(() => {
        if (!open) {
            setHasCheckedUser(false);
            setTimeout(() => {
                dispatch(resetBookingForm());
            }, 300);
        }
    }, [open, dispatch]);

    // Handle success/error notifications
    useEffect(() => {
        if (error) toast.error(error);
        if (success) {
            toast.success("Booking request submitted successfully! We will contact you within 24 hours.");
            router.push("/Properties/UserBookings")
            setOpen(false);

            if (property._id) {
                dispatch(updatePropertyStatusLocal({
                    propertyId: property._id,
                    status: "Sold"
                }));
            }
        }
    }, [error, success, property._id, dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (isPropertySold) return;
        dispatch(updateBookingFormField({
            field: e.target.name as keyof FormDataType,
            value: e.target.value
        }));
    };

    const handleSelectChange = (field: keyof FormDataType, value: string) => {
        if (isPropertySold) return;
        dispatch(updateBookingFormField({ field, value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isPropertySold) {
            toast.error("This property has already been sold. Booking is unavailable.");
            return;
        }

        if (!currentUser) {
            setHasCheckedUser(true);
            return;
        }

        if (currentUser.id && currentUser.email) {
            dispatch(submitBooking({
                formData,
                property: property as PropertyType,
                currentUser: {
                    id: currentUser.id,
                    name: currentUser.name,
                    email: currentUser.email,
                    image: currentUser.image
                }
            }));
        }
    };

    const handleLoginRedirect = () => {
        window.location.href = "/LoginPage?redirect=" + encodeURIComponent(window.location.pathname);
        setOpen(false);
    };

    const handleCloseLoginPrompt = () => {
        setHasCheckedUser(false);
        setOpen(false);
    };

    // Show login prompt if user not logged in
    if (!currentUser && hasCheckedUser) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className="max-w-lg w-[95vw] max-h-[95vh] overflow-y-auto rounded-2xl p-0 border-0">
                    <div className="h-full overflow-y-auto">
                        <LoginPrompt
                            property={property as PropertyType}
                            onLoginRedirect={handleLoginRedirect}
                            onClose={handleCloseLoginPrompt}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-lg w-[95vw] max-h-[95vh] overflow-y-auto rounded-2xl p-0 border-0">
                <div className="h-full overflow-y-auto">
                    <BookingHeader
                        isAutoFilled={isAutoFilled}
                        currentUser={currentUser}
                        isPropertySold={isPropertySold}
                    />
                    <PropertySummary
                        property={property as PropertyType}
                        isPropertySold={isPropertySold}
                    />
                    {currentUser && <UserInfoBadge currentUser={currentUser} />}
                    <BookingForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleSelectChange={handleSelectChange}
                        handleSubmit={handleSubmit}
                        isLoading={loading}
                        currentUser={currentUser}
                        property={property as PropertyType}
                        isPropertySold={isPropertySold}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;
