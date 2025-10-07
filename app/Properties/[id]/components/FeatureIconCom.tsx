import { motion } from "framer-motion";

interface FeatureIconProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

const FeatureIconCom = ({ icon, label, value }: FeatureIconProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm"
        >
            <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="text-green-600 mb-2"
            >
                {icon}
            </motion.div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-semibold text-center">{value}</p>
        </motion.div>
    );
};

export default FeatureIconCom;