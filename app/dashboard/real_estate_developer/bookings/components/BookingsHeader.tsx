import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import { BookingStats } from '@/app/Types/Booking'

interface BookingsHeaderProps {
    stats: BookingStats
}

export default function BookingsHeader({ stats }: BookingsHeaderProps) {
    return (
        <div className="mb-6 sm:mb-8">
            {/* <div className="flex items-center gap-4 mb-4">
                <Link
                    href="/dashboard/real_estate_developer"
                    className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-sm font-medium">Back to Dashboard</span>
                </Link>
            </div> */}

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Property Bookings</h1>
                    <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                        {"Manage and track all property viewing requests"}
                    </p>
                </div>

                <div className="bg-green-500 text-white rounded-xl p-4 sm:p-6 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5" />
                        <span className="text-sm font-medium">Total Bookings</span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold">{stats.total}</p>
                    <p className="text-green-100 text-xs sm:text-sm mt-1">
                        Across all properties
                    </p>
                </div>
            </div>
        </div>
    )
}