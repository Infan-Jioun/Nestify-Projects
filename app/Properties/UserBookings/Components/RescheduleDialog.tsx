
"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Booking } from "./types";


interface RescheduleDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    booking: Booking | null;
    onReschedule: (bookingId: string, bookingDate: string, bookingTime: string, message?: string) => void;
    loading: boolean;
}

// MongoDB ISO string → "YYYY-MM-DD" for input[type=date]
const toInputDate = (dateStr: string): string => {
    if (!dateStr) return "";
    try {
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return "";
        const year = d.getUTCFullYear();
        const month = String(d.getUTCMonth() + 1).padStart(2, "0");
        const day = String(d.getUTCDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    } catch {
        return "";
    }
};

const getMinDate = (): string => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return toInputDate(tomorrow.toISOString());
};

export const RescheduleDialog: React.FC<RescheduleDialogProps> = ({
    open, onOpenChange, booking, onReschedule, loading,
}) => {
    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (booking) {
            setBookingDate(toInputDate(booking.bookingDate));
            setBookingTime(booking.bookingTime ?? "");
            setMessage(booking.message ?? "");
        }
    }, [booking]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (booking && bookingDate && bookingTime) {
            onReschedule(booking._id, bookingDate, bookingTime, message);
        }
    };

    if (!booking) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md rounded-2xl border-0 shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-t-2xl" />

                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-green-600" />
                        </div>
                        Reschedule Viewing
                    </DialogTitle>
                    <DialogDescription className="text-gray-500">
                        Pick a new date and time for your property visit.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5 mt-2">
                    <div className="space-y-2">
                        <Label htmlFor="rDate" className="font-semibold text-gray-800 flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-green-600" /> New Date
                        </Label>
                        <Input
                            id="rDate"
                            type="date"
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            min={getMinDate()}
                            required
                            className="rounded-xl border-2 border-gray-200 focus:border-green-400 h-11"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="rTime" className="font-semibold text-gray-800 flex items-center gap-2">
                            <Clock className="h-4 w-4 text-green-600" /> New Time
                        </Label>
                        <Input
                            id="rTime"
                            type="time"
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            required
                            className="rounded-xl border-2 border-gray-200 focus:border-green-400 h-11"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="rMessage" className="font-semibold text-gray-800">
                            Note <span className="text-gray-400 font-normal">(optional)</span>
                        </Label>
                        <Textarea
                            id="rMessage"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Any special requests for the rescheduled viewing..."
                            rows={3}
                            className="rounded-xl border-2 border-gray-200 focus:border-green-400 resize-none"
                        />
                    </div>

                    <DialogFooter className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={loading}
                            className="flex-1 rounded-xl border-2 h-11"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading || !bookingDate || !bookingTime}
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl h-11 font-semibold shadow-lg shadow-green-500/25 disabled:opacity-50"
                        >
                            {loading
                                ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Rescheduling...</>
                                : <><Clock className="h-4 w-4 mr-2" /> Confirm</>
                            }
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};