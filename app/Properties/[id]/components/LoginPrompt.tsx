"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";

interface LoginPromptProps {
    property: {
        _id?: string | null; 
        title: string;
        address: string;
        price: number;
        currency: string;
        email?: string;
        images?: string[];
        status?: string;
        listingStatus?: string;
        contactNumber?: string;
    };
    onLoginRedirect: () => void;
    onClose: () => void;
}
const LoginPrompt: React.FC<LoginPromptProps> = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-6"
        >
            <div className="flex justify-center mb-3">
                <LockKeyhole className="h-10 w-10 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Login Required</h3>
            <p className="text-sm text-gray-600 mt-2">
                Please log in to schedule your visit.
            </p>
            <Link href="/LoginPage">
                <Button className="mt-4 bg-green-500 hover:bg-green-600 text-white">
                    Login
                </Button>
            </Link>
        </motion.div>
    );
};

export default LoginPrompt;
