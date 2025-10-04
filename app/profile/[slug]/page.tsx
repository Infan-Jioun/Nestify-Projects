"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchUserBySlug, updateUser } from "../../features/user/userAuthSlice";
import SkeletonLoader from "../Components/SkeletonLoader";
import UserNotFound from "../Components/UserNotFound";
import ProfileHeader from "../Components/ProfileHeader";
import ProfileTabs from "../Components/ProfileTabs";
import ProfileInfo from "../Components/ProfileInfo";
import ProfileSidebar from "../Components/ProfileSidebar";


export default function ProfilePage() {
  const { slug } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    bio: "",
    location: "",
    website: "",
  });

  useEffect(() => {
    if (slug) dispatch(fetchUserBySlug(slug as string));
  }, [slug, dispatch]);

  const enterEditMode = () => {
    setEditForm({
      name: currentUser?.name || "",
      bio: currentUser?.bio || "",
      location: currentUser?.location || "",
      website: currentUser?.website || "",
    });
    setIsEditing(true);
  };

  const cancelEdit = () => setIsEditing(false); 

  const saveProfile = async () => {
    if (!currentUser?._id) return;
    setSaveLoading(true);
    try {
      await dispatch(updateUser({ _id: currentUser._id, ...editForm })).unwrap();
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) return <SkeletonLoader />;
  if (!currentUser || error) return <UserNotFound error={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <ProfileHeader
          currentUser={currentUser}
          isEditing={isEditing}
          editForm={editForm}
          setEditForm={setEditForm}
          enterEditMode={enterEditMode}
        />
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ProfileInfo
              currentUser={currentUser}
              isEditing={isEditing}
              editForm={editForm}
              setEditForm={setEditForm}
              saveProfile={saveProfile}
              cancelEdit={cancelEdit}
              saveLoading={saveLoading}
            />
          </div>
          <ProfileSidebar currentUser={currentUser} slug={slug as string} />
        </div>
      </div>
    </div>
  );
}
