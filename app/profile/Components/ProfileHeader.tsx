"use client";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "@/app/Types/user";
import { imageUpload } from "@/hooks/useImageUpload";
import { UserRole } from "@/app/Types/auth";

interface ProfileHeaderProps {
    currentUser: User;
    isEditing: boolean;
    editForm: {
        name: string;
        bio: string;
        image: string;
    };
    imagePreview: string | null;
    imageUploading: boolean;
    onEnterEditMode: () => void;
    onInputChange: (field: "name" | "image" | "bio" | "location" | "mobile" | "website", value: string) => void;
    onImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: () => void;
}

export function getRoleLabel(role?: UserRole | string): string {
    switch (role) {
        case UserRole.ADMIN:
            return "Admin";
        case UserRole.REAL_ESTATE_DEVELOPER:
            return "Real Estate Developer";
        default:
            return "User";
    }
}

export default function ProfileHeader({
    currentUser,
    isEditing,
    editForm,
    imagePreview,
    imageUploading,
    onEnterEditMode,
    onInputChange,
    onImageSelect,
    onRemoveImage,
}: ProfileHeaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const displayImage = imagePreview || currentUser.image || "/image/businessman-character-avatar-isolated.png";

    // Properly typed variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
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

    const imageVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 15
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                type: "spring" as const,
                stiffness: 400,
                damping: 10
            }
        }
    };

    const statusIndicatorVariants = {
        animate: {
            scale: [1, 1.2, 1],
            transition: {
                duration: 2,
                repeat: Infinity
            }
        }
    };

    return (
        <motion.div
            className="relative py-20 lg:py-32 px-4 sm:px-6 text-center bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Animated Background Elements */}
            <div className="absolute top-10 left-10 w-40 h-40 bg-green-200/40 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-10 right-10 w-52 h-52 bg-emerald-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-teal-200/20 rounded-full blur-3xl animate-pulse"></div>

            {/* Header Content */}
            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Role and Edit Button */}
                <motion.div
                    className="flex flex-col sm:flex-row justify-between items-center mb-8 lg:mb-12 gap-4"
                    variants={itemVariants}
                >
                    <motion.span
                        className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm border ${currentUser.role === "admin"
                            ? "bg-amber-100 text-amber-800 border-amber-200"
                            : "bg-green-100 text-green-800 border-green-200"
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="w-2 h-2 bg-current rounded-full mr-2"></span>
                        Role: {getRoleLabel(currentUser.role)}
                    </motion.span>

                    <motion.button
                        onClick={onEnterEditMode}
                        disabled={isEditing}
                        className="inline-flex items-center px-6 py-3 bg-white/80 hover:bg-white text-green-500 rounded-2xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border border-green-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                        Edit Profile
                    </motion.button>
                </motion.div>

                {/* Profile Image and Info */}
                <div className="flex flex-col items-center">
                    {/* Profile Image */}
                    <motion.div
                        className="relative mb-8"
                        variants={imageVariants}
                        whileHover="hover"
                    >
                        <motion.div className="relative">
                            <motion.img
                                src={displayImage}
                                alt={currentUser.name}
                                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full border-4 border-white shadow-2xl object-cover"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            />

                            <AnimatePresence>
                                {isEditing && (
                                    <motion.div
                                        className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full backdrop-blur-sm"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="flex gap-3">
                                            <motion.button
                                                onClick={triggerFileInput}
                                                disabled={imageUploading}
                                                className="p-3 bg-white/90 rounded-full hover:bg-white transition-all duration-200 disabled:opacity-50 shadow-lg"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                {imageUploading ? (
                                                    <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                                                ) : (
                                                    <svg
                                                        className="w-6 h-6 text-green-500"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                )}
                                            </motion.button>

                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Online Status Indicator */}
                        <motion.div
                            className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 border-2 border-white rounded-full shadow-lg"
                            variants={statusIndicatorVariants}
                            animate="animate"
                        />
                    </motion.div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={onImageSelect}
                        accept="image/*"
                        className="hidden"
                    />

                    {/* Name */}
                    <motion.div className="mb-4" variants={itemVariants}>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-800 mb-3">
                            {isEditing ? (
                                <motion.input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => onInputChange("name", e.target.value)}
                                    className="bg-white/80 text-green-800 rounded-2xl px-6 py-4 text-center w-full max-w-2xl font-bold backdrop-blur-sm border border-green-200 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
                                    placeholder="Enter your name"
                                    whileFocus={{ scale: 1.02 }}
                                />
                            ) : (
                                <motion.span
                                    className="inline-block"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {currentUser.name}
                                </motion.span>
                            )}
                        </h1>
                    </motion.div>

                    {/* Email */}
                    <motion.div className="mb-6" variants={itemVariants}>
                        <p className="inline-flex items-center px-4 py-2 bg-green-200/80 rounded-full text-green-900 text-lg font-medium backdrop-blur-sm border border-green-300">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {currentUser.email}
                        </p>
                    </motion.div>

                    {/* Bio */}
                    <motion.div className="w-full max-w-2xl" variants={itemVariants}>
                        <AnimatePresence mode="wait">
                            {(currentUser.bio || isEditing) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-green-500 text-lg"
                                >
                                    {isEditing ? (
                                        <motion.textarea
                                            value={editForm.bio}
                                            onChange={(e) => onInputChange("bio", e.target.value)}
                                            className="bg-white/80 text-green-800 rounded-2xl px-6 py-4 text-center w-full backdrop-blur-sm border border-green-200 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent resize-none"
                                            rows={3}
                                            placeholder="Enter your bio"
                                            whileFocus={{ scale: 1.02 }}
                                        />
                                    ) : (
                                        <motion.p
                                            className="italic text-green-500 leading-relaxed"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            {currentUser.bio}
                                        </motion.p>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}