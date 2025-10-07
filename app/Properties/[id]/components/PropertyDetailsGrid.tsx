import { motion } from "framer-motion";
import { PropertyType } from "@/app/Types/properties";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
import DetailRow from "./DetailRow";
import { PropertyDetail } from "../../utils/propertyUtils";
import BookingModal from "./BookingModal";

interface PropertyDetailsGridProps {
    property: PropertyType;
    propertyDetails: PropertyDetail[];
    categoryType: string;
}

const PropertyDetailsGrid = ({ property, propertyDetails, categoryType }: PropertyDetailsGridProps) => {
    const getBadgeStyles = (type: string) => {
        switch (type) {
            case 'land':
                return 'bg-yellow-100 text-yellow-800';
            case 'commercial':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-green-100 text-green-800';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
            <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm border"
            >
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b">
                    {property.category?.name || 'Property'} Details
                </h2>
                <div className="space-y-4">
                    {propertyDetails.map((detail, index) => (
                        <DetailRow
                            key={index}
                            label={detail.label}
                            value={detail.value}
                        />
                    ))}
                </div>
            </motion.div>

            <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-sm border"
            >
                <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Contact Information</h2>
                <div className="space-y-4">
                    <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center p-3 bg-gray-50 rounded-lg"
                    >
                        <Phone size={20} className="text-green-500 mr-3" />
                        <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium">{property.contactNumber || "N/A"}</p>
                        </div>
                    </motion.div>
                    <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center p-3 bg-gray-50 rounded-lg"
                    >
                        <Mail size={20} className="text-green-500 mr-3" />
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{property.email || "N/A"}</p>
                        </div>
                    </motion.div>
                </div>

                <BookingModal property={property}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full"
                    >
                        <Button className="w-[250px] mx-auto rounded-full mt-10 bg-green-500 hover:bg-green-700 text-white py-2.5">
                            Book Visit <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeStyles(categoryType)}`}>
                                {property.category?.name || 'Property'}
                            </span>
                        </Button>
                    </motion.button>
                </BookingModal>
            </motion.div>
        </motion.div>
    );
};

export default PropertyDetailsGrid;