"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { PropertyType } from "@/app/Types/properties";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Calendar,
    Clock,
    User,
    Mail,
    Phone,
    MapPin,
    Home,
    Loader2,
    Star,
    LogIn,
    ArrowRight,
} from "lucide-react";
import {
    setBookingFormData,
    updateBookingFormField,
    resetBookingForm,
    clearAutoFill,
    addRecentBooking,
} from "@/app/features/booking/bookingSlice";
import { AppDispatch, RootState } from "@/lib/store";

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

    // ✅ Session from NextAuth
    const { data: session } = useSession();
    const currentUser = session?.user;

    // Reset hasCheckedUser when modal closes
    useEffect(() => {
        if (!isOpen) {
            setHasCheckedUser(false);
            setTimeout(() => {
                dispatch(resetBookingForm());
            }, 300);
        }
    }, [isOpen, dispatch]);

    // Auto-fill form when modal opens for logged in users
    useEffect(() => {
        if (isOpen && currentUser && !isAutoFilled) {
            const autoFillData = {
                name: currentUser.name || "",
                email: currentUser.email || "",
                phone: (currentUser as any).mobile || "",
                date: "",
                time: "",
                message: `Hello, I'm interested in viewing "${property.title}" located at ${property.address}. Please contact me to schedule a visit.`,
            };
            dispatch(setBookingFormData(autoFillData));
        }
    }, [isOpen, currentUser, dispatch, property, isAutoFilled]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        dispatch(updateBookingFormField({ field: name as keyof typeof formData, value }));

        if (isAutoFilled) dispatch(clearAutoFill());
    };

    const handleSelectChange = (field: keyof typeof formData, value: string) => {
        dispatch(updateBookingFormField({ field, value }));
        if (isAutoFilled) dispatch(clearAutoFill());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentUser) {
            setHasCheckedUser(true);
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    propertyId: property._id,
                    userEmail: currentUser.email,
                    ...formData,
                    propertyTitle: property.title,
                    propertyAddress: property.address,
                    propertyPrice: property.price,
                    propertyCurrency: property.currency,
                }),
            });

            if (!response.ok) throw new Error("Failed to submit booking");

            const result = await response.json();
            console.log("Booking submitted successfully:", result);

            dispatch(addRecentBooking(property._id ?? ""));
            dispatch(resetBookingForm());
            setIsOpen(false);

            alert(" Booking request submitted successfully! We'll contact you within 24 hours.");
        } catch (error) {
            console.error("Booking failed:", error);
            alert(" Failed to submit booking. Please try again or contact us directly.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) setHasCheckedUser(false);
    };

    const handleLoginRedirect = () => {
        window.location.href =
            "/LoginPage?redirect=" + encodeURIComponent(window.location.pathname);
        setIsOpen(false);
    };

    const handleCloseLoginPrompt = () => {
        setHasCheckedUser(false);
        setIsOpen(false);
    };

    const timeSlots = [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
    ];

    const getInitials = (name: string) =>
        name.split(" ").map((n) => n[0]).join("").toUpperCase();

    // Show Login Prompt if user is not logged in AND we've checked user status
    if (!currentUser && hasCheckedUser) {
        return (
            <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent className="sm:max-w-[450px] p-0 gap-0 overflow-hidden border-0">
                    <div className="bg-gradient-to-br from-green-500 via-green-600 to-green-600 p-6 text-white relative overflow-hidden">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-3 text-white text-xl">
                                <div className="bg-white/20 p-2 rounded-xl">
                                    <LogIn className="h-5 w-5" />
                                </div>
                                <div>
                                    <div>Login Required</div>
                                    <div className="text-sm font-normal text-green-100">
                                        Please login to book this property
                                    </div>
                                </div>
                            </DialogTitle>
                        </DialogHeader>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <User className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Login to Book This Property
                            </h3>
                            <p className="text-gray-600 text-sm">
                                You need to be logged in to schedule property viewings and manage your appointments.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border">
                            <div className="flex items-center gap-3">
                                {property.images && property.images.length > 0 ? (
                                    <img
                                        src={property.images[0]}
                                        alt={property.title}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                                        <Home className="h-6 w-6 text-green-600" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900 text-sm">
                                        {property.title}
                                    </h4>
                                    <p className="text-green-600 font-semibold text-sm">
                                        {property.currency} {property.price?.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 bg-green-50 rounded-lg p-4">
                            <h4 className="font-medium text-green-800 text-sm mb-3 flex items-center gap-2">
                                <Star className="h-4 w-4" />
                                Benefits of creating an account:
                            </h4>
                            <ul className="text-green-700 text-sm space-y-2">
                                <li>Book property viewings instantly</li>
                                <li>Save your favorite properties</li>
                                <li>Track your booking history</li>
                                <li>Get personalized recommendations</li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <Button
                                onClick={handleLoginRedirect}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                            >
                                <LogIn className="h-4 w-4 mr-2" />
                                Login / Create Account
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>

                            <Button
                                onClick={handleCloseLoginPrompt}
                                variant="outline"
                                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Maybe Later
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }


    // Show Booking Form if user is logged in OR we haven't checked user status yet
    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden border-0">
                {/* Header */}
                <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 p-6 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-3 text-white text-xl">
                                <div className="bg-white/20 p-2 rounded-xl">
                                    <Home className="h-5 w-5" />
                                </div>
                                <div>
                                    <div>Schedule Visit</div>
                                    <div className="text-sm font-normal text-green-100">
                                        Book your property viewing
                                    </div>
                                </div>
                            </DialogTitle>
                        </DialogHeader>

                        {isAutoFilled && currentUser && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 mt-3 text-green-200 text-xs bg-white/10 p-2 rounded-lg"
                            >
                                <span>✅ Form auto-filled with your profile</span>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Property Summary */}
                <div className="p-6 pb-4">
                    <div className="bg-gradient-to-r from-gray-50 to-green-50 p-4 rounded-xl border border-green-100">
                        <div className="flex items-start gap-4">
                            {property.images && property.images.length > 0 ? (
                                <img
                                    src={property.images[0]}
                                    alt={property.title}
                                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                                    <Home className="h-6 w-6 text-green-600" />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                                    {property.title}
                                </h3>
                                <div className="flex items-center gap-1 mt-1 text-xs text-gray-600">
                                    <MapPin className="h-3 w-3 flex-shrink-0" />
                                    <span className="truncate">{property.address}</span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-green-600 font-bold text-sm">
                                        {property.currency} {property.price?.toLocaleString()}
                                    </p>
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        <span>4.8</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Info Badge - Only show if user is logged in */}
                {currentUser && (
                    <div className="px-6 pb-4">
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-200">
                            {currentUser.image ? (
                                <img
                                    src={currentUser.image}
                                    alt={currentUser.name}
                                    className="w-8 h-8 rounded-full"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-medium">
                                    {getInitials(currentUser.name)}
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {currentUser.name}
                                </p>
                                <p className="text-xs text-gray-600 truncate">
                                    {currentUser.email}
                                </p>
                            </div>
                            <div className="text-xs text-green-600 font-medium">
                                ✓ Verified
                            </div>
                        </div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                Full Name *
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                placeholder="Your full name"
                                className="focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                Phone *
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                placeholder="Phone number"
                                className="focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email Address *
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="your@email.com"
                            className="focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Date Field */}
                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                                Preferred Date *
                            </Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                                min={new Date().toISOString().split('T')[0]}
                                className="focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Time Field */}
                        <div className="space-y-2">
                            <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                                Preferred Time *
                            </Label>
                            <Select
                                value={formData.time}
                                onValueChange={(value) => handleSelectChange('time', value)}
                                required
                            >
                                <SelectTrigger className="focus:ring-green-500 focus:border-green-500">
                                    <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                    {timeSlots.map((time) => (
                                        <SelectItem key={time} value={time}>
                                            {time} {parseInt(time) < 12 ? 'AM' : 'PM'}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                            Additional Message
                        </Label>
                        <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Any specific requirements, questions, or special requests you'd like to share..."
                            className="resize-none focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 h-auto text-base shadow-lg"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                                    Submitting Request...
                                </>
                            ) : (
                                <>
                                    <Calendar className="h-5 w-5 mr-2" />
                                    {currentUser ? 'Schedule Property Visit' : 'Check Availability'}
                                </>
                            )}
                        </Button>
                    </motion.div>

                    {/* Additional Info */}
                    <div className="text-center space-y-2">
                        <p className="text-xs text-gray-500">
                            We'll confirm your appointment via email and SMS within 24 hours
                        </p>
                        {currentUser ? (
                            <div className="flex items-center justify-center gap-2 text-xs">
                                <div className="text-green-600 font-medium">
                                    ✓ Logged in as {currentUser.name}
                                </div>
                            </div>
                        ) : (
                            <div className="text-orange-600 text-xs font-medium">
                                ⓘ Please login to complete booking
                            </div>
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;