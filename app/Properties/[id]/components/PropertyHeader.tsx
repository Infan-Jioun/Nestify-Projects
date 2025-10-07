import { motion } from "framer-motion";
import { PropertyType } from "@/app/Types/properties";
import { Button } from "@/components/ui/button";
import { MapPin, Heart } from "lucide-react";
import ShareButton from "./ShareButton";

interface PropertyHeaderProps {
    property: PropertyType;
    isBookmarked: boolean;
    onToggleBookmark: () => void;
    baseUrl: string;
}

const PropertyHeader = ({ property, isBookmarked, onToggleBookmark, baseUrl }: PropertyHeaderProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6"
        >
            <div className="mb-4 lg:mb-0 lg:pr-4 flex-1">
                <div className="flex items-center mb-2">
                    <motion.span
                        whileHover={{ scale: 1.05 }}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${property.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                        {property.status}
                    </motion.span>
                    <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="ml-3 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                    >
                        {property.listingStatus}
                    </motion.span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-600">
                    <MapPin size={18} className="mr-1" />
                    <span>{property.address}, {property.geoCountryLocation}</span>
                </div>
            </div>
            <div className="flex flex-col items-start lg:items-end">
                <motion.p
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-xl md:text-2xl font-semibold text-green-500 mb-2"
                >
                    {property.currency} {property.price?.toLocaleString() ?? '0'}
                </motion.p>
                <div className="flex space-x-2">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant={isBookmarked ? "secondary" : "ghost"}
                            onClick={onToggleBookmark}
                            className={`flex items-center ${isBookmarked ? 'text-red-500 border-red-200 bg-red-50' : ''}`}
                        >
                            <Heart
                                size={18}
                                className={`mr-1 ${isBookmarked ? 'fill-current' : ''}`}
                            />
                            {isBookmarked ? 'Saved' : 'Save'}
                        </Button>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ShareButton
                            url={`${baseUrl}/Properties/${property._id}`}
                            title={`${property.title} - ${property.category?.name || "Property"}`}
                        />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default PropertyHeader;