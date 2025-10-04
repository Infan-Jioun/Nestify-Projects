"use client";
import React from "react";

interface Props {
    currentUser: any;
    isEditing: boolean;
    editForm: any;
    setEditForm: React.Dispatch<React.SetStateAction<any>>;
    saveProfile: () => void;
    cancelEdit: () => void;
    saveLoading: boolean;
}

export default function ProfileInfo({
    currentUser,
    isEditing,
    editForm,
    setEditForm,
    saveProfile,
    cancelEdit,
    saveLoading,
}: Props) {
    return (
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg
                    className="w-5 h-5 mr-2 text-green-600"
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

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name + Email */}
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Full Name
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) =>
                                    setEditForm({ ...editForm, name: e.target.value })
                                }
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                </div>

                {/* Location + Website */}
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Location
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editForm.location}
                                onChange={(e) =>
                                    setEditForm({ ...editForm, location: e.target.value })
                                }
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
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
                                onChange={(e) =>
                                    setEditForm({ ...editForm, website: e.target.value })
                                }
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                        ) : (
                            <p className="text-lg font-semibold text-gray-900 mt-1">
                                {currentUser.website ? (
                                    <a
                                        href={currentUser.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-600 hover:text-green-800"
                                    >
                                        {currentUser.website}
                                    </a>
                                ) : (
                                    "Not specified"
                                )}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Actions */}
            {isEditing && (
                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                    <button
                        onClick={saveProfile}
                        disabled={saveLoading}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center disabled:opacity-50"
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
                        onClick={cancelEdit}
                        disabled={saveLoading}
                        className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-6 rounded-lg transition duration-200 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}
