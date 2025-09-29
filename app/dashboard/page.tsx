"use client"

import { useDispatch, useSelector } from "react-redux"
import NextHead from "../components/NextHead/NextHead"
import { AppDispatch, RootState } from "@/lib/store"
import {
    Home,
    MapPin,
    Users,
    TrendingUp,
    AlertCircle,
    Loader2,
    RefreshCw
} from "lucide-react"
import { useEffect, useState } from "react"
import { setUsers, setUserLoader } from "../features/user/userAuthSlice"
import { fetchProperties } from "../features/Properties/propertySlice"
import { fetchDistrict } from "../features/district/districtSlice"

export default function DashboardPage() {
    const dispatch = useDispatch<AppDispatch>();
    const [refreshing, setRefreshing] = useState(false)

    // Safe data extraction with proper error handling
    const { users, userLoader } = useSelector((state: RootState) => state.user || { users: [], userLoader: false })
    const { properties, loading: propertiesLoading, error: propertiesError } = useSelector((state: RootState) => state.properties || { properties: [], loading: false, error: null })
    const { district: districts, loading: districtsLoading, error: districtsError } = useSelector((state: RootState) => state.district || { district: [], loading: false, error: null })

    useEffect(() => {
        loadAllData()
    }, [dispatch])

    const loadAllData = async () => {
        try {
            // Load users
            dispatch(setUserLoader(true))
            const usersResponse = await fetch('/api/users')
            const usersData = await usersResponse.json()
            dispatch(setUsers(usersData))

            // Load other data
            dispatch(fetchProperties())
            dispatch(fetchDistrict())
        } catch (error) {
            console.error('Error loading data:', error)
        } finally {
            dispatch(setUserLoader(false))
        }
    }

    const handleRefresh = () => {
        setRefreshing(true)
        loadAllData()
        setTimeout(() => setRefreshing(false), 1000)
    }

    // Debug data
    console.log('Dashboard Data:', {
        users: users?.length,
        properties: properties?.length,
        districts: districts?.length,
        userLoader,
        propertiesLoading,
        districtsLoading
    })

    // Calculate statistics with safe array access
    const totalProperties = Array.isArray(properties) ? properties.length : 0
    const totalDistricts = Array.isArray(districts) ? districts.length : 0
    const totalUsers = Array.isArray(users) ? users.length : 0

    // Calculate average properties per district
    const avgPropertiesPerDistrict = totalDistricts > 0 ? (totalProperties / totalDistricts).toFixed(1) : "0"

    // Mock growth data
    const userGrowth = 12.5
    const propertyGrowth = 8.2

    // Check if data is loading
    const isLoading = propertiesLoading || districtsLoading || userLoader

    // Skeleton loader component
    const StatCardSkeleton = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="flex items-center justify-between">
                <div className="space-y-3 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div className="flex items-center gap-2">
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
                <div className="p-3 bg-gray-200 rounded-lg">
                    <div className="h-6 w-6 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    )

    const DistributionSkeleton = () => (
        <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-center justify-between animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-6"></div>
                    </div>
                </div>
            ))}
        </div>
    )

    if (isLoading && !refreshing) {
        return (
            <div className="min-h-screen bg-gray-50/30 p-6">
                <NextHead title="Dashboard - Nestify" />

                {/* Header Skeleton */}
                <div className="mb-8 animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-96"></div>
                </div>

                {/* Stats Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[...Array(4)].map((_, index) => (
                        <StatCardSkeleton key={index} />
                    ))}
                </div>

                {/* Charts Section Skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
                        <DistributionSkeleton />
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
                        <div className="space-y-4">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 animate-pulse">
                                    <div className="h-5 w-5 bg-gray-200 rounded"></div>
                                    <div className="space-y-2 flex-1">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50/30 p-6">
            <NextHead title="Dashboard - Nestify" />

            {/* Header */}
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 mt-2">Welcome to your Nestify management dashboard</p>
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                    <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                    {refreshing ? 'Refreshing...' : 'Refresh Data'}
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Properties Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Properties</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{totalProperties}</p>
                            <div className="flex items-center gap-1 mt-2">
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-500 font-medium">+{propertyGrowth}%</span>
                                <span className="text-sm text-gray-500">from last month</span>
                            </div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <Home className="h-6 w-6 text-green-500" />
                        </div>
                    </div>
                </div>

                {/* Districts Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Districts Covered</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{totalDistricts}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Avg: {avgPropertiesPerDistrict} properties/district
                            </p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                            <MapPin className="h-6 w-6 text-green-500" />
                        </div>
                    </div>
                </div>

                {/* Users Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Users</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{totalUsers}</p>
                            <div className="flex items-center gap-1 mt-2">
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-500 font-medium">+{userGrowth}%</span>
                                <span className="text-sm text-gray-500">from last month</span>
                            </div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <Users className="h-6 w-6 text-purple-500" />
                        </div>
                    </div>
                </div>

                {/* Performance Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Platform Health</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">98.2%</p>
                            <p className="text-sm text-green-500 font-medium mt-2">All systems operational</p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-orange-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts and Detailed Data Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Properties by District Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Properties Distribution</h3>
                    <div className="space-y-4">
                        {Array.isArray(districts) && districts.length > 0 ? (
                            districts.slice(0, 5).map((district, index) => {
                                const districtProperties = Array.isArray(properties) ?
                                    properties.filter(p => p.districtId === district.id) : []
                                const propertyCount = districtProperties.length
                                const percentage = totalProperties > 0 ? (propertyCount / totalProperties) * 100 : 0

                                return (
                                    <div key={district.id || index} className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700">
                                            {district.districtName || `District ${index + 1}`}
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <div className="w-32 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                                    style={{
                                                        width: `${Math.min(100, percentage)}%`
                                                    }}
                                                />
                                            </div>
                                            <span className="text-sm text-gray-500 w-8">
                                                {propertyCount}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <p className="text-gray-500 text-center py-4">No districts data available</p>
                        )}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                            <Home className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">New property listed</p>
                                <p className="text-xs text-gray-500">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                            <Users className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">New user registered</p>
                                <p className="text-xs text-gray-500">4 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                            <MapPin className="h-5 w-5 text-purple-500" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">New district added</p>
                                <p className="text-xs text-gray-500">1 day ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Handling */}
            {(propertiesError || districtsError) && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="h-6 w-6 text-red-500" />
                        <div>
                            <h3 className="text-lg font-semibold text-red-800">Error Loading Data</h3>
                            <p className="text-red-500 mt-1">
                                {propertiesError || districtsError || "Unknown error occurred"}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Data Tables Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Districts */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Districts</h3>
                    <div className="space-y-3">
                        {Array.isArray(districts) && districts.length > 0 ? (
                            districts.slice(0, 5).map((district, index) => {
                                const districtProperties = Array.isArray(properties) ?
                                    properties.filter(p => p.districtId === district.id) : []
                                const propertyCount = districtProperties.length
                                const percentage = totalProperties > 0 ? (propertyCount / totalProperties) * 100 : 0

                                return (
                                    <div key={district.id || index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                <MapPin className="h-4 w-4 text-green-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {district.districtName || `District ${index + 1}`}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {propertyCount} properties
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">
                                                {percentage.toFixed(1)}%
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <p className="text-gray-500 text-center py-4">No districts data available</p>
                        )}
                    </div>
                </div>

                {/* User Summary */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">User Overview</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">Total Users</span>
                            <span className="text-lg font-bold text-gray-900">{totalUsers}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-green-50 rounded-lg">
                                <p className="text-2xl font-bold text-green-500">
                                    {Math.floor(totalUsers * 0.65)}
                                </p>
                                <p className="text-xs text-green-500 mt-1">Active Users</p>
                            </div>
                            <div className="text-center p-3 bg-green-50 rounded-lg">
                                <p className="text-2xl font-bold text-green-500">
                                    {Math.floor(totalUsers * 0.35)}
                                </p>
                                <p className="text-xs text-green-500 mt-1">New Users</p>
                            </div>
                        </div>
                        {Array.isArray(users) && users.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Recent Users:</p>
                                <div className="space-y-2">
                                    {users.slice(0, 3).map((user, index) => (
                                        <div key={user._id || index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                <Users className="h-4 w-4 text-purple-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

     
          
        </div>
    )
}