export default function BookingsSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            {/* Header Skeleton */}
            <div className="mb-6 sm:mb-8">
                <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-48 sm:w-64 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-56 sm:w-96 animate-pulse"></div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-sm p-3 sm:p-4">
                        <div className="h-6 bg-gray-200 rounded w-12 mb-2 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                ))}
            </div>

            {/* Filters Skeleton */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
                    <div className="sm:w-48 h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>

            {/* Bookings List Skeleton */}
            <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-4 sm:p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div className="flex-1 flex items-start gap-4">
                                <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                                    <div className="flex gap-2">
                                        <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                                        <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-20 bg-gray-200 rounded animate-pulse lg:w-48"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}