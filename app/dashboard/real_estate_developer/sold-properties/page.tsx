"use client"
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { fetchPropertiesByEmail } from '@/app/features/Properties/propertySlice'
import { PropertyType, SessionUser } from '@/app/Types/properties'
import Link from 'next/link'
import {
    Home,
    ArrowLeft,
    DollarSign,
    CheckCircle,
    MapPin,
    Bed,
    Bath,
    Square,
    Image as ImageIcon
} from 'lucide-react'

export default function SoldPropertiesPage() {
    const { data: session, status } = useSession();
    const dispatch = useDispatch<AppDispatch>();
    const { properties, loading: propertiesLoading, error } = useSelector((state: RootState) => state.properties);

    const [soldProperties, setSoldProperties] = useState<PropertyType[]>([]);
    const [totalRevenue, setTotalRevenue] = useState(0);

    // Fetch developer's properties
    useEffect(() => {
        if (status === 'authenticated' && session?.user?.email) {
            const userEmail = session.user.email;
            dispatch(fetchPropertiesByEmail(userEmail));
        }
    }, [dispatch, status, session?.user?.email]);

    // Filter sold properties and calculate revenue
    useEffect(() => {
        if (properties && properties.length > 0) {
            const sold = properties.filter(prop => prop.status === 'Sold');
            setSoldProperties(sold);

            const revenue = sold.reduce((sum: number, prop: PropertyType) => sum + (prop.price || 0), 0);
            setTotalRevenue(revenue);
        } else {
            setSoldProperties([]);
            setTotalRevenue(0);
        }
    }, [properties]);

    if (status === 'loading' || propertiesLoading) {
        return <SoldPropertiesSkeleton />;
    }

    const sessionUser = session?.user as SessionUser;

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              

                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Sold Properties</h1>
                        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                            Overview of all your successfully sold properties
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Email: {session?.user?.email} • Role: {sessionUser?.role || 'Real Estate Developer'}
                        </p>
                    </div>

                    <div className="bg-green-500 text-white rounded-xl p-4 sm:p-6 min-w-[200px]">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-5 h-5" />
                            <span className="text-sm font-medium">Total Revenue</span>
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
                        <p className="text-green-100 text-xs sm:text-sm mt-1">
                            From {soldProperties.length} sold properties
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{soldProperties.length}</p>
                            <p className="text-sm text-gray-600">Properties Sold</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">
                                ${soldProperties.length > 0 ? Math.round(totalRevenue / soldProperties.length).toLocaleString() : 0}
                            </p>
                            <p className="text-sm text-gray-600">Average Sale Price</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Home className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">
                                {properties?.length || 0}
                            </p>
                            <p className="text-sm text-gray-600">Total Properties</p>
                        </div>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm sm:text-base">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {/* Sold Properties Grid */}
            {soldProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {soldProperties.map((property: PropertyType) => (
                        <SoldPropertyCard key={property._id} property={property} />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-12 text-center border border-gray-100">
                    <div className="text-4xl sm:text-6xl mb-4">🏠</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">No Sold Properties Yet</h3>
                    <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                        {"You haven't sold any properties yet. Start by marking your properties as sold."}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/dashboard/real_estate_developer/MyProperties"
                            className="bg-green-500 text-white px-6 sm:px-8 py-3 rounded-xl hover:bg-green-600 transition-colors font-semibold text-sm sm:text-base text-center"
                        >
                            Manage Properties
                        </Link>
                        <Link
                            href="/dashboard/real_estate_developer"
                            className="bg-gray-500 text-white px-6 sm:px-8 py-3 rounded-xl hover:bg-gray-600 transition-colors font-semibold text-sm sm:text-base text-center"
                        >
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

// Sold Property Card Component
function SoldPropertyCard({ property }: { property: PropertyType }) {
    const formatPrice = (price: number): string => {
        if (price >= 1000000) {
            return `$${(price / 1000000).toFixed(1)}M`;
        } else if (price >= 1000) {
            return `$${(price / 1000).toFixed(1)}K`;
        }
        return `$${price}`;
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-green-100 overflow-hidden group">
            {/* Property Image */}
            <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200 overflow-hidden">
                {property.images && property.images.length > 0 ? (
                    <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
                        <div className="text-center text-green-700">
                            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-60" />
                            <span className="text-green-600 text-sm font-medium">No Image Available</span>
                        </div>
                    </div>
                )}

                {/* Sold Badge */}
                <div className="absolute top-4 left-4">
                    <span className="bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg border border-green-600 flex items-center gap-1.5">
                        <CheckCircle className="w-3 h-3" />
                        Sold
                    </span>
                </div>

                {/* Price Tag */}
                <div className="absolute top-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-2xl border border-green-200">
                        <span className="text-xl font-bold text-green-700">
                            {formatPrice(property.price || 0)}
                        </span>
                        <span className="text-xs text-green-600 ml-1 font-medium">{property.currency}</span>
                    </div>
                </div>
            </div>

            {/* Property Details */}
            <div className="p-4 sm:p-6">
                {/* Title and Location */}
                <div className="mb-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight">
                        {property.title}
                    </h3>
                    <div className="flex items-center text-gray-700 text-sm">
                        <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
                        <span className="truncate">{property.address}</span>
                    </div>
                    {property.districtName && (
                        <p className="text-gray-600 text-sm mt-1 font-medium">{property.districtName}</p>
                    )}
                </div>

                {/* Property Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {property.bedrooms && (
                        <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-lg text-xs font-semibold border border-green-200">
                            <Bed className="w-3 h-3 mr-1.5" />
                            <span>{property.bedrooms} Bed</span>
                        </div>
                    )}
                    {property.bathrooms && (
                        <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-lg text-xs font-semibold border border-green-200">
                            <Bath className="w-3 h-3 mr-1.5" />
                            <span>{property.bathrooms} Bath</span>
                        </div>
                    )}
                    {property.propertySize && (
                        <div className="flex items-center bg-gray-100 text-gray-800 px-2 py-1 rounded-lg text-xs font-semibold border border-gray-200">
                            <Square className="w-3 h-3 mr-1.5" />
                            <span>{property.propertySize} sq ft</span>
                        </div>
                    )}
                </div>

                {/* Category */}
                {property.category && (
                    <div className="flex items-center justify-between text-sm text-gray-600 border-t pt-3">
                        <span>Category:</span>
                        <span className="font-medium text-gray-900">{property.category.name}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

// Skeleton Loading Component
function SoldPropertiesSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            {/* Header Skeleton */}
            <div className="mb-6 sm:mb-8">
                <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-48 sm:w-64 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-56 sm:w-96 animate-pulse"></div>
            </div>

            {/* Stats Summary Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                            <div>
                                <div className="h-6 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Properties Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-4 sm:p-6 space-y-4">
                            <div className="h-6 bg-gray-200 rounded-2xl"></div>
                            <div className="h-4 bg-gray-200 rounded-2xl w-3/4"></div>
                            <div className="flex gap-2">
                                <div className="h-6 bg-gray-200 rounded-2xl w-16"></div>
                                <div className="h-6 bg-gray-200 rounded-2xl w-16"></div>
                                <div className="h-6 bg-gray-200 rounded-2xl w-20"></div>
                            </div>
                            <div className="h-4 bg-gray-200 rounded-2xl w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}