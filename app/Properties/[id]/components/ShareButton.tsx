"use client";

import { Button } from "@/components/ui/button";
import { Share2, Link as LinkIcon, Mail, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ShareModalButtonProps {
    url: string;
    title?: string;
}

const ShareModalButton: React.FC<ShareModalButtonProps> = ({ url, title = "Check this property" }) => {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    // Type-safe share function
    const handleShare = async () => {
        if (typeof navigator.share === "function") { // ✅ TypeScript safe
            try {
                await navigator.share({ title, url });
                setOpen(false);
            } catch (err) {
                console.error("Error sharing:", err);
            }
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Clipboard copy failed:", err);
        }
    };

    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`;
    const emailLink = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;

    return (
        <div className="relative inline-block">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(!open)}
            >
                <Button variant="outline" size="sm" className="flex items-center">
                    <Share2 size={18} className="mr-1" />
                    Share
                </Button>
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-lg p-4 w-48 z-50 border"
                    >
                        <div className="flex flex-col space-y-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="flex items-center justify-start gap-2"
                                onClick={copyToClipboard}
                            >
                                <LinkIcon size={16} /> {copied ? "Copied!" : "Copy Link"}
                            </Button>
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer text-sm"
                            >
                                <MessageCircle size={16} /> WhatsApp
                            </a>
                            <a
                                href={emailLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer text-sm"
                            >
                                <Mail size={16} /> Email
                            </a>
                            {typeof navigator.share === "function" && ( 
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex items-center justify-start gap-2"
                                    onClick={handleShare}
                                >
                                    <Share2 size={16} /> Native Share
                                </Button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ShareModalButton;
