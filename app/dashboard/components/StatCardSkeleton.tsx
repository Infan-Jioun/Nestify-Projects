export default function StatCardSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="flex items-center justify-between">
                <div className="space-y-3 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div className="flex items-center gap-2">
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
                <div className="p-3 bg-gray-200 rounded-lg">
                    <div className="h-6 w-6 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    )
}
