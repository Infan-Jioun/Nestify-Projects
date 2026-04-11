"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { fetchUserBySlug, updateUser } from "../../features/user/userAuthSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { imageUpload } from "@/hooks/useImageUpload";
import SkeletonLoader from "../Components/SkeletonLoader";
import UserNotFound from "../Components/UserNotFound";
import ProfileHeader from "../Components/ProfileHeader";
import ProfileTabs from "../Components/ProfileTabs";
import ProfileInfo from "../Components/ProfileInfo";

interface UpdateUserData {
    _id: string;
    name?: string;
    bio?: string | null;
    location?: string | null;
    website?: string | null;
    mobile?: string | null;
    image?: string | null;
}

export default function ProfilePage() {
    const params = useParams();
    const slug = params?.slug as string;
    const dispatch = useDispatch<AppDispatch>();
    const { data: session } = useSession();
    const { currentUser, loading, error } = useSelector(
        (state: RootState) => state.user
    );

    // ✅ নিজের profile কিনা check করো
    const isOwnProfile =
        !!session &&
        (session.user?.id === currentUser?._id ||
            session.user?.email === currentUser?.email);

    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: "",
        bio: "",
        location: "",
        website: "",
        mobile: "",
        image: "",
    });
    const [saveLoading, setSaveLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageUploading, setImageUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Copy profile link
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
            whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + profileUrl)}`,
        };

        if (shareUrls[platform as keyof typeof shareUrls]) {
            window.open(shareUrls[platform as keyof typeof shareUrls], "_blank", "width=600,height=400");
        }
    };

    // Handle image selection
    const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isOwnProfile) return;
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Image size should be less than 5MB");
            return;
        }

        setImageUploading(true);
        try {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            const imageUrl = await imageUpload(file);
            setEditForm((prev) => ({ ...prev, image: imageUrl }));
        } catch (error) {
            console.error("Failed to upload image:", error);
            alert("Failed to upload image. Please try again.");
            setImagePreview(null);
        } finally {
            setImageUploading(false);
        }
    };

    // Remove image
    const removeImage = () => {
        if (!isOwnProfile) return;
        setImagePreview(null);
        setEditForm((prev) => ({ ...prev, image: "" }));
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // Enter edit mode - শুধু নিজের profile এ
    const enterEditMode = () => {
        if (!currentUser || !isOwnProfile) return;
        setEditForm({
            name: currentUser.name || "",
            bio: currentUser.bio || "",
            location: currentUser.location || "",
            website: currentUser.website || "",
            mobile: currentUser.mobile || "",
            image: currentUser.image || "",
        });
        setImagePreview(currentUser.image || null);
        setIsEditing(true);
    };

    // Handle form input changes
    const handleInputChange = (field: keyof typeof editForm, value: string) => {
        if (!isOwnProfile) return;
        setEditForm((prev) => ({ ...prev, [field]: value }));
    };

    // Save profile
    const saveProfile = async () => {
        if (!currentUser?._id || !isOwnProfile) return;

        setSaveLoading(true);
        try {
            const updateData: UpdateUserData = { _id: currentUser._id };

            if (editForm.name.trim() && editForm.name !== currentUser.name) {
                updateData.name = editForm.name.trim();
            }
            if (editForm.bio !== currentUser.bio) updateData.bio = editForm.bio.trim();
            if (editForm.location !== currentUser.location) updateData.location = editForm.location.trim();
            if (editForm.website !== currentUser.website) updateData.website = editForm.website.trim();
            if (editForm.mobile.trim() !== currentUser.mobile) {
                updateData.mobile = editForm.mobile.trim() || "";
            }
            if (editForm.image && editForm.image !== currentUser.image) {
                updateData.image = editForm.image;
            } else if (!editForm.image && currentUser.image) {
                updateData.image = "";
            }

            if (Object.keys(updateData).length > 1) {
                await dispatch(updateUser(updateData)).unwrap();
                setIsEditing(false);
                if (imagePreview && imagePreview !== currentUser.image) {
                    URL.revokeObjectURL(imagePreview);
                }
            } else {
                setIsEditing(false);
                alert("No changes detected.");
            }
        } catch (error) {
            console.error("Failed to update profile:", error);
            alert("Failed to update profile. Please try again.");
        } finally {
            setSaveLoading(false);
        }
    };

    // Cancel editing
    const cancelEdit = () => {
        setIsEditing(false);
        if (!currentUser) return;
        setEditForm({
            name: currentUser.name || "",
            bio: currentUser.bio || "",
            location: currentUser.location || "",
            website: currentUser.website || "",
            mobile: currentUser.mobile || "",
            image: currentUser.image || "",
        });
        setImagePreview(currentUser.image || null);
    };

    // Fetch user by slug
    useEffect(() => {
        if (!slug) return;
        dispatch(fetchUserBySlug(slug));
    }, [slug, dispatch]);

    // Update edit form when currentUser changes
    useEffect(() => {
        if (currentUser && !isEditing) {
            setEditForm({
                name: currentUser.name || "",
                bio: currentUser.bio || "",
                location: currentUser.location || "",
                website: currentUser.website || "",
                mobile: currentUser.mobile || "",
                image: currentUser.image || "",
            });
            setImagePreview(currentUser.image || null);
        }
    }, [currentUser, isEditing]);

    // Clean up preview URLs
    useEffect(() => {
        return () => {
            if (imagePreview && currentUser?.image !== imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview, currentUser?.image]);

    if (loading) return <SkeletonLoader />;
    if (!currentUser || error) return <UserNotFound error={error || undefined} />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

                    {/* Profile Header */}
                    <ProfileHeader
                        currentUser={currentUser}
                        isEditing={isOwnProfile ? isEditing : false}
                        isOwnProfile={isOwnProfile}
                        editForm={editForm}
                        imagePreview={imagePreview}
                        imageUploading={imageUploading}
                        onEnterEditMode={enterEditMode}
                        onInputChange={handleInputChange}
                        onImageSelect={handleImageSelect}
                        onRemoveImage={removeImage}
                    />

                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200 bg-white">
                        <div className="px-8">
                            <nav className="flex space-x-8">
                                {["overview"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition duration-200 ${activeTab === tab
                                            ? "border-green-500 text-green-500"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
                            <div className="lg:col-span-2 space-y-8">
                                <ProfileInfo
                                    currentUser={currentUser}
                                    isEditing={isOwnProfile ? isEditing : false}
                                    isOwnProfile={isOwnProfile}
                                    editForm={editForm}
                                    saveLoading={saveLoading}
                                    imageUploading={imageUploading}
                                    onInputChange={handleInputChange}
                                    onSaveProfile={saveProfile}
                                    onCancelEdit={cancelEdit}
                                />
                            </div>
                            <div className="space-y-6">
                                <ProfileTabs
                                    activeTab={activeTab}
                                    onTabChange={setActiveTab}
                                    isEditing={isEditing}
                                    onCopyProfileLink={copyProfileLink}
                                    onShareOnSocialMedia={shareOnSocialMedia}
                                    copied={copied}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}