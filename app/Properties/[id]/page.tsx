"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "@/components/ui/button";
import Skeleton from "react-loading-skeleton";

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
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchPropertyById } from "@/app/features/Properties/propertySlice";

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

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto p-4 md:p-6">
                <Skeleton height={400} className="mb-6 rounded-xl" />
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div className="w-full md:w-2/3">
                        <Skeleton height={32} width="70%" className="mb-2" />
                        <Skeleton height={20} width="40%" className="mb-4" />
                    </div>
                    <Skeleton height={36} width={120} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} height={80} className="rounded-lg" />
                    ))}
                </div>
                <Skeleton count={4} height={16} className="mb-2" />
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center flex flex-col items-center justify-center min-h-[50vh]">
                <div className="bg-red-50 p-6 rounded-xl max-w-md">
                    <p className="text-red-600 font-medium mb-4">{error || "Property not found."}</p>
                    <Link href="/Properties">
                        <Button className="mt-2">
                            <ArrowLeft size={16} className="mr-2" />
                            Back to Properties
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8">
            {/* Back Button */}
            <div className="mb-6">
                <Link href="/properties">
                    <Button variant="outline" className="flex items-center">
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Properties
                    </Button>
                </Link>
            </div>

            {/* Image Gallery with Slider */}
            {property.images && property.images.length > 0 ? (
                <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg">
                    <div className="relative h-64 md:h-96 bg-gray-200">
                        <img
                            src={property.images[currentImageIndex]}
                            alt={property.title}
                            className="w-full h-full object-cover"
                        />

                        {/* Navigation Arrows */}
                        {property.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={24} className="text-gray-800" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={24} className="text-gray-800" />
                                </button>
                            </>
                        )}

                        {/* Image Counter */}
                        {property.images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                                {currentImageIndex + 1} / {property.images.length}
                            </div>
                        )}
                    </div>

                    {/* Thumbnail Strip */}
                    {property.images.length > 1 && (
                        <div className="flex overflow-x-auto py-3 px-4 bg-gray-100 space-x-2">
                            {property.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goToImage(idx)}
                                    className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 ${currentImageIndex === idx ? 'border-green-500' : 'border-transparent'}`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg">
                    <div className="relative h-64 md:h-96 bg-gray-200 flex items-center justify-center">
                        <div className="text-gray-500 text-center">
                            <div className="text-4xl mb-2">🏠</div>
                            <p>No Image Available</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
                <div className="mb-4 lg:mb-0 lg:pr-4 flex-1">
                    <div className="flex items-center mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${property.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-green-100 text-green-800'}`}>
                            {property.status}
                        </span>
                        <span className="ml-3 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                            {property.listingStatus}
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                    <div className="flex items-center text-gray-600">
                        <MapPin size={18} className="mr-1" />
                        <span>{property.geoCountryLocation}</span>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                <p className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
  {property.currency} {property.price?.toLocaleString() ?? '0'}
</p>

                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsFavorite(!isFavorite)}
                            className={`flex items-center ${isFavorite ? 'text-red-500 border-red-200 bg-red-50' : ''}`}
                        >
                            <Heart size={18} className={`mr-1 ${isFavorite ? 'fill-current' : ''}`} />
                            {isFavorite ? 'Saved' : 'Save'}
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center">
                            <Share2 size={18} className="mr-1" />
                            Share
                        </Button>
                    </div>
                </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-green-50 rounded-xl">
                <FeatureIcon icon={<Bed size={24} />} label="Bedrooms" value={property.bedrooms} />
                <FeatureIcon icon={<Bath size={24} />} label="Bathrooms" value={property.bathrooms} />
                <FeatureIcon icon={<Ruler size={24} />} label="Area" value={`${property.propertySize} sqft`} />
                <FeatureIcon icon={<MapPin size={24} />} label="Floor" value={property.floor} />
            </div>

            {/* Property Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Property Details</h2>
                    <div className="space-y-4">
                        <DetailRow label="Drawing Room" value={property.drawingRoom} />
                        <DetailRow label="Kitchen" value={property.kitchen} />
                        <DetailRow label="Furnishing" value={property.furnishing} />
                        <DetailRow label="Property Size" value={`${property.propertySize} sqft`} />
                        <DetailRow label="Status" value={property.status} />
                        <DetailRow label="Listing Status" value={property.listingStatus} />
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Contact Information</h2>
                    <div className="space-y-4">
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <Phone size={20} className="text-green-500 mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">{property.contactNumber || "N/A"}</p>
                            </div>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <Mail size={20} className="text-green-500 mr-3" />
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{property.email || "N/A"}</p>
                            </div>
                        </div>
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5">
                            Contact Agent
                        </Button>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">{property.address}</p>
            </div>

            {/* Features */}
            {property.propertyFacilities && property.propertyFacilities.length > 0 ? (
                <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
                    <h2 className="text-xl font-semibold mb-4">Features & Amenities</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {property.propertyFacilities.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                <span className="text-gray-700">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}

            {/* Videos */}
            {property.videos && property.videos.length > 0 ? (
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="text-xl font-semibold mb-4">Property Videos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {property.videos.map((video, idx) => (
                            <div key={idx} className="rounded-lg overflow-hidden shadow-md">
                                <video controls className="w-full h-64 object-cover">
                                    <source src={video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

// Helper Components
function FeatureIcon({ icon, label, value }: { icon: React.ReactNode, label: string, value? : string | null | number }) {
    return (
        <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm">
            <div className="text-green-600 mb-2">{icon}</div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-semibold">{value || "N/A"}</p>
        </div>
    );
}

function DetailRow({ label, value }: { label: string, value: string | number | null | undefined }) {
    return (
        <div className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
            <span className="text-gray-600">{label}</span>
            <span className="font-medium">{value || "N/A"}</span>
        </div>
    );
}