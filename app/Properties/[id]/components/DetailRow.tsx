import { motion } from "framer-motion";

interface DetailRowProps {
    label: string;
    value: string;
}

const DetailRow = ({ label, value }: DetailRowProps) => {
    return (
        <motion.div
            whileHover={{ x: 5 }}
            className="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
        >
            <span className="text-gray-600">{label}</span>
            <span className="font-medium">{value}</span>
        </motion.div>
    );
};

export default DetailRow;