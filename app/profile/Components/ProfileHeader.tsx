"use client";
import React from "react";

interface Props {
    currentUser: any;
    isEditing: boolean;
    editForm: any;
    setEditForm: React.Dispatch<React.SetStateAction<any>>;
    enterEditMode: () => void;
}

export default function ProfileHeader({
    currentUser,
    isEditing,
    editForm,
    setEditForm,
    enterEditMode,
}: Props) {
    return (
        <div className="relative bg-gradient-to-r from-green-600 via-green-600 to-green-700 px-8 py-16">
            <div className="absolute top-6 right-6 flex gap-3">
                <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentUser.role === "admin"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                >
                    {currentUser.role === "admin" ? "👑 Admin" : "👤 User"}
                </span>
                <button
                    onClick={enterEditMode}
                    disabled={isEditing}
                    className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm font-medium transition duration-200 backdrop-blur-sm disabled:opacity-50"
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
                    <img
                        src={
                            currentUser.image ||
                            "/image/businessman-character-avatar-isolated.png"
                        }
                        alt={currentUser.name}
                        className="w-32 h-32 rounded-full border-4 border-white shadow-2xl mx-auto mb-6 object-cover"
                    />
                    <div className="absolute bottom-6 right-6 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <h1 className="text-4xl font-bold text-white mb-3">
                    {isEditing ? (
                        <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) =>
                                setEditForm({ ...editForm, name: e.target.value })
                            }
                            className="bg-white/20 text-white rounded-lg px-3 py-2 text-center text-4xl font-bold backdrop-blur-sm w-full max-w-2xl"
                            placeholder="Enter your name"
                        />
                    ) : (
                        currentUser.name
                    )}
                </h1>
                <p className="text-green-100 text-xl font-light mb-2">
                    {currentUser.email}
                </p>
                {(currentUser.bio || isEditing) && (
                    <div className="text-green-200 text-lg max-w-2xl mx-auto">
                        {isEditing ? (
                            <textarea
                                value={editForm.bio}
                                onChange={(e) =>
                                    setEditForm({ ...editForm, bio: e.target.value })
                                }
                                className="bg-white/20 text-white rounded-lg px-3 py-2 text-center w-full backdrop-blur-sm resize-none"
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
