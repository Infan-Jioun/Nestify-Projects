// components/BookingForm.tsx (updated interface)
"use client";

import { motion } from "framer-motion";
import { Calendar, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormDataType } from "@/app/Types/Booking";

interface BookingFormProps {
    formData: FormDataType;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSelectChange: (field: keyof FormDataType, value: string) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    isLoading: boolean;
    currentUser?: { name?: string | null };
    property: {
        _id?: string | null;
        title: string;
        address: string;
        price: number;
        currency: string;
        email?: string; // optional করুন
        images?: string[];
        status?: string;
        listingStatus?: string;
        contactNumber?: string;
    };
    isPropertySold?: boolean;
}

export const BookingForm = ({
    formData,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    isLoading,
    currentUser,
    property,
    isPropertySold = false,
}: BookingFormProps) => {
    const timeSlots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30",
    ];

    return (
        <form onSubmit={handleSubmit} className="px-4 sm:px-6 pb-6 space-y-4">
            {/* Name & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        readOnly={!!currentUser?.name}
                        onChange={handleInputChange}
                        required
                        disabled={isPropertySold}
                        placeholder="Your full name"
                        className={isPropertySold ? "bg-gray-100 cursor-not-allowed" : ""}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="mobile">Phone *</Label>
                    <Input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                        disabled={isPropertySold}
                        placeholder="Phone number"
                        className={isPropertySold ? "bg-gray-100 cursor-not-allowed" : ""}
                    />
                </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    readOnly
                    disabled={isPropertySold}
                    placeholder="your@email.com"
                    className={isPropertySold ? "bg-gray-100 cursor-not-allowed" : ""}
                />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date *</Label>
                    <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        disabled={isPropertySold}
                        min={new Date().toISOString().split('T')[0]}
                        className={isPropertySold ? "bg-gray-100 cursor-not-allowed" : ""}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time *</Label>
                    <Select
                        value={formData.time}
                        onValueChange={(value) => handleSelectChange('time', value)}
                        disabled={isPropertySold}
                    >
                        <SelectTrigger className={isPropertySold ? "bg-gray-100 cursor-not-allowed" : ""}>
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

            {/* Additional Message */}
            <div className="space-y-2">
                <Label htmlFor="message">Additional Message</Label>
                <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Any special requirements, questions, or requests..."
                    disabled={isPropertySold}
                    className={isPropertySold ? "bg-gray-100 cursor-not-allowed" : ""}
                />
            </div>

            {/* Submit Button */}
            <motion.div whileHover={{ scale: isPropertySold ? 1 : 1.02 }} whileTap={{ scale: isPropertySold ? 1 : 0.98 }}>
                <Button
                    type="submit"
                    disabled={isLoading || isPropertySold}
                    className={`w-full font-semibold py-3 h-auto text-base shadow-lg ${isPropertySold
                        ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                        : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                        }`}
                >
                    {isPropertySold ? (
                        <>
                            <X className="h-5 w-5 mr-2 flex-shrink-0 text-white" />
                            <span className="truncate">Property Sold - Booking Unavailable</span>
                        </>
                    ) : isLoading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin mr-2 flex-shrink-0" />
                            <span className="truncate">Submitting Request...</span>
                        </>
                    ) : (
                        <>
                            <Calendar className="h-5 w-5 mr-2 flex-shrink-0" />
                            <span className="truncate">{currentUser ? "Schedule Property Visit" : "Check Availability"}</span>
                        </>
                    )}
                </Button>
            </motion.div>

            {/* Additional Info */}
            <div className="text-center space-y-2 pt-2">
                {isPropertySold ? (
                    <p className="text-red-600 text-sm font-medium">
                        ⚠️ This property has been sold and is no longer available for booking
                    </p>
                ) : (
                    <>
                        <p className="text-xs text-gray-500 px-2">
                            We will confirm your appointment via email and SMS within 24 hours
                        </p>
                        {currentUser ? (
                            <div className="flex items-center justify-center gap-2 text-xs">
                                <div className="text-green-600 font-medium truncate">
                                    ✓ Logged in as {currentUser.name}
                                </div>
                            </div>
                        ) : (
                            <div className="text-orange-600 text-xs font-medium">
                                ⓘ Please login to complete booking
                            </div>
                        )}
                    </>
                )}
            </div>
        </form>
    );
};