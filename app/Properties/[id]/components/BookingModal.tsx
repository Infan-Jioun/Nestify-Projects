"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BookingHeader from "./BookingHeader";
import PropertySummary from "./PropertySummary";
import UserInfoBadge from "./UserInfoBadge";
import BookingForm from "./BookingForm";
import LoginPrompt from "./LoginPrompt";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { BookingModalProps, FormDataType } from "@/app/Types/Booking";

const BookingModal = ({ property, children }: BookingModalProps) => {
    const { data: session } = useSession();
    const currentUser = session?.user;
    const [open, setOpen] = useState(false);
    const [hasCheckedUser, setHasCheckedUser] = useState(false);
    const [formData, setFormData] = useState<FormDataType>({
        name: "",
        email: "",
        mobile: "",
        date: "",
        time: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    // Auto-fill form when modal opens and user is logged in
    useEffect(() => {
        if (open && currentUser) {
            const autoFillData = {
                name: currentUser.name || "",
                email: currentUser.email || "",
                mobile: "",
                date: "",
                time: "",
                message: `Hello, I'm interested in viewing "${property.title}" located at ${property.address}. Please contact me to schedule a visit.`,
            };
            setFormData(autoFillData);
        }
    }, [open, currentUser, property]);

    // Reset form when modal closes
    useEffect(() => {
        if (!open) {
            setHasCheckedUser(false);
            setTimeout(() => {
                setFormData({
                    name: "",
                    email: "",
                    mobile: "",
                    date: "",
                    time: "",
                    message: "",
                });
            }, 300);
        }
    }, [open]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (field: keyof FormDataType, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if user is logged in
        if (!currentUser) {
            setHasCheckedUser(true);
            return;
        }

        setIsLoading(true);

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

                    // User info from session
                    userId: currentUser.id,
                    userImage: currentUser.image,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to submit booking");
            }

            const result = await response.json();
            console.log("Booking submitted successfully:", result);

            // Reset form and close modal
            setFormData({
                name: "",
                email: "",
                mobile: "",
                date: "",
                time: "",
                message: "",
            });
            setOpen(false);

            toast.success("Booking request submitted successfully! We'll contact you within 24 hours.");
        } catch (error: unknown) {
            console.error("Booking failed:", error);
            if (error instanceof Error) {
                toast.error(error.message || "Failed to submit booking. Please try again or contact us directly.");
            } else {
                toast.error("Failed to submit booking. Please try again or contact us directly.");
            }
        } finally {
            setIsLoading(false);
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

    const isAutoFilled = !!currentUser?.name && !!currentUser?.email && formData.name === currentUser.name;

    // Show login prompt if user is not logged in and has tried to submit
    if (!currentUser && hasCheckedUser) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className="max-w-lg w-[95vw] max-h-[95vh] overflow-y-auto rounded-2xl p-0 border-0">
                    {/* Scrollable container for mobile */}
                    <div className="h-full overflow-y-auto">
                        <LoginPrompt
                            property={property}
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
                {/* Scrollable container for mobile */}
                <div className="h-full overflow-y-auto">
                    <BookingHeader
                        isAutoFilled={isAutoFilled}
                        currentUser={currentUser}
                    />
                    <PropertySummary property={property} />

                    {currentUser && (
                        <UserInfoBadge currentUser={currentUser} />
                    )}

                    <BookingForm
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleSelectChange={handleSelectChange}
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                        currentUser={currentUser}
                        property={property}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;