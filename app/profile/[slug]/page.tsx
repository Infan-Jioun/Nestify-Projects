"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBySlug, updateUser } from "../../features/user/userAuthSlice";
import { AppDispatch, RootState } from "@/lib/store";


type DisplayUser = {
    _id?: string;
    name?: string;
    email?: string;
    image?: string | null;
    slug?: string | null;
    role?: string;
    bio?: string;
    location?: string;
    website?: string;
    error?: string;
};

export default function ProfilePage() {
    const params = useParams();
    const slug = params?.slug as string;
    const dispatch = useDispatch<AppDispatch>();
    const { currentUser, loading, error } = useSelector((state: RootState) => state.user);

    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        bio: '',
        location: '',
        website: ''
    });
    const [saveLoading, setSaveLoading] = useState(false);

    // Copy profile link to clipboard
    const copyProfileLink = () => {
        const profileUrl = `${window.location.origin}/profile/${slug}`;
        navigator.clipboard.writeText(profileUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    // Share on social media
    const shareOnSocialMedia = (platform: string) => {
        const profileUrl = `${window.location.origin}/profile/${slug}`;
        const text = `Check out ${currentUser?.name}'s profile!`;

        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(profileUrl)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`,
            whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + profileUrl)}`,
            telegram: `https://t.me/share/url?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(text)}`,
            reddit: `https://reddit.com/submit?url=${encodeURIComponent(profileUrl)}&title=${encodeURIComponent(text)}`
        };

        if (shareUrls[platform as keyof typeof shareUrls]) {
            window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
        }
    };

    // Download profile as vCard
    const downloadVCard = () => {
        const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${currentUser?.name}
EMAIL:${currentUser?.email}
URL:${currentUser?.website || ''}
NOTE:${currentUser?.bio || ''}
END:VCARD`;

        const blob = new Blob([vCard], { type: 'text/vcard' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentUser?.slug || 'profile'}.vcf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Enter edit mode
    const enterEditMode = () => {
        setEditForm({
            name: currentUser?.name || '',
            bio: currentUser?.bio || '',
            location: currentUser?.location || '',
            website: currentUser?.website || ''
        });
        setIsEditing(true);
    };

    // Save profile changes
    const saveProfile = async () => {
        if (currentUser?.slug) {
            setSaveLoading(true);
            try {
                await dispatch(updateUser({
                    _id: currentUser._id,
                    ...editForm
                })).unwrap();
                setIsEditing(false);
            } catch (error) {
                console.error('Failed to update profile:', error);
            } finally {
                setSaveLoading(false);
            }
        }
    };

    // Cancel editing
    const cancelEdit = () => {
        setIsEditing(false);
        setEditForm({
            name: currentUser?.name || '',
            bio: currentUser?.bio || '',
            location: currentUser?.location || '',
            website: currentUser?.website || ''
        });
    };

    useEffect(() => {
        if (!slug) return;

        dispatch(fetchUserBySlug(slug));
    }, [slug, dispatch]);

    // Update edit form when currentUser changes
    useEffect(() => {
        if (currentUser && !isEditing) {
            setEditForm({
                name: currentUser.name || '',
                bio: currentUser.bio || '',
                location: currentUser.location || '',
                website: currentUser.website || ''
            });
        }
    }, [currentUser, isEditing]);

    // Enhanced Skeleton Loader
    const SkeletonLoader = () => (
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse">
            {/* Header Skeleton */}
            <div className="bg-gradient-to-r from-gray-300 to-gray-400 px-8 py-16">
                <div className="text-center">
                    <div className="w-32 h-32 mx-auto bg-gray-400 rounded-full mb-6"></div>
                    <div className="h-8 bg-gray-400 rounded w-1/3 mx-auto mb-4"></div>
                    <div className="h-6 bg-gray-400 rounded w-1/4 mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-400 rounded w-1/5 mx-auto"></div>
                </div>
            </div>

            {/* Tabs Skeleton */}
            <div className="border-b border-gray-200">
                <div className="px-8">
                    <div className="flex space-x-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-12 bg-gray-300 rounded w-24"></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Skeleton */}
            <div className="px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Skeleton */}
                    <div className="lg:col-span-2 space-y-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-6">
                                <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar Skeleton */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-xl p-6">
                            <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
                            <div className="grid grid-cols-2 gap-3">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-12 bg-gray-200 rounded-lg"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) return <SkeletonLoader />;

    if (!currentUser || error) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">User Not Found</h2>
                <p className="text-gray-600 mb-6">
                    {error || "The user you're looking for doesn't exist or may have been removed."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => window.history.back()}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition duration-200"
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Profile Header */}
                    <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 px-8 py-16">
                        <div className="absolute top-6 right-6 flex gap-3">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentUser.role === 'admin'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                                }`}>
                                {currentUser.role === 'admin' ? '👑 Admin' : '👤 User'}
                            </span>
                            <button
                                onClick={enterEditMode}
                                disabled={isEditing}
                                className="inline-flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm font-medium transition duration-200 backdrop-blur-sm disabled:opacity-50"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Profile
                            </button>
                        </div>

                        <div className="text-center">
                            <div className="relative inline-block">
                                <img
                                    src={currentUser.image || "/image/businessman-character-avatar-isolated.png"}
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
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        className="bg-white/20 text-white rounded-lg px-3 py-2 text-center text-4xl font-bold backdrop-blur-sm w-full max-w-2xl"
                                        placeholder="Enter your name"
                                    />
                                ) : (
                                    currentUser.name
                                )}
                            </h1>
                            <p className="text-blue-100 text-xl font-light mb-2">{currentUser.email}</p>
                            {(currentUser.bio || isEditing) && (
                                <div className="text-blue-200 text-lg max-w-2xl mx-auto">
                                    {isEditing ? (
                                        <textarea
                                            value={editForm.bio}
                                            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
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

                    {/* Navigation Tabs */}
                    <div className="border-b border-gray-200 bg-white">
                        <div className="px-8">
                            <nav className="flex space-x-8">
                                {['overview', 'activity', 'connections', 'settings'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition duration-200 ${activeTab === tab
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="px-8 py-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content Area */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Profile Information */}
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Profile Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Full Name</label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={editForm.name}
                                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                ) : (
                                                    <p className="text-lg font-semibold text-gray-900 mt-1">{currentUser.name}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email Address</label>
                                                <p className="text-lg font-semibold text-gray-900 mt-1 break-all">{currentUser.email}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Location</label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={editForm.location}
                                                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="Enter your location"
                                                    />
                                                ) : (
                                                    <p className="text-lg font-semibold text-gray-900 mt-1">
                                                        {currentUser.location || 'Not specified'}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Website</label>
                                                {isEditing ? (
                                                    <input
                                                        type="url"
                                                        value={editForm.website}
                                                        onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        placeholder="https://example.com"
                                                    />
                                                ) : (
                                                    <p className="text-lg font-semibold text-gray-900 mt-1">
                                                        {currentUser.website ? (
                                                            <a href={currentUser.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                                                {currentUser.website}
                                                            </a>
                                                        ) : 'Not specified'}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Edit Mode Actions */}
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
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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

                                {/* Additional Sections based on active tab */}
                                {activeTab === 'overview' && (
                                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-gray-700">Profile created</span>
                                                </div>
                                                <span className="text-sm text-gray-500">2 days ago</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar - Social & Actions */}
                            <div className="space-y-6">
                                {/* Share Profile Card */}
                                <div className="bg-white rounded-xl p-6 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                        </svg>
                                        Share Profile
                                    </h3>

                                    {/* Copy Link Button */}
                                    <button
                                        onClick={copyProfileLink}
                                        className={`w-full mb-4 py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center ${copied
                                            ? 'bg-green-600 text-white'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                            }`}
                                    >
                                        {copied ? (
                                            <>
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                                Copy Profile Link
                                            </>
                                        )}
                                    </button>

                                    {/* Social Media Grid */}
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        {[
                                            { platform: 'twitter', color: 'bg-[#1DA1F2]', icon: 'Twitter' },
                                            { platform: 'facebook', color: 'bg-[#1877F2]', icon: 'Facebook' },
                                            { platform: 'linkedin', color: 'bg-[#0A66C2]', icon: 'LinkedIn' },
                                            { platform: 'whatsapp', color: 'bg-[#25D366]', icon: 'WhatsApp' },
                                            { platform: 'telegram', color: 'bg-[#0088cc]', icon: 'Telegram' },
                                            { platform: 'reddit', color: 'bg-[#FF5700]', icon: 'Reddit' }
                                        ].map((social) => (
                                            <button
                                                key={social.platform}
                                                onClick={() => shareOnSocialMedia(social.platform)}
                                                className={`flex items-center justify-center py-3 px-3 ${social.color} hover:opacity-90 text-white rounded-lg transition duration-200 text-sm font-medium`}
                                            >
                                                {social.icon}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Download vCard */}
                                    <button
                                        onClick={downloadVCard}
                                        className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-200 flex items-center justify-center font-medium"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Download vCard
                                    </button>
                                </div>

                                {/* Quick Stats */}
                                <div className="bg-white rounded-xl p-6 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Stats</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600">0</div>
                                            <div className="text-xs text-gray-500">Connections</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-600">0</div>
                                            <div className="text-xs text-gray-500">Posts</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-purple-600">0</div>
                                            <div className="text-xs text-gray-500">Following</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-orange-600">0</div>
                                            <div className="text-xs text-gray-500">Followers</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Actions */}
                                <div className="bg-white rounded-xl p-6 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                                    <div className="space-y-3">
                                        <button className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Send Email
                                        </button>
                                        <button className="w-full flex items-center justify-center border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition duration-200">
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            Start Chat
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}