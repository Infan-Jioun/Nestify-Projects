"use client";
import React from "react";

interface ProfileTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    isEditing: boolean;
    onCopyProfileLink: () => void;
    onShareOnSocialMedia: (platform: string) => void;
    copied: boolean;
}

export default function ProfileTabs({
    activeTab,
    onTabChange,
    isEditing,
    onCopyProfileLink,
    onShareOnSocialMedia,
    copied,
}: ProfileTabsProps) {
    return (
        <>
            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 bg-white">
                <div className="px-8">
                    <nav className="flex space-x-8">
                        {["overview"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => onTabChange(tab)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition duration-200 ${activeTab === tab
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Share Profile Card - Only this part should be in the sidebar */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
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
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                    </svg>
                    Share Profile
                </h3>

                {/* Copy Link Button */}
                <button
                    onClick={onCopyProfileLink}
                    disabled={isEditing}
                    className={`w-full mb-4 py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center ${copied
                            ? "bg-green-600 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {copied ? (
                        <>
                            <svg
                                className="w-5 h-5 mr-2"
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
                            Copied!
                        </>
                    ) : (
                        <>
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                            Copy Profile Link
                        </>
                    )}
                </button>

                {/* Social Media Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {[
                        {
                            platform: "twitter",
                            color: "bg-[#1DA1F2]",
                            icon: "Twitter",
                        },
                        {
                            platform: "facebook",
                            color: "bg-[#1877F2]",
                            icon: "Facebook",
                        },
                        {
                            platform: "linkedin",
                            color: "bg-[#0A66C2]",
                            icon: "LinkedIn",
                        },
                        {
                            platform: "whatsapp",
                            color: "bg-[#25D366]",
                            icon: "WhatsApp",
                        },
                    ].map((social) => (
                        <button
                            key={social.platform}
                            onClick={() => onShareOnSocialMedia(social.platform)}
                            disabled={isEditing}
                            className={`flex items-center justify-center py-3 px-3 ${social.color} hover:opacity-90 text-white rounded-lg transition duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            {social.icon}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}