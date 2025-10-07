import { motion } from "framer-motion";
import { PropertyType } from "@/app/Types/properties";

interface CategoryBadgeProps {
    property: PropertyType;
    categoryType: string;
}

const CategoryBadge = ({ property, categoryType }: CategoryBadgeProps) => {
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
            className="mb-4"
        >
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeStyles(categoryType)}`}>
                {property.category?.name || 'Property'}
            </span>
        </motion.div>
    );
};

export default CategoryBadge;