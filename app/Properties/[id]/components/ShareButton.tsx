"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface ShareButtonProps {
    url: string;
    title?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ url, title = "Check this property" }) => {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title, url });
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Clipboard write failed:", err);
            }
        }
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
        >
            <Button
                variant="outline"
                size="sm"
                className="flex items-center"
            >
                <Share2 size={18} className="mr-1" />
                {copied ? "Copied!" : "Share"}
            </Button>
        </motion.button>
    );
};

export default ShareButton;
    