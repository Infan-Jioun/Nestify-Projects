"use client";
import { motion } from "framer-motion";
import { Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormDataType } from "@/app/Types/Booking";


interface Props {
    formData: FormDataType;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSelectChange: (field: keyof FormDataType, value: string) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    isLoading: boolean;
    currentUser?: { name?: string | null };
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
}

const BookingForm = ({
    formData,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    isLoading,
    currentUser,
    property,
}: Props) => {
    const timeSlots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
        "16:00", "16:30",
    ];

    return (
        <form onSubmit={handleSubmit} className="px-4 sm:px-6 pb-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Full Name *
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                        className="focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">
                        Phone *
                    </Label>
                    <Input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                        placeholder="Phone number"
                        className="focus:ring-green-500 focus:border-green-500"
                    />
                </div>
            </div>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        min={new Date().toISOString().split("T")[0]}
                        className="focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                        Preferred Time *
                    </Label>
                    <Select
                        value={formData.time}
                        onValueChange={(value) => handleSelectChange("time", value)}
                        required
                    >
                        <SelectTrigger className="focus:ring-green-500 focus:border-green-500">
                            <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                            {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                    {time} {parseInt(time) < 12 ? "AM" : "PM"}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Additional Message
                </Label>
                <Textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Any specific requirements, questions, or special requests you'd like to share..."
                    className="resize-none focus:ring-green-500 focus:border-green-500 min-h-[80px]"
                />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-2">
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 h-auto text-base shadow-lg"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin mr-2 flex-shrink-0" />
                            <span className="truncate">Submitting Request...</span>
                        </>
                    ) : (
                        <>
                            <Calendar className="h-5 w-5 mr-2 flex-shrink-0" />
                            <span className="truncate">
                                {currentUser ? 'Schedule Property Visit' : 'Check Availability'}
                            </span>
                        </>
                    )}
                </Button>
            </motion.div>

            {/* Additional Info */}
            <div className="text-center space-y-2 pt-2">
                <p className="text-xs text-gray-500 px-2">
                    We'll confirm your appointment via email and SMS within 24 hours
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
            </div>
        </form>
    );
};

export default BookingForm;