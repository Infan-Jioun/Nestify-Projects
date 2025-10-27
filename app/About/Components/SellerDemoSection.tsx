"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SellerDemoSection() {
    const [copiedField, setCopiedField] = useState<string | null>(null);

    const copyToClipboard = (text: string, fieldName: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldName);

        // Show success toast
        toast.success(`${fieldName} copied to clipboard!`, {
            duration: 2000,
            position: "top-center",

        });

        // Reset copied field after 2 seconds
        setTimeout(() => {
            setCopiedField(null);
        }, 2000);
    };

    const credentials = [
        {
            type: "Seller",
            email: "infanjiounrahman20606@gmail.com",
            password: "12345678",
            icon: (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            color: "bg-green-500"
        },
        {
            type: "Admin",
            email: "nestify@admin.com",
            password: "12345678",
            icon: (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            color: "bg-purple-500"
        }
    ];

    const features = [
        "Property Listings Management",
        "Add/Edit Property Details",
        "View Property Analytics",
        "Manage Buyer Inquiries",
        "Track Property Views",
        "User Management (Admin)",
        "Content Moderation (Admin)",
        "System Analytics (Admin)"
    ];

    return (
        <section className="py-12 bg-gradient-to-r from-green-50 to-blue-50 border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-black mb-3">Demo Access Credentials</h2>
                        <p className="text-gray-600">
                            Use these credentials to test different roles and features of the platform
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Seller Credentials */}
                        {credentials.map((cred, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-10 h-10 ${cred.color} rounded-lg flex items-center justify-center`}>
                                        {cred.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-black">{cred.type} Login</h3>
                                        <span className={`text-xs px-2 py-1 rounded-full ${cred.type === 'Seller' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                                            {cred.type} Role
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 block mb-1">Email</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={cred.email}
                                                readOnly
                                                className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 font-mono cursor-pointer"
                                                onClick={(e) => e.currentTarget.select()}
                                            />
                                            <button
                                                onClick={() => copyToClipboard(cred.email, `${cred.type} Email`)}
                                                className={`${cred.color} hover:opacity-90 text-white p-2 rounded-lg transition-all duration-200 ${copiedField === `${cred.type} Email` ? 'ring-2 ring-offset-2 ring-green-400' : ''
                                                    }`}
                                                title="Copy to clipboard"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-500 block mb-1">Password</label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="password"
                                                value={cred.password}
                                                readOnly
                                                className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 font-mono cursor-pointer"
                                                onClick={(e) => e.currentTarget.select()}
                                            />
                                            <button
                                                onClick={() => copyToClipboard(cred.password, `${cred.type} Password`)}
                                                className={`${cred.color} hover:opacity-90 text-white p-2 rounded-lg transition-all duration-200 ${copiedField === `${cred.type} Password` ? 'ring-2 ring-offset-2 ring-green-400' : ''
                                                    }`}
                                                title="Copy to clipboard"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Features Access */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-black">Available Features</h3>
                            </div>

                            <ul className="space-y-2 max-h-64 overflow-y-auto">
                                {features.map((feature, index) => (
                                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Role Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                            <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Seller Role
                            </h4>
                            <p className="text-green-700 text-sm">
                                Manage property listings, view analytics, handle buyer inquiries, and track property performance.
                            </p>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                            <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                </svg>
                                Admin Role
                            </h4>
                            <p className="text-purple-700 text-sm">
                                Full system access including user management, content moderation, and platform analytics.
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <a
                            href="/LoginPage"
                            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Login to Dashboard
                        </a>

                        <a
                            href="/Authentication"
                            className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            Create New Account
                        </a>
                    </div>

                    {/* Security Note */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            🔒 These are demo accounts. Please do not change passwords or use for personal purposes.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}