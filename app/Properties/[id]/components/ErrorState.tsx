import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ErrorStateProps {
    error: string | null;
}

const ErrorState = ({ error }: ErrorStateProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto p-6 text-center flex flex-col items-center justify-center min-h-[50vh]"
        >
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-red-50 p-6 rounded-xl max-w-md"
            >
                <p className="text-red-600 font-medium mb-4">{error || "Property not found."}</p>
                <Link href="/Properties">
                    <Button className="mt-2">
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Properties
                    </Button>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default ErrorState;