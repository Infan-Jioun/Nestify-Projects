// app/components/DeveloperPage.tsx
"use client"
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { fetchPropertiesByEmail } from '@/app/features/Properties/propertySlice'
import { PropertyType, SessionUser } from '@/app/Types/properties'

interface DeveloperStats {
  totalProperties: number;
  activeListings: number;
  soldProperties: number;
  totalRevenue: number;
  pendingProperties: number;
}

export default function DeveloperPage() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const { properties, loading: propertiesLoading, error } = useSelector((state: RootState) => state.properties);

  const [loading, setLoading] = useState(true);
  const [developerStats, setDeveloperStats] = useState<DeveloperStats>({
    totalProperties: 0,
    activeListings: 0,
    soldProperties: 0,
    totalRevenue: 0,
    pendingProperties: 0
  });

  // Fetch developer's properties
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      const userEmail = session.user.email;
      console.log('Fetching properties for user:', userEmail);
      
      dispatch(fetchPropertiesByEmail(userEmail))
        .unwrap()
        .then((result) => {
          console.log('Properties fetched successfully:', result.count);
        })
        .catch((fetchError: string) => {
          console.error('Error fetching properties:', fetchError);
        });
    }
  }, [dispatch, status, session?.user?.email]);

  // Calculate stats from real data
  useEffect(() => {
    if (properties && properties.length > 0 && !propertiesLoading) {
      console.log('Calculating stats for properties:', properties.length);
      
      const totalProperties = properties.length;
      const activeListings = properties.filter(prop => prop.status === 'Available').length;
      const soldProperties = properties.filter(prop => prop.status === 'Sold').length;
      const pendingProperties = properties.filter(prop => prop.status === 'Pending').length;
      const totalRevenue = properties
        .filter(prop => prop.status === 'Sold')
        .reduce((sum: number, prop: PropertyType) => sum + (prop.price || 0), 0);

      setDeveloperStats({
        totalProperties,
        activeListings,
        soldProperties,
        totalRevenue,
        pendingProperties
      });
      setLoading(false);
    } else if (!propertiesLoading) {
      console.log('No properties found or still loading');
      setDeveloperStats({
        totalProperties: 0,
        activeListings: 0,
        soldProperties: 0,
        totalRevenue: 0,
        pendingProperties: 0
      });
      setLoading(false);
    }
  }, [properties, propertiesLoading]);

  if (status === 'loading' || loading || propertiesLoading) {
    return <DeveloperSkeleton />;
  }

  const sessionUser = session?.user as SessionUser;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Developer Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {session?.user?.name}</p>
        <p className="text-sm text-gray-500 mt-1">
          Email: {session?.user?.email} • Role: {sessionUser?.role || 'Real Estate Developer'}
        </p>
        <p className="text-sm text-blue-600 mt-1 font-medium">
          Total Properties Added: {properties?.length || 0}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="My Properties"
          value={properties?.length || 0}
          change={`${properties?.length || 0} properties managed`}
          trend="neutral"
        />
        <StatCard
          title="Active Listings"
          value={developerStats.activeListings}
          change={`${Math.round((developerStats.activeListings / (developerStats.totalProperties || 1)) * 100) || 0}% of total`}
          trend="positive"
        />
        <StatCard
          title="Sold Properties"
          value={developerStats.soldProperties}
          change={`${Math.round((developerStats.soldProperties / (developerStats.totalProperties || 1)) * 100) || 0}% sold rate`}
          trend="positive"
        />
        <StatCard
          title="Total Revenue"
          value={`$${developerStats.totalRevenue.toLocaleString()}`}
          change="From sold properties"
          trend="positive"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Properties */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Properties</h2>
          <div className="space-y-4">
            {properties && properties.length > 0 ? (
              properties.slice(0, 5).map((property: PropertyType) => (
                <PropertyItem key={property._id} property={property} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-lg mb-2">No properties found</div>
                <p className="text-sm">Start by adding your first property to see it here!</p>
              </div>
            )}
          </div>
          {properties && properties.length > 5 && (
            <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
              View all {properties.length} properties →
            </button>
          )}
        </div>

        {/* Quick Actions & Status Overview */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <ActionButton title="Add Property" icon="➕" />
              <ActionButton title="View Listings" icon="📋" />
              <ActionButton title="Analytics" icon="📊" />
              <ActionButton title="Messages" icon="💬" />
            </div>
          </div>

          {/* Status Overview */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Status</h2>
            <div className="space-y-3">
              <StatusItem
                status="Available"
                count={developerStats.activeListings}
                color="green"
              />
              <StatusItem
                status="Sold"
                count={developerStats.soldProperties}
                color="blue"
              />
              <StatusItem
                status="Pending"
                count={developerStats.pendingProperties}
                color="yellow"
              />
              <StatusItem
                status="Rented"
                count={properties ? properties.filter((p: PropertyType) => p.status === 'Rented').length : 0}
                color="purple"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton Loading Component
function DeveloperSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-6">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Properties Skeleton */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-1 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Skeleton */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ 
  title, 
  value, 
  change, 
  trend 
}: {
  title: string;
  value: string | number;
  change: string;
  trend: 'positive' | 'negative' | 'neutral';
}) {
  const getTrendColor = (): string => {
    switch (trend) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
      <p className={`text-sm ${getTrendColor()} mt-1`}>{change}</p>
    </div>
  );
}

// Property Item Component
function PropertyItem({ property }: { property: PropertyType }) {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Sold': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rented': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="h-12 w-12 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-xs">No Image</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {property.title || 'Untitled Property'}
        </p>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs text-gray-500">
            ${property.price?.toLocaleString()} {property.currency || 'USD'}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(property.status)}`}>
            {property.status || 'Unknown'}
          </span>
        </div>
      </div>
    </div>
  );
}

// Status Item Component
function StatusItem({ 
  status, 
  count, 
  color 
}: {
  status: string;
  count: number;
  color: 'green' | 'blue' | 'yellow' | 'purple';
}) {
  const getColorClasses = (): string => {
    switch (color) {
      case 'green': return 'bg-green-500';
      case 'blue': return 'bg-blue-500';
      case 'yellow': return 'bg-yellow-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <div className={`h-3 w-3 rounded-full ${getColorClasses()}`}></div>
        <span className="text-sm font-medium text-gray-700">{status}</span>
      </div>
      <span className="text-sm font-bold text-gray-900">{count}</span>
    </div>
  );
}

// Action Button Component
function ActionButton({ title, icon }: { title: string; icon: string }) {
  return (
    <button className="h-20 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center justify-center group">
      <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{icon}</span>
      <span className="text-sm font-medium text-gray-700">{title}</span>
    </button>
  );
}