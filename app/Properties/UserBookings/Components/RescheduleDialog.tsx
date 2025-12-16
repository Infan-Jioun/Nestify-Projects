import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Loader2 } from "lucide-react";

interface Booking {
    _id: string;
    bookingDate: string;
    bookingTime: string;
    message: string;
}

interface RescheduleDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    booking: Booking | null;
    onReschedule: (bookingId: string, bookingDate: string, bookingTime: string, message?: string) => void;
    loading: boolean;
}

export const RescheduleDialog: React.FC<RescheduleDialogProps> = ({
    open,
    onOpenChange,
    booking,
    onReschedule,
    loading
}) => {
    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (booking) {
            setBookingDate(booking.bookingDate);
            setBookingTime(booking.bookingTime);
            setMessage(booking.message || "");
        }
    }, [booking]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (booking && bookingDate && bookingTime) {
            onReschedule(booking._id, bookingDate, bookingTime, message);
        }
    };

    const getMinDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1); // Can only reschedule for tomorrow or later
        return today.toISOString().split('T')[0];
    };

    if (!booking) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-green-600" />
                        Reschedule Booking
                    </DialogTitle>
                    <DialogDescription>
                        Update your property viewing appointment date and time.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="bookingDate">New Date</Label>
                        <Input
                            id="bookingDate"
                            type="date"
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            min={getMinDate()}
                            required
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bookingTime">New Time</Label>
                        <Input
                            id="bookingTime"
                            type="time"
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            required
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Additional Message (Optional)</Label>
                        <Textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Any special requests or notes for the rescheduled viewing..."
                            rows={3}
                        />
                    </div>

                    <DialogFooter className="flex gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading || !bookingDate || !bookingTime}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Rescheduling...
                                </>
                            ) : (
                                <>
                                    <Clock className="h-4 w-4 mr-2" />
                                    Reschedule
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};