"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { User } from '@/app/Types/user';
import { Building2, Mail, Phone, MapPin, Globe, Calendar, Home, DollarSign, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchDeveloperProfile } from '@/app/features/developer/developerSlice';
import PropertyCard from '@/app/components/PropertyCard/PropertyCard';
import { DeveloperBookingsSection } from '../Components/DeveloperBookingsSection';

export default function DeveloperProfilePage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { developer, properties, statistics, loading, error } = useAppSelector((state) => state.developer);

  const developerId = params.id as string;
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (developerId) {
      dispatch(fetchDeveloperProfile(developerId));
    }
  }, [developerId, dispatch, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header Skeleton */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Skeleton className="w-32 h-32 rounded-full" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Properties Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-80 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">{error}</div>
          <button
            onClick={handleRetry}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No Developer Found
  if (!developer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Developer Not Found</h1>
          <p className="text-gray-600">{"The developer you're looking for doesn't exist"}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Developer Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src={developer.image || "/api/placeholder/150/150"}
                alt={developer.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-green-100"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{developer.name}</h1>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  Real Estate Developer
                </span>
              </div>

              {developer.bio && (
                <p className="text-gray-600 text-lg mb-4">{developer.bio}</p>
              )}

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                {developer.email && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4 text-green-600" />
                    <span className="truncate">{developer.email}</span>
                  </div>
                )}

                {developer.mobile && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span>{developer.mobile}</span>
                  </div>
                )}

                {developer.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="truncate">{developer.location}</span>
                  </div>
                )}

                {developer.website && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe className="w-4 h-4 text-green-600" />
                    <span className="truncate">{developer.website}</span>
                  </div>
                )}
              </div>

              {/* Statistics */}
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-gray-900">
                    {statistics.total} Properties
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">
                    {statistics.available} Available
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">
                    {statistics.sold} Sold
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  <span className="text-sm text-gray-600">
                    {statistics.rented} Rented
                  </span>
                </div>

                {developer.createdAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      Since {new Date(developer.createdAt).getFullYear()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Properties Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Properties ({properties.length})
            </h2>

            <div className="flex items-center gap-4 text-sm">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                {statistics.available} Available
              </span>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">
                {statistics.sold} Sold
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {statistics.rented} Rented
              </span>
            </div>
          </div>

          {properties.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Properties Found
              </h3>
              <p className="text-gray-600">
                {developer.name} {"hasn't listed any properties yet."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  showDeveloperInfo={false}
                />
              ))}
            </div>
          )}
        </div>

        {/* Bookings Section */}
        <DeveloperBookingsSection developerId={developerId} />
      </div>
    </div>
  );
}