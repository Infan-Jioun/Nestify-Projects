import { motion, AnimatePresence } from "framer-motion";
import { PropertyType } from "@/app/Types/properties";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
    property: PropertyType;
    currentImageIndex: number;
    onNextImage: () => void;
    onPrevImage: () => void;
    onGoToImage: (index: number) => void;
    categoryType: string;
}

const ImageGallery = ({
    property,
    currentImageIndex,
    onNextImage,
    onPrevImage,
    onGoToImage,
    categoryType
}: ImageGalleryProps) => {
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 }
        }
    };

    const getCategoryEmoji = (type: string) => {
        switch (type) {
            case 'land': return '🌳';
            case 'commercial': return '🏢';
            default: return '🏠';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
        >
            {property.images && property.images.length > 0 ? (
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <div className="relative h-64 md:h-96 bg-gray-200">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={property.images[currentImageIndex]}
                                alt={property.title}
                                className="w-full h-full object-cover"
                                variants={imageVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                            />
                        </AnimatePresence>

                        {property.images.length > 1 && (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onPrevImage}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={24} className="text-gray-800" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={onNextImage}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={24} className="text-gray-800" />
                                </motion.button>
                            </>
                        )}

                        {property.images.length > 1 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm"
                            >
                                {currentImageIndex + 1} / {property.images.length}
                            </motion.div>
                        )}
                    </div>

                    {property.images.length > 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex overflow-x-auto py-3 px-4 bg-gray-100 space-x-2"
                        >
                            {property.images.map((img, idx) => (
                                <motion.button
                                    key={idx}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => onGoToImage(idx)}
                                    className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 ${currentImageIndex === idx ? 'border-green-500' : 'border-transparent'}`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </div>
            ) : (
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative rounded-xl overflow-hidden shadow-lg"
                >
                    <div className="relative h-64 md:h-96 bg-gray-200 flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-gray-500 text-center"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-4xl mb-2"
                            >
                                {getCategoryEmoji(categoryType)}
                            </motion.div>
                            <p>No Image Available</p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default ImageGallery;