export default function LoadingSkeleton() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section Skeleton */}
            <div className="relative py-32 px-6 text-center bg-gradient-to-br from-green-50 via-white to-green-100 overflow-hidden">
                <div className="max-w-4xl mx-auto">
                    <div className="h-12 bg-gray-200 rounded animate-pulse w-3/4 mx-auto mb-6"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2 mx-auto"></div>
                </div>
            </div>

            {/* Mission & Vision Skeleton */}
            <div className="max-w-7xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-12">
                {[1, 2].map((item) => (
                    <div key={item} className="bg-white rounded-2xl p-10 h-full animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                ))}
            </div>

            {/* Values Section Skeleton */}
            <div className="bg-gradient-to-r from-green-50 to-yellow-50 py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="h-10 bg-gray-200 rounded animate-pulse w-1/4 mx-auto mb-16"></div>
                    <div className="flex flex-col md:flex-row md:justify-between gap-12">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex-1 text-center">
                                <div className="bg-white p-8 rounded-2xl">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                                    <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-3"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section Skeleton */}
            <div className="relative py-28 px-6 text-center bg-gray-200">
                <div className="max-w-3xl mx-auto">
                    <div className="h-10 bg-gray-300 rounded animate-pulse w-3/4 mx-auto mb-6"></div>
                    <div className="h-5 bg-gray-300 rounded animate-pulse w-1/2 mx-auto mb-10"></div>
                    <div className="h-12 bg-gray-300 rounded animate-pulse w-48 mx-auto"></div>
                </div>
            </div>

            {/* Contact Section Skeleton */}
            <div className="bg-white py-24 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="h-10 bg-gray-200 rounded animate-pulse w-1/4 mx-auto mb-6"></div>
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-1/2 mx-auto mb-10"></div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                        <div className="md:col-span-2 h-32 bg-gray-200 rounded animate-pulse"></div>
                        <div className="md:col-span-2 h-12 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Property Seller Section Skeleton */}
            <div className="bg-gradient-to-r from-yellow-50 to-green-50 py-24 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="h-10 bg-gray-200 rounded animate-pulse w-1/2 mx-auto mb-6"></div>
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-2/3 mx-auto mb-12"></div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white p-8 rounded-2xl">
                                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                                <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-3"></div>
                                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                            </div>
                        ))}
                    </div>
                    <div className="h-12 bg-gray-200 rounded animate-pulse w-48 mx-auto mt-12"></div>
                </div>
            </div>
        </div>
    );
}