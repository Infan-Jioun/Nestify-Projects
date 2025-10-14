"use client";
import React from "react";
import { User } from "@/app/Types/user";
import SearchLocation from "./SearchLocation"; // Adjust path as needed

interface ProfileInfoProps {
    currentUser: User;
    isEditing: boolean;
    editForm: {
        name: string;
        bio: string;
        location: string;
        website: string;
        mobile: string;
    };
    saveLoading: boolean;
    imageUploading: boolean;
    onInputChange: (field: "name" | "image" | "bio" | "location" | "mobile" | "website", value: string) => void;
    onSaveProfile: () => void;
    onCancelEdit: () => void;
}

export default function ProfileInfo({
    currentUser,
    isEditing,
    editForm,
    saveLoading,
    imageUploading,
    onInputChange,
    onSaveProfile,
    onCancelEdit
}: ProfileInfoProps) {

    // Handle location change from SearchHomeLocation
    const handleLocationChange = (value: string) => {
        onInputChange("location", value);
    };

    return (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
                Profile Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Full Name
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) => onInputChange("name", e.target.value)}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                                placeholder="Enter your full name"
                            />
                        ) : (
                            <p className="text-lg font-semibold text-gray-900 mt-1">
                                {currentUser.name}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Email Address
                        </label>
                        <p className="text-lg font-semibold text-gray-900 mt-1 break-all">
                            {currentUser.email}
                        </p>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Mobile Number
                        </label>
                        {isEditing ? (
                            <input
                                type="tel"
                                value={editForm.mobile}
                                onChange={(e) => {
                                    console.log("Mobile input:", e.target.value);
                                    onInputChange("mobile", e.target.value);
                                }}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                                placeholder="Enter your mobile number"
                            />
                        ) : (
                            <p className="text-lg font-semibold text-gray-900 mt-1">
                                {currentUser.mobile || "Not specified"}
                            </p>
                        )}
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Location
                        </label>
                        {isEditing ? (
                            <div className="mt-1">
                                <SearchLocation
                                    value={editForm.location}
                                    onChange={handleLocationChange}
                                />
                            </div>
                        ) : (
                            <p className="text-lg font-semibold text-gray-900 mt-1">
                                {currentUser.location || "Not specified"}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Website
                        </label>
                        {isEditing ? (
                            <input
                                type="url"
                                value={editForm.website}
                                onChange={(e) => onInputChange("website", e.target.value)}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                                placeholder="https://example.com"
                            />
                        ) : (
                            <p className="text-lg font-semibold text-gray-900 mt-1">
                                {currentUser.website ? (
                                    <a
                                        href={currentUser.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-500 hover:text-green-500 transition duration-200 break-all"
                                    >
                                        {currentUser.website}
                                    </a>
                                ) : (
                                    "Not specified"
                                )}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Bio
                        </label>
                        {isEditing ? (
                            <textarea
                                value={editForm.bio}
                                onChange={(e) => onInputChange("bio", e.target.value)}
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 resize-none"
                                rows={3}
                                placeholder="Tell us about yourself..."
                            />
                        ) : (
                            <p className="text-lg font-semibold text-gray-900 mt-1">
                                {currentUser.bio || "No bio provided"}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Mode Actions */}
            {isEditing && (
                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                    <button
                        onClick={onSaveProfile}
                        disabled={saveLoading || imageUploading}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saveLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Saving...
                            </>
                        ) : (
                            <>
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
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                Save Changes
                            </>
                        )}
                    </button>
                    <button
                        onClick={onCancelEdit}
                        disabled={saveLoading || imageUploading}
                        className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}