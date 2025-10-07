"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { PropertyType } from "@/app/Types/properties";
import {
    setBookingFormData,
    updateBookingFormField,
    resetBookingForm,
    clearAutoFill,
    addRecentBooking,
} from "@/app/features/booking/bookingSlice";
import { AppDispatch, RootState } from "@/lib/store";

import BookingLoginPrompt from "./BookingLoginPrompt";
import BookingHeader from "./BookingHeader";
import BookingForm from "./BookingForm";
import PropertySummary from "./PropertySummary";
import UserBadge from "./UserBadge";

interface BookingModalProps {
    property: PropertyType;
    children: React.ReactNode;
}

const BookingModal = ({ property, children }: BookingModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasCheckedUser, setHasCheckedUser] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const { formData, isAutoFilled } = useSelector(
        (state: RootState) => state.booking
    );
    const { data: session } = useSession();
    const currentUser = session?.user;

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setHasCheckedUser(false);
            setTimeout(() => {
                dispatch(resetBookingForm());
            }, 300);
        }
    }, [isOpen, dispatch]);

    // Auto-fill user data
    useEffect(() => {
        if (isOpen && currentUser && !isAutoFilled) {
            const autoFillData = {
                name: currentUser.name || "",
                email: currentUser.email || "",
                mobile: "",
                date: "",
                time: "",
                message: `Hello, I'm interested in viewing "${property.title}" located at ${property.address}. Please contact me to schedule a visit.`,
            };
            dispatch(setBookingFormData(autoFillData));
        }
    }, [isOpen, currentUser, dispatch, property, isAutoFilled]);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) setHasCheckedUser(false);
    };

    // If not logged in → show login prompt
    if (!currentUser && hasCheckedUser) {
        return (
            <BookingLoginPrompt
                property={property}
                isOpen={isOpen}
                onOpenChange={handleOpenChange}
                onClose={() => setIsOpen(false)}
                onLoginRedirect={() => {
                    window.location.href =
                        "/LoginPage?redirect=" + encodeURIComponent(window.location.pathname);
                    setIsOpen(false);
                }}
                onMaybeLater={() => {
                    setHasCheckedUser(false);
                    setIsOpen(false);
                }}
            >
                {children}
            </BookingLoginPrompt>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="sm:max-w-[500px] w-[95vw] max-h-[90vh] overflow-y-auto p-0 gap-0 border-0">
                {/* Mobile Close Button */}
                <div className="sm:hidden absolute top-4 right-4 z-50">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        className="h-8 w-8 rounded-full bg-black/20 text-white hover:bg-black/30"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <BookingHeader currentUser={currentUser} isAutoFilled={isAutoFilled} />
                <PropertySummary property={property} />
                {currentUser && <UserBadge currentUser={currentUser} />}
                <BookingForm
                    formData={formData}
                    property={property}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    currentUser={currentUser}
                    dispatch={dispatch}
                    setHasCheckedUser={setHasCheckedUser}
                />
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;
