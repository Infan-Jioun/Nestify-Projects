export default function DistributionSkeleton() {
    return (
        <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center justify-between animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-6"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}
