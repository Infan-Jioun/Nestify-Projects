import { motion } from "framer-motion";
import { PropertyType } from "@/app/Types/properties";

interface AmenitiesSectionProps {
    property: PropertyType;
}

const AmenitiesSection = ({ property }: AmenitiesSectionProps) => {
    if (!property.propertyFacilities || property.propertyFacilities.length === 0) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            className="bg-white p-6 rounded-xl shadow-sm border mb-8"
        >
            <h2 className="text-xl font-semibold mb-4">Features & Amenities</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {property.propertyFacilities.map((feature, idx) => (
                    <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-4"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                            className="w-2 h-2 bg-green-500 rounded-full mr-3"
                        />
                        <span className="text-gray-700">{feature}</span>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

export default AmenitiesSection;