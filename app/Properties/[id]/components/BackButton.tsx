import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
        >
            <Link href="/Properties">
                <Button variant="outline" className="flex items-center">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Properties
                </Button>
            </Link>
        </motion.div>
    );
};

export default BackButton;