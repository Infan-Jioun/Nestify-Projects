"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    User,
    Mail,
    Calendar,
    Shield,
    Share2,
    Link as LinkIcon,
    MessageCircle,
    Award,
    Clock
} from "lucide-react";

type DisplayUser = {
    _id?: string;
    name?: string;
    email?: string;
    image?: string | null;
    slug?: string | null;
    bio?: string | null;
    error?: string;
};

export default function ProfilePage() {
    const params = useParams();
    const slug = params?.slug as string;

    const [user, setUser] = useState<DisplayUser | null>(null); 
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!slug) return;
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/users/${encodeURIComponent(slug)}`);
                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error("Error fetching user:", err);
                setUser({ error: "User not found" });
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [slug]);

    const copyProfileLink = () => {
        const profileUrl = `${window.location.origin}/profile/${slug}`;
        navigator.clipboard.writeText(profileUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareProfile = async () => {
        const profileUrl = `${window.location.origin}/profile/${slug}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${user?.name}'s Profile`,
                    text: `Check out ${user?.name}'s profile`,
                    url: profileUrl,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            copyProfileLink();
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center space-y-4"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full"
                ></motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-green-700 font-medium"
                >
                    Loading profile...
                </motion.p>
            </motion.div>
        </div>
    );

    if (!user || user.error) return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center p-8 bg-white rounded-2xl shadow-lg border border-green-100 max-w-md"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center"
                >
                    <User className="w-10 h-10 text-red-500" />
                </motion.div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">User Not Found</h2>
                <p className="text-gray-600 mb-4">{"The user profile you're looking for doesn't exist."}</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.history.back()}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                    Go Back
                </motion.button>
            </motion.div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto"
            >
                {/* Profile Card */}
                <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100 mb-6"
                >
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white relative">
                        <div className="absolute top-4 right-4 flex gap-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={shareProfile}
                                className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                                title="Share Profile"
                            >
                                <Share2 className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={copyProfileLink}
                                className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                                title="Copy Link"
                            >
                                <LinkIcon className="w-5 h-5" />
                            </motion.button>
                        </div>

                        {copied && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-16 right-4 bg-white text-green-600 px-3 py-1 rounded-full text-sm font-medium shadow-lg"
                            >
                                Link Copied!
                            </motion.div>
                        )}

                        <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-2">
                            {user.name}
                        </motion.h1>
                        <motion.p variants={itemVariants} className="text-green-100 text-lg">
                            Professional Profile
                        </motion.p>
                    </div>

                    <div className="p-6">
                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                            <motion.div variants={itemVariants} className="flex-shrink-0 relative">
                                {user.image ? (
                                    <motion.img
                                        whileHover={{ scale: 1.05 }}
                                        src={user.image}
                                        alt={user.name || "Profile"}
                                        className="w-40 h-40 rounded-full border-4 border-green-100 shadow-2xl object-cover"
                                    />
                                ) : (
                                    <div className="w-40 h-40 rounded-full border-4 border-green-100 bg-green-50 flex items-center justify-center shadow-2xl">
                                        <User className="w-20 h-20 text-green-400" />
                                    </div>
                                )}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg"
                                >
                                    <Shield className="w-5 h-5" />
                                </motion.div>
                            </motion.div>

                            <motion.div variants={containerVariants} className="flex-1 space-y-4">
                                <motion.div variants={itemVariants} className="bg-green-50 rounded-xl p-4 border border-green-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <User className="w-5 h-5 text-green-600" />
                                        <label className="text-sm font-medium text-green-700">Full Name</label>
                                    </div>
                                    <p className="text-lg font-semibold text-gray-800 ml-8">{user.name}</p>
                                </motion.div>

                                <motion.div variants={itemVariants} className="bg-green-50 rounded-xl p-4 border border-green-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Mail className="w-5 h-5 text-green-600" />
                                        <label className="text-sm font-medium text-green-700">Email Address</label>
                                    </div>
                                    <p className="text-lg text-gray-800 break-all ml-8">{user.email}</p>
                                </motion.div>

                                {user.bio && (
                                    <motion.div variants={itemVariants} className="bg-green-50 rounded-xl p-4 border border-green-100">
                                        <div className="flex items-center gap-3 mb-2">
                                            <MessageCircle className="w-5 h-5 text-green-600" />
                                            <label className="text-sm font-medium text-green-700">Bio</label>
                                        </div>
                                        <p className="text-gray-800 ml-8">{user.bio}</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
