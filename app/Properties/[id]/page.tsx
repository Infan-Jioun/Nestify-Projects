"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchPropertyById } from "@/app/features/Properties/propertySlice";
import { toggleBookmark } from "@/app/features/bookmark/bookmarkSlice";

import SkeletonLoader from "./components/SkeletonLoader";
import ErrorState from "./components/ErrorState";
import BackButton from "./components/BackButton";
import CategoryBadge from "./components/CategoryBadge";
import ImageGallery from "./components/ImageGallery";
import PropertyHeader from "./components/PropertyHeader";
import FeaturesGrid from "./components/FeaturesGrid";
import PropertyDetailsGrid from "./components/PropertyDetailsGrid";
import AmenitiesSection from "./components/AmenitiesSection";
import { getPropertyCategoryType, getFeatureIcons, getPropertyDetails } from "../utils/propertyUtils";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nestify-projects.vercel.app";

export default function PropertyDetailsPage() {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { currentProperty: property, loading, error } = useSelector((state: RootState) => state.properties);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const bookmarkedProperties = useSelector((state: RootState) => state.bookmarks.bookmarkedProperties);

    const isBookmarked = useMemo(() =>
        bookmarkedProperties.some(bookmarkedProperty => bookmarkedProperty._id === property?._id),
        [bookmarkedProperties, property?._id]
    );

    const handleToggleBookmark = () => {
        if (property) {
            dispatch(toggleBookmark(property));
        }
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchPropertyById(id as string));
        }
    }, [dispatch, id]);

    const nextImage = () => {
        if (property?.images && property.images.length > 0) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    const prevImage = () => {
        if (property?.images && property.images.length > 0) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
            );
        }
    };

    const goToImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    if (loading) {
        return <SkeletonLoader />;
    }

    if (error || !property) {
        return <ErrorState error={error} />;
    }

    const featureIcons = getFeatureIcons(property);
    const propertyDetails = getPropertyDetails(property);
    const categoryType = getPropertyCategoryType(property);

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8"
        >
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
        </motion.div>
    );
}