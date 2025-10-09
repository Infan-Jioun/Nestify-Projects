"use client";
import React, { useRef, useState } from "react";
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
export default function ProfileHeader({ currentUser, isEditing, editForm, imagePreview, imageUploading, onEnterEditMode, onInputChange, onImageSelect, onRemoveImage, }: ProfileHeaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const displayImage = imagePreview || currentUser.image || "/image/businessman-character-avatar-isolated.png";

    return (
        <div className="relative py-32 px-6 text-center bg-gradient-to-br from-green-50 via-white to-green-100 overflow-hidden">
            <div className="absolute top-10 left-10 w-40 h-40 bg-green-300/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-52 h-52 bg-yellow-300/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-6 right-6 flex gap-3">
                <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentUser.role === "admin"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                        }`}
                >
                    <p>Role: {getRoleLabel(currentUser.role)}</p>

                </span>
                <button
                    onClick={onEnterEditMode}
                    disabled={isEditing}
                    className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-green-500 rounded-full text-sm font-medium transition duration-200 backdrop-blur-sm disabled:opacity-50"
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
                </button>
            </div>

            <div className="text-center">
                <div className="relative inline-block">
                    <div className="relative">
                        <img
                            src={displayImage}
                            alt={currentUser.name}
                            className="w-32 h-32 rounded-full border-4 border-white shadow-2xl mx-auto mb-6 object-cover"
                        />
                        {isEditing && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                <div className="flex gap-2">
                                    <button
                                        onClick={triggerFileInput}
                                        disabled={imageUploading}
                                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition duration-200 disabled:opacity-50"
                                    >
                                        {imageUploading ? (
                                            <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <svg
                                                className="w-5 h-5 text-green-700"
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
                                    </button>
                                    {(imagePreview || currentUser.image) && (
                                        <button
                                            onClick={onRemoveImage}
                                            className="p-2 bg-white rounded-full hover:bg-gray-100 transition duration-200"
                                        >
                                            <svg
                                                className="w-5 h-5 text-red-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="absolute bottom-6 right-6 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onImageSelect}
                    accept="image/*"
                    className="hidden"
                />

                <h1 className="text-4xl font-bold text-green-500 mb-3">
                    {isEditing ? (
                        <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) => onInputChange("name", e.target.value)}
                            className="bg-white/20 text-green-500 rounded-lg px-3 py-2 text-center text-3xl font-bold backdrop-blur-sm w-full max-w-2xl placeholder-blue-200"
                            placeholder="Enter your name"
                        />
                    ) : (
                        currentUser.name
                    )}
                </h1>
                <p className=" bg-green-300 rounded-full    text-green-900 text-xl font-light mb-2">
                    {currentUser.email}
                </p>
                {(currentUser.bio || isEditing) && (
                    <div className="text-blue-200 text-lg max-w-2xl mx-auto">
                        {isEditing ? (
                            <textarea
                                value={editForm.bio}
                                onChange={(e) => onInputChange("bio", e.target.value)}
                                className="bg-white/20 text-green-500 rounded-lg px-3 py-2 text-center w-full backdrop-blur-sm resize-none placeholder-blue-200"
                                rows={2}
                                placeholder="Enter your bio"
                            />
                        ) : (
                            <p>{currentUser.bio}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}