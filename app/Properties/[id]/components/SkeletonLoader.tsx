import { motion } from "framer-motion";

const SkeletonLoader = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-6xl mx-auto p-4 md:p-6 space-y-6"
        >
            {/* Back Button Skeleton */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="h-10 w-32 bg-gray-200 rounded-lg"
            />

            {/* Image Gallery Skeleton */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative h-64 md:h-96 bg-gray-200 rounded-xl overflow-hidden"
            />

            {/* Thumbnails Skeleton */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex gap-2 overflow-hidden"
            >
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-20 h-16 bg-gray-200 rounded-md" />
                ))}
            </motion.div>

            {/* Header Section Skeleton */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
            >
                <div className="h-6 w-48 bg-gray-200 rounded" />
                <div className="h-8 w-3/4 bg-gray-200 rounded" />
                <div className="h-5 w-56 bg-gray-200 rounded" />
            </motion.div>

            {/* Key Features Skeleton */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-100 p-4 rounded-xl space-y-2">
                        <div className="h-6 w-6 bg-gray-200 rounded-full mx-auto" />
                        <div className="h-4 w-16 bg-gray-200 rounded mx-auto" />
                        <div className="h-5 w-12 bg-gray-200 rounded mx-auto" />
                    </div>
                ))}
            </motion.div>

            {/* Content Grid Skeleton */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="bg-gray-100 p-6 rounded-xl space-y-4">
                        <div className="h-6 w-40 bg-gray-200 rounded" />
                        {[...Array(5)].map((_, j) => (
                            <div key={j} className="flex justify-between">
                                <div className="h-4 w-24 bg-gray-200 rounded" />
                                <div className="h-4 w-16 bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default SkeletonLoader;