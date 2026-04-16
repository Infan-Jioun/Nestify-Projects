"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchPropertyById } from "@/app/features/Properties/propertySlice";
import { toggleBookmark } from "@/app/features/bookmark/bookmarkSlice";

import SkeletonLoader from "./SkeletonLoader";
import ErrorState from "./ErrorState";
import BackButton from "./BackButton";
import CategoryBadge from "./CategoryBadge";
import ImageGallery from "./ImageGallery";
import PropertyHeader from "./PropertyHeader";
import FeaturesGrid from "./FeaturesGrid";
import PropertyDetailsGrid from "./PropertyDetailsGrid";
import AmenitiesSection from "./AmenitiesSection";
import { getPropertyCategoryType, getFeatureIcons, getPropertyDetails } from "../../utils/propertyUtils";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nestify-projects.vercel.app";

export default function PropertyClient({ id }: { id: string }) {

    const dispatch = useDispatch<AppDispatch>();

    const { currentProperty: property, loading, error } =
        useSelector((state: RootState) => state.properties);

    const bookmarkedProperties = useSelector(
        (state: RootState) => state.bookmarks.bookmarkedProperties
    );

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const isBookmarked = useMemo(
        () =>
            bookmarkedProperties.some(
                (b) => b._id === property?._id
            ),
        [bookmarkedProperties, property?._id]
    );

    useEffect(() => {
        if (id) {
            dispatch(fetchPropertyById(id));
        }
    }, [dispatch, id]);

    const handleToggleBookmark = () => {
        if (property) dispatch(toggleBookmark(property));
    };

    const nextImage = () => {
        if (!property?.images) return;
        setCurrentImageIndex((p) =>
            p === property.images.length - 1 ? 0 : p + 1
        );
    };

    const prevImage = () => {
        if (!property?.images) return;
        setCurrentImageIndex((p) =>
            p === 0 ? property.images.length - 1 : p - 1
        );
    };

    const goToImage = (i: number) => setCurrentImageIndex(i);

    if (loading) return <SkeletonLoader />;
    if (error || !property) return <ErrorState error={error} />;

    const featureIcons = getFeatureIcons(property);
    const propertyDetails = getPropertyDetails(property);
    const categoryType = getPropertyCategoryType(property);

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">

            <BackButton />

            <CategoryBadge property={property} categoryType={categoryType} />

            <ImageGallery
                property={property}
                currentImageIndex={currentImageIndex}
                onNextImage={nextImage}
                onPrevImage={prevImage}
                onGoToImage={goToImage}
                categoryType={categoryType}
            />

            <PropertyHeader
                property={property}
                isBookmarked={isBookmarked}
                onToggleBookmark={handleToggleBookmark}
                baseUrl={baseUrl}
            />

            <FeaturesGrid features={featureIcons} />

            <PropertyDetailsGrid
                property={property}
                propertyDetails={propertyDetails}
                categoryType={categoryType}
            />

            <AmenitiesSection property={property} />
        </div>
    );
}