import { motion } from "framer-motion";
import { FeatureIcon } from "../../utils/propertyUtils";
import FeatureIconCom from "./FeatureIconCom";


interface FeaturesGridProps {
    features: FeatureIcon[];
}

const FeaturesGrid = ({ features }: FeaturesGridProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-green-50 rounded-xl"
        >
            {features.map((feature, index) => (
                <FeatureIconCom
                    key={index}
                    icon={feature.icon}
                    label={feature.label}
                    value={feature.value}
                />
            ))}
        </motion.div>
    );
};

export default FeaturesGrid;