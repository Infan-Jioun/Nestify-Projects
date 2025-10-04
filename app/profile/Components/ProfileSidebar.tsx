"use client";
import React, { useState } from "react";

interface Props {
  currentUser: any;
  slug: string;
}

export default function ProfileSidebar({ currentUser, slug }: Props) {
  const [copied, setCopied] = useState(false);

  const copyProfileLink = () => {
    const profileUrl = `${window.location.origin}/profile/${slug}`;
    navigator.clipboard.writeText(profileUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareOnSocialMedia = (platform: string) => {
    const profileUrl = `${window.location.origin}/profile/${slug}`;
    const text = `Check out ${currentUser?.name}'s profile!`;
    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + profileUrl)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(text)}`,
    };
    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="space-y-6">
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
          className={`w-full mb-4 py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center ${
            copied ? "bg-green-600 text-white" : "bg-green-600 hover:bg-green-700 text-white"
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

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { platform: "whatsapp", color: "bg-[#25D366]", icon: "WhatsApp" },
            { platform: "telegram", color: "bg-[#0088cc]", icon: "Telegram" },
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
      </div>
    </div>
  );
}
