"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { FaBookmark, FaTrash } from "react-icons/fa";
import { clearAllBookmarks } from "../features/bookmark/bookmarkSlice";
import PropertyCard from "../components/PropertyCard/PropertyCard";

export default function BookmarkPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { bookmarkedProperties } = useSelector((state: RootState) => state.bookmarks);

    const handleClearAll = () => {
        dispatch(clearAllBookmarks());
    };

    if (bookmarkedProperties.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-96 text-center">
                <FaBookmark className="text-6xl text-gray-300 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-600 mb-2">No bookmarks yet</h2>
                <p className="text-gray-500">Properties you bookmark will appear here.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Bookmarked Properties</h1>
                    <p className="text-gray-600 mt-2">
                        {bookmarkedProperties.length} propert{bookmarkedProperties.length === 1 ? 'y' : 'ies'} saved
                    </p>
                </div>

                <Button
                    variant="outline"
                    onClick={handleClearAll}
                    className="flex items-center gap-2"
                >
                    <FaTrash className="text-red-500" />
                    Clear All
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedProperties.map((property) => (
                    <PropertyCard
                        key={property._id}
                        property={property}
                    />
                ))}
            </div>
        </div>
    );
}