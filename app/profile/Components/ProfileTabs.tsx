"use client";
import React from "react";

interface Props {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function ProfileTabs({ activeTab, setActiveTab }: Props) {
    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="px-8">
                <nav className="flex space-x-8">
                    {["overview",].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition duration-200 ${activeTab === tab
                                ? "border-green-500 text-green-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
