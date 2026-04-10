"use client"
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { fetchPropertiesByEmail } from '@/app/features/Properties/propertySlice'
import { PropertyType, SessionUser } from '@/app/Types/properties'
import Link from 'next/link'
import {
  TrendingUp, DollarSign, Plus, BarChart3,
  MessageSquare, Building, CheckCircle, Clock,
  Users, ArrowRight, Image as ImageIcon, Book
} from 'lucide-react'
import Image from 'next/image'

interface DeveloperStats {
  totalProperties: number
  activeListings: number
  soldProperties: number
  totalRevenue: number
  pendingProperties: number
}

type StatusColor = 'green' | 'blue' | 'yellow' | 'purple' | 'red'

export default function RealEsateDeveloperPage() {
  const { data: session, status } = useSession()
  const dispatch = useDispatch<AppDispatch>()
  const { properties, loading: propertiesLoading, error } = useSelector(
    (state: RootState) => state.properties
  )
  const [loading, setLoading] = useState(true)
  const [developerStats, setDeveloperStats] = useState<DeveloperStats>({
    totalProperties: 0,
    activeListings: 0,
    soldProperties: 0,
    totalRevenue: 0,
    pendingProperties: 0,
  })

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.email) {
      dispatch(fetchPropertiesByEmail(session.user.email))
        .unwrap()
        .catch((err: string) => console.error('Error fetching properties:', err))
    }
  }, [dispatch, status, session?.user?.email])

  useEffect(() => {
    if (!propertiesLoading) {
      if (properties && properties.length > 0) {
        const totalProperties = properties.length
        const activeListings = properties.filter(p => p.status === 'Available').length
        const soldProperties = properties.filter(p => p.status === 'Sold').length
        const pendingProperties = properties.filter(p => p.status === 'Pending').length
        const totalRevenue = properties
          .filter(p => p.status === 'Sold')
          .reduce((sum: number, p: PropertyType) => sum + (p.price || 0), 0)

        setDeveloperStats({
          totalProperties,
          activeListings,
          soldProperties,
          totalRevenue,
          pendingProperties,
        })
      } else {
        setDeveloperStats({
          totalProperties: 0,
          activeListings: 0,
          soldProperties: 0,
          totalRevenue: 0,
          pendingProperties: 0,
        })
      }
      setLoading(false)
    }
  }, [properties, propertiesLoading])

  if (status === 'loading' || loading || propertiesLoading) {
    return <DeveloperSkeleton />
  }

  const sessionUser = session?.user as SessionUser
  const propertiesList = Array.isArray(properties) ? properties : []
  const rentedCount = propertiesList.filter((p: PropertyType) => p.status === 'Rented').length
  const soldRate = Math.round(
    (developerStats.soldProperties / (developerStats.totalProperties || 1)) * 100
  )
  const activeRate = Math.round(
    (developerStats.activeListings / (developerStats.totalProperties || 1)) * 100
  )

  return (
    <div className="min-h-screen px-1 lg:px-10 py-10 bg-gray-50 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Developer Dashboard</h1>
        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
          Welcome back, {session?.user?.name}
        </p>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Email: {session?.user?.email} • Role: {sessionUser?.role || 'Real Estate Developer'}
        </p>
        <p className="text-xs sm:text-sm text-green-600 mt-1 font-medium">
          Total Properties Added: {propertiesList.length}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <Link href="/dashboard/real_estate_developer/MyProperties" className="block">
          <StatCard
            title="My Properties"
            value={propertiesList.length}
            change={`${propertiesList.length} properties managed`}
            trend="neutral"
            icon={<Building className="w-5 h-5 sm:w-6 sm:h-6" />}
          />
        </Link>
        <StatCard
          title="Active Listings"
          value={developerStats.activeListings}
          change={`${activeRate}% of total`}
          trend="positive"
          icon={<TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />}
        />
        <Link href="/dashboard/real_estate_developer/sold-properties" className="block">
          <StatCard
            title="Sold Properties"
            value={developerStats.soldProperties}
            change={`${soldRate}% sold rate`}
            trend="positive"
            icon={<CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
          />
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm sm:text-base">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Recent Properties */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Your Properties</h2>
          <div className="space-y-3 sm:space-y-4">
            {propertiesList.length > 0 ? (
              propertiesList.slice(0, 5).map((property: PropertyType) => (
                <PropertyItem key={property._id} property={property} />
              ))
            ) : (
              <div className="text-center py-6 sm:py-8 text-gray-500">
                <div className="text-base sm:text-lg mb-2">No properties found</div>
                <p className="text-xs sm:text-sm">
                  Start by adding your first property to see it here!
                </p>
              </div>
            )}
          </div>
          {propertiesList.length > 5 && (
            <Link
              href="/dashboard/real_estate_developer/MyProperties"
              className="w-full mt-4 text-green-600 hover:text-green-700 text-sm font-medium flex items-center justify-center gap-1"
            >
              View all {propertiesList.length} properties{' '}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Quick Actions & Status */}
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <ActionButton
                title="Add Property"
                icon={<Plus className="w-5 h-5 sm:w-6 sm:h-6" />}
                href="/dashboard/add-property"
              />
              <ActionButton
                title="Add Blog"
                icon={<Book className="w-5 h-5 sm:w-6 sm:h-6" />}
                href="/dashboard/add-blog"
              />
              <ActionButton
                title="Analytics"
                icon={<BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />}
                href="/dashboard/real_estate_developer/analytics"
              />
              <ActionButton
                title="Bookings"
                icon={<MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />}
                href="/dashboard/real_estate_developer/bookings"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
              Property Status
            </h2>
            <div className="space-y-2 sm:space-y-3">
              <StatusItem
                status="Available"
                count={developerStats.activeListings}
                color="green"
                icon={<CheckCircle className="w-4 h-4" />}
              />
              <StatusItem
                status="Sold"
                count={developerStats.soldProperties}
                color="blue"
                icon={<DollarSign className="w-4 h-4" />}
              />
              <StatusItem
                status="Pending"
                count={developerStats.pendingProperties}
                color="yellow"
                icon={<Clock className="w-4 h-4" />}
              />
              <StatusItem
                status="Rented"
                count={rentedCount}
                color="purple"
                icon={<Users className="w-4 h-4" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Skeleton ────────────────────────────────────────────────────────────────
function DeveloperSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mb-6 sm:mb-8">
        <div className="h-7 sm:h-8 bg-gray-200 rounded w-48 sm:w-64 mb-2 animate-pulse" />
        <div className="h-3 sm:h-4 bg-gray-200 rounded w-32 sm:w-48 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-20 sm:w-24 mb-2 animate-pulse" />
            <div className="h-6 sm:h-8 bg-gray-200 rounded w-12 sm:w-16 mb-2 animate-pulse" />
            <div className="h-2 sm:h-3 bg-gray-200 rounded w-16 sm:w-20 animate-pulse" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="h-5 sm:h-6 bg-gray-200 rounded w-24 sm:w-32 mb-4 animate-pulse" />
          <div className="space-y-3 sm:space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 rounded-lg animate-pulse" />
                <div className="flex-1">
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4 mb-1 animate-pulse" />
                  <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="h-5 sm:h-6 bg-gray-200 rounded w-24 sm:w-32 mb-4 animate-pulse" />
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 sm:h-20 bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="h-5 sm:h-6 bg-gray-200 rounded w-24 sm:w-32 mb-4 animate-pulse" />
            <div className="space-y-2 sm:space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-6 sm:h-8 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({
  title, value, change, trend, icon,
}: {
  title: string
  value: string | number
  change: string
  trend: 'positive' | 'negative' | 'neutral'
  icon: React.ReactNode
}) {
  const trendColor =
    trend === 'positive' ? 'text-green-600'
      : trend === 'negative' ? 'text-red-600'
        : 'text-gray-600'

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="text-gray-400 group-hover:text-green-500 transition-colors">{icon}</div>
      </div>
      <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
      <p className={`text-xs sm:text-sm ${trendColor} mt-1`}>{change}</p>
    </div>
  )
}

// ─── PropertyItem ─────────────────────────────────────────────────────────────
function PropertyItem({ property }: { property: PropertyType }) {
  const statusColor =
    property.status === 'Available' ? 'bg-green-100 text-green-800'
      : property.status === 'Sold' ? 'bg-blue-100 text-blue-800'
        : property.status === 'Pending' ? 'bg-yellow-100 text-yellow-800'
          : property.status === 'Rented' ? 'bg-purple-100 text-purple-800'
            : 'bg-gray-100 text-gray-800'

  return (
    <Link href="/dashboard/real_estate_developer/MyProperties">
      <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
        <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
          {property.images?.[0] ? (
            <Image
              src={property.images[0]}
              alt={property.title}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gray-300 flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-gray-500" />
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
            <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor}`}>
              {property.status || 'Unknown'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─── StatusItem ───────────────────────────────────────────────────────────────
function StatusItem({
  status, count, color, icon,
}: {
  status: string
  count: number
  color: StatusColor
  icon: React.ReactNode
}) {
  const dot =
    color === 'green' ? 'bg-green-500'
      : color === 'blue' ? 'bg-blue-500'
        : color === 'yellow' ? 'bg-yellow-500'
          : color === 'purple' ? 'bg-purple-500'
            : color === 'red' ? 'bg-red-500'
              : 'bg-gray-500'

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <div className={`h-3 w-3 rounded-full ${dot}`} />
        <div className="flex items-center space-x-2">
          {icon}
          <span className="text-sm font-medium text-gray-700">{status}</span>
        </div>
      </div>
      <span className="text-sm font-bold text-gray-900">{count}</span>
    </div>
  )
}

// ─── ActionButton ─────────────────────────────────────────────────────────────
function ActionButton({
  title, icon, href,
}: {
  title: string
  icon: React.ReactNode
  href: string
}) {
  return (
    <Link href={href}>
      <button className="w-full h-16 sm:h-20 bg-white border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all flex flex-col items-center justify-center group">
        <div className="text-gray-400 group-hover:text-green-500 transition-colors mb-1">{icon}</div>
        <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-green-700">
          {title}
        </span>
      </button>
    </Link>
  )
}