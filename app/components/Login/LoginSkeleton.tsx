export default function LoginSkeleton() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-green-100 dark:bg-gray-900 overflow-hidden">
            <div className="w-full max-w-md shadow-lg border dark:border-gray-800 bg-white dark:bg-gray-950 animate-pulse">
                <div className="p-6 space-y-2">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
                <div className="px-6 pb-6 space-y-4">
                    <div className="grid gap-1">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                    <div className="grid gap-1">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                </div>
                <div className="px-6 pb-6 space-y-2">
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                </div>
                <div className="px-6 pb-6 space-y-2">
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
            </div>
        </div>
    );
}