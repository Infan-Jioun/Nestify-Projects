"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";

import {
    ChevronLeft,
    ChevronRight,
    MapPin,
    Bed,
    Bath,
    Ruler,
    Heart,
    Share2,
    Phone,
    Mail,
    ArrowLeft,
    TreePine,
    Car,
    Layers,
    Home
} from "lucide-react";
import Link from "next/link";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchPropertyById } from "@/app/features/Properties/propertySlice";
import { PropertyType } from "@/app/Types/properties";
import ShareButton from "./components/ShareButton";



// Skeleton Loader Component
const SkeletonLoader = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-6xl mx-auto p-4 md:p-6 space-y-6"
        >
            {/* Back Button Skeleton */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="h-10 w-32 bg-gray-200 rounded-lg"
            />

            {/* Image Gallery Skeleton */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative h-64 md:h-96 bg-gray-200 rounded-xl overflow-hidden"
            />

            {/* Thumbnails Skeleton */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex gap-2 overflow-hidden"
            >
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-20 h-16 bg-gray-200 rounded-md" />
                ))}
            </motion.div>

            {/* Header Section Skeleton */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
            >
                <div className="h-6 w-48 bg-gray-200 rounded" />
                <div className="h-8 w-3/4 bg-gray-200 rounded" />
                <div className="h-5 w-56 bg-gray-200 rounded" />
            </motion.div>

            {/* Key Features Skeleton */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-100 p-4 rounded-xl space-y-2">
                        <div className="h-6 w-6 bg-gray-200 rounded-full mx-auto" />
                        <div className="h-4 w-16 bg-gray-200 rounded mx-auto" />
                        <div className="h-5 w-12 bg-gray-200 rounded mx-auto" />
                    </div>
                ))}
            </motion.div>

            {/* Content Grid Skeleton */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="bg-gray-100 p-6 rounded-xl space-y-4">
                        <div className="h-6 w-40 bg-gray-200 rounded" />
                        {[...Array(5)].map((_, j) => (
                            <div key={j} className="flex justify-between">
                                <div className="h-4 w-24 bg-gray-200 rounded" />
                                <div className="h-4 w-16 bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>
        </motion.div>
    );
};

// Helper function to determine property category type
const getPropertyCategoryType = (property: PropertyType): string => {
    if (!property.category) return 'residential';

    const categoryName = property.category.name.toLowerCase();

    if (categoryName.includes('land') || categoryName.includes('plot')) {
        return 'land';
    } else if (categoryName.includes('commercial')) {
        return 'commercial';
    } else {
        return 'residential';
    }
};

// Custom feature icons based on category
const getFeatureIcons = (property: PropertyType) => {
    const categoryType = getPropertyCategoryType(property);

    if (categoryType === 'land') {
        return [
            { icon: <Ruler size={24} />, label: "Land Area", value: `${property.landArea || property.propertySize} sqft` },
            { icon: <Layers size={24} />, label: "Plot Number", value: property.plotNumber },
            { icon: <TreePine size={24} />, label: "Land Type", value: property.landType },
            { icon: <MapPin size={24} />, label: "Zone", value: property.geoCountryLocation }
        ];
    } else if (categoryType === 'commercial') {
        return [
            { icon: <Ruler size={24} />, label: "Area", value: `${property.propertySize} sqft` },
            { icon: <Home size={24} />, label: "Floor", value: property.floor },
            { icon: <Car size={24} />, label: "Parking", value: property.parkingSpaces },
            { icon: <Layers size={24} />, label: "Sections", value: property.roomsSections }
        ];
    } else {

        return [
            { icon: <Bed size={24} />, label: "Bedrooms", value: property.bedrooms },
            { icon: <Bath size={24} />, label: "Bathrooms", value: property.bathrooms },
            { icon: <Ruler size={24} />, label: "Area", value: `${property.propertySize} sqft` },
            { icon: <Home size={24} />, label: "Floor", value: property.floor }
        ];
    }
};

// Custom property details based on category
const getPropertyDetails = (property: PropertyType) => {
    const categoryType = getPropertyCategoryType(property);

    const baseDetails = [
        { label: "Property Size", value: `${property.propertySize} sqft` },
        { label: "Status", value: property.status },
        { label: "Listing Status", value: property.listingStatus }
    ];

    if (categoryType === 'land') {
        return [
            { label: "Land Area", value: `${property.landArea || property.propertySize} sqft` },
            { label: "Plot Number", value: property.plotNumber },
            { label: "Land Type", value: property.landType },
            ...baseDetails
        ];
    } else if (categoryType === 'commercial') {
        return [
            { label: "Floor Area", value: `${property.floorArea || property.propertySize} sqft` },
            { label: "Parking Spaces", value: property.parkingSpaces },
            { label: "Sections", value: property.roomsSections },
            { label: "Furnishing", value: property.furnishing },
            ...baseDetails
        ];
    } else {
        // Residential
        return [
            { label: "Bedrooms", value: property.bedrooms },
            { label: "Bathrooms", value: property.bathrooms },
            { label: "Drawing Room", value: property.drawingRoom },
            { label: "Kitchen", value: property.kitchen },
            { label: "Furnishing", value: property.furnishing },
            ...baseDetails
        ];
    }
};

export default function PropertyDetailsPage() {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { currentProperty: property, loading, error } = useSelector((state: RootState) => state.properties);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchPropertyById(id as string));
        }
    }, [dispatch, id]);

    // Image slider functions
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

    // Animation variants
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

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    if (loading) {
        return <SkeletonLoader />;
    }

    if (error || !property) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-4xl mx-auto p-6 text-center flex flex-col items-center justify-center min-h-[50vh]"
            >
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="bg-red-50 p-6 rounded-xl max-w-md"
                >
                    <p className="text-red-600 font-medium mb-4">{error || "Property not found."}</p>
                    <Link href="/Properties">
                        <Button className="mt-2">
                            <ArrowLeft size={16} className="mr-2" />
                            Back to Properties
                        </Button>
                    </Link>
                </motion.div>
            </motion.div>
        );
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
            {/* Back Button */}
            <motion.div variants={itemVariants} className="mb-6">
                <Link href="/Properties">
                    <Button variant="outline" className="flex items-center">
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Properties
                    </Button>
                </Link>
            </motion.div>

            {/* Category Badge */}
            <motion.div variants={itemVariants} className="mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryType === 'land' ? 'bg-yellow-100 text-yellow-800' :
                    categoryType === 'commercial' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                    }`}>
                    {property.category?.name || 'Property'}
                </span>
            </motion.div>

            {/* Image Gallery with Slider */}
            <motion.div variants={itemVariants} className="mb-8">
                {property.images && property.images.length > 0 ? (
                    <div className="relative rounded-xl overflow-hidden shadow-lg">
                        <div className="relative h-64 md:h-96 bg-gray-200">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImageIndex}
                                    src={property.images[currentImageIndex]}
                                    alt={property.title}
                                    className="w-full h-full object-cover"
                                    variants={imageVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                />
                            </AnimatePresence>

                            {/* Navigation Arrows */}
                            {property.images.length > 1 && (
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft size={24} className="text-gray-800" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight size={24} className="text-gray-800" />
                                    </motion.button>
                                </>
                            )}

                            {/* Image Counter */}
                            {property.images.length > 1 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm"
                                >
                                    {currentImageIndex + 1} / {property.images.length}
                                </motion.div>
                            )}
                        </div>

                        {/* Thumbnail Strip */}
                        {property.images.length > 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex overflow-x-auto py-3 px-4 bg-gray-100 space-x-2"
                            >
                                {property.images.map((img, idx) => (
                                    <motion.button
                                        key={idx}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => goToImage(idx)}
                                        className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 ${currentImageIndex === idx ? 'border-green-500' : 'border-transparent'}`}
                                    >
                                        <img
                                            src={img}
                                            alt={`Thumbnail ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </div>
                ) : (
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative rounded-xl overflow-hidden shadow-lg"
                    >
                        <div className="relative h-64 md:h-96 bg-gray-200 flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-gray-500 text-center"
                            >
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-4xl mb-2"
                                >
                                    {categoryType === 'land' ? '🌳' : categoryType === 'commercial' ? '🏢' : '🏠'}
                                </motion.div>
                                <p>No Image Available</p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Header Section */}
            <motion.div
                variants={itemVariants}
                className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6"
            >
                <div className="mb-4 lg:mb-0 lg:pr-4 flex-1">
                    <div className="flex items-center mb-2">
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${property.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                        >
                            {property.status}
                        </motion.span>
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="ml-3 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                        >
                            {property.listingStatus}
                        </motion.span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                    <div className="flex items-center text-gray-600">
                        <MapPin size={18} className="mr-1" />
                        <span>{property.address},{property.geoCountryLocation}</span>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <motion.p
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="text-xl md:text-2xl font-semibold text-green-500 mb-2"
                    >
                        {property.currency} {property.price?.toLocaleString() ?? '0'}
                    </motion.p>
                    <div className="flex space-x-2">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsFavorite(!isFavorite)}
                                className={`flex items-center ${isFavorite ? 'text-red-500 border-red-200 bg-red-50' : ''}`}
                            >
                                <Heart
                                    size={18}
                                    className={`mr-1 ${isFavorite ? 'fill-current' : ''}`}
                                />
                                {isFavorite ? 'Saved' : 'Save'}
                            </Button>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ShareButton url={`${process.env.NEXT_PUBLIC_BASE_URL}/properties/${property._id}`} />
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Key Features - Dynamic based on category */}
            <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-green-50 rounded-xl"
            >
                {featureIcons.map((feature, index) => (
                    <FeatureIcon
                        key={index}
                        icon={feature.icon}
                        label={feature.label}
                        value={feature.value}
                    />
                ))}
            </motion.div>

            {/* Property Details Grid */}
            <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-xl shadow-sm border"
                >
                    <h2 className="text-xl font-semibold mb-4 pb-2 border-b">
                        {categoryType === 'land' ? 'Land Details' :
                            categoryType === 'commercial' ? 'Commercial Details' : 'Property Details'}
                    </h2>
                    <div className="space-y-4">
                        {propertyDetails.map((detail, index) => (
                            <DetailRow
                                key={index}
                                label={detail.label}
                                value={detail.value}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Contact Information */}
                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-xl shadow-sm border"
                >
                    <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Contact Information</h2>
                    <div className="space-y-4">
                        <motion.div
                            whileHover={{ x: 5 }}
                            className="flex items-center p-3 bg-gray-50 rounded-lg"
                        >
                            <Phone size={20} className="text-green-500 mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">{property.contactNumber || "N/A"}</p>
                            </div>
                        </motion.div>
                        <motion.div
                            whileHover={{ x: 5 }}
                            className="flex items-center p-3 bg-gray-50 rounded-lg"
                        >
                            <Mail size={20} className="text-green-500 mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{property.email || "N/A"}</p>
                            </div>
                        </motion.div>

                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button className="w-[250px] mx-auto rounded-full mt-10 bg-green-500 hover:bg-green-700 text-white py-2.5">
                            Book    <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryType === 'land' ? 'bg-yellow-100 text-yellow-800' :
                                categoryType === 'commercial' ? 'bg-blue-100 text-blue-800' :
                                    'bg-green-100 text-green-800'
                                }`}>
                                {property.category?.name || 'Property'}
                            </span>
                        </Button>
                    </motion.button>
                </motion.div>

            </motion.div>

            {/* Features */}
            {property.propertyFacilities && property.propertyFacilities.length > 0 ? (
                <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    className="bg-white p-6 rounded-xl shadow-sm border mb-8"
                >
                    <h2 className="text-xl font-semibold mb-4">Features & Amenities</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ">
                        {property.propertyFacilities.map((feature, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-4"
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.5 }}
                                    className="w-2 h-2 bg-green-500 rounded-full mr-3"
                                />
                                <span className="text-gray-700">{feature}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            ) : null}


        </motion.div>

    );
}

// Helper Components with animations
function FeatureIcon({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string | null | number }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm"
        >
            <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="text-green-600 mb-2"
            >
                {icon}
            </motion.div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-semibold text-center">{value || "N/A"}</p>
        </motion.div>
    );
}

function DetailRow({ label, value }: { label: string, value: string | number | null | undefined }) {
    return (
        <motion.div
            whileHover={{ x: 5 }}
            className="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
        >
            <span className="text-gray-600">{label}</span>
            <span className="font-medium">{value || "N/A"}</span>
        </motion.div>
    );
}