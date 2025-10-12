import { Calendar } from 'lucide-react'
import BookingCard from './BookingCard'
import { Booking } from '@/app/Types/Booking';

interface BookingsListProps {
    bookings: Booking[];
    onViewDetails: (booking: Booking) => void;
    onUpdateStatus: (bookingId: string, status: string) => void;
    updatingBookingId: string | null;
}

export default function BookingsList({
    bookings,
    onViewDetails,
    onUpdateStatus,
    updatingBookingId
}: BookingsListProps) {
    if (bookings.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bookings Found</h3>
                    <p className="text-gray-500 text-sm">
                        Try adjusting your search or filters
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                    <BookingCard
                        key={booking._id}
                        booking={booking}
                        onViewDetails={() => onViewDetails(booking)}
                        onUpdateStatus={onUpdateStatus}
                        updating={updatingBookingId === booking._id}
                    />
                ))}
            </div>
        </div>
    )
}