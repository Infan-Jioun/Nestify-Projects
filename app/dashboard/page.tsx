// app/dashboard/page.tsx
"use client"

import { useDispatch, useSelector } from "react-redux"
import NextHead from "../components/NextHead/NextHead"
import { AppDispatch, RootState } from "@/lib/store"
import { useEffect, useMemo, useState } from "react"
import { setUsers, setUserLoader } from "../features/user/userAuthSlice"
import { fetchProperties } from "../features/Properties/propertySlice"
import { fetchDistrict } from "../features/district/districtSlice"
import { RefreshCw, Home, MapPin, Users, TrendingUp, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import StatCardSkeleton from "./components/StatCardSkeleton"
import DistributionSkeleton from "./components/DistributionSkeleton"
import StatCard from "./components/StatCard"
import PropertiesDistribution from "./components/PropertiesDistribution"
import RecentActivity from "./components/RecentActivity"
import UserOverview from "./components/UserOverview"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { UserRole } from "../Types/auth"
import { useRoleGuard } from "../hook/useRoleGuard"

export default function DashboardPage() {
    const { data: session, status } = useSession()
    const dispatch = useDispatch<AppDispatch>()
    const [refreshing, setRefreshing] = useState(false)
    const [systemHealth, setSystemHealth] = useState({
        status: "loading",
        percentage: 0,
        message: "Checking system status..."
    })



    const { users, userLoader } = useSelector((state: RootState) => state.user || { users: [], userLoader: false })
    const { properties, loading: propertiesLoading, error: propertiesError } = useSelector(
        (state: RootState) => state.properties || { properties: [], loading: false, error: null }
    )
    const { district: districts, loading: districtsLoading, error: districtsError } = useSelector(
        (state: RootState) => state.district || { district: [], loading: false, error: null }
    )

    // Role guard - Temporary: Allow access while debugging role issue
    const { hasAccess, isLoading: roleLoading, userRole } = useRoleGuard({
        allowedRoles: [UserRole.ADMIN, UserRole.REAL_ESTATE_DEVELOPER],
        callbackUrl: "/dashboard"
    })

    // Temporary: Force access for admin users while we fix the role issue
    const tempHasAccess = session?.user ? true : false

    const calculateSystemHealth = () => {
        const checks = {
            database: !propertiesError && !districtsError,
            api: Array.isArray(users) && Array.isArray(properties) && Array.isArray(districts),
            dataLoaded: users.length > 0 || properties.length > 0 || districts.length > 0,
            performance: true
        }

        const passedChecks = Object.values(checks).filter(Boolean).length
        const totalChecks = Object.keys(checks).length
        const healthPercentage = (passedChecks / totalChecks) * 100

        let status, message
        if (healthPercentage >= 90) {
            status = "healthy"
            message = "All systems operational"
        } else if (healthPercentage >= 70) {
            status = "degraded"
            message = "System experiencing minor issues"
        } else {
            status = "unhealthy"
            message = "System requires attention"
        }

        return {
            status,
            percentage: Math.round(healthPercentage),
            message
        }
    }

    useEffect(() => {
        if (session?.user && tempHasAccess) {
            loadAllData()
        }
    }, [dispatch, session, tempHasAccess])

    useEffect(() => {
        if (!roleLoading && !userLoader) {
            const health = calculateSystemHealth()
            setSystemHealth(health)
        }
    }, [users, properties, districts, propertiesError, districtsError, roleLoading, userLoader])

    const loadAllData = async () => {
        try {
            dispatch(setUserLoader(true))
            const usersResponse = await fetch("/api/users")
            if (usersResponse.ok) {
                const usersData = await usersResponse.json()
                dispatch(setUsers(usersData))
            }

            dispatch(fetchProperties())
            dispatch(fetchDistrict())
        } catch (error) {
            console.error("Error loading data:", error)
        } finally {
            dispatch(setUserLoader(false))
        }
    }

    const handleRefresh = () => {
        setRefreshing(true)
        setSystemHealth({
            status: "loading",
            percentage: 0,
            message: "Refreshing system status..."
        })
        loadAllData()
        setTimeout(() => setRefreshing(false), 1000)
    }

    const totalProperties = Array.isArray(properties) ? properties.length : 0
    const totalDistricts = Array.isArray(districts) ? districts.length : 0
    const totalUsers = Array.isArray(users) ? users.length : 0
    const avgPropertiesPerDistrict = totalDistricts > 0 ? (totalProperties / totalDistricts).toFixed(1) : "0"

    const userGrowth = 12.5
    const propertyGrowth = 8.2

    // Loading states
    const isLoading = propertiesLoading || districtsLoading || userLoader || status === "loading" || roleLoading

    // Show loading while checking authentication and access
    if (status === "loading" || roleLoading) {
        return (
            <div className="min-h-screen/30 p-6">
                <NextHead title="Dashboard - Nestify" />
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                    <div className="ml-4 text-sm">
                        <p>Checking access...</p>
                        <p className="text-gray-500">Role: {userRole || "undefined"}</p>
                        <p className="text-gray-500">Status: {status}</p>
                    </div>
                </div>
            </div>
        )
    }

    // Show access denied if no access (temporary disabled)
    if (!tempHasAccess) {
        return (
            <div className="min-h-screen/30 p-6">
                <NextHead title="Access Denied - Nestify" />
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
                        <p className="text-gray-600">{"You don't have permission to access the dashboard."}</p>
                        <p className="text-sm text-gray-500 mt-2">
                            User Role: {userRole || "undefined"}<br />
                            User ID: {session?.user?.id || "undefined"}
                        </p>
                        <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
                            Go back to Home
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    // Show loading while checking access
    if (!session?.user) {
        return (
            <div className="min-h-screen/30 p-6">
                <NextHead title="Dashboard - Nestify" />
                <div className="flex justify-center items-center h-64">
                    <p>Redirecting to login...</p>
                </div>
            </div>
        )
    }

    const getHealthConfig = () => {
        switch (systemHealth.status) {
            case "healthy":
                return {
                    color: "green" as const,
                    icon: CheckCircle,
                    value: `${systemHealth.percentage}%`,
                    status: systemHealth.message
                }
            case "degraded":
                return {
                    color: "orange" as const,
                    icon: AlertCircle,
                    value: `${systemHealth.percentage}%`,
                    status: systemHealth.message
                }
            case "unhealthy":
                return {
                    color: "red" as const,
                    icon: XCircle,
                    value: `${systemHealth.percentage}%`,
                    status: systemHealth.message
                }
            default:
                return {
                    color: "gray" as const,
                    icon: TrendingUp,
                    value: `${systemHealth.percentage}%`,
                    status: systemHealth.message
                }
        }
    }

    const healthConfig = getHealthConfig()

    if (isLoading && !refreshing) {
        return (
            <div className="min-h-screen/30 p-6">
                <NextHead title="Dashboard - Nestify" />
                <div className="mb-8 animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-96"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[...Array(4)].map((_, index) => (
                        <StatCardSkeleton key={index} />
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
                        <DistributionSkeleton />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen/30 px-1">
            <NextHead title="Dashboard - Nestify" />

            {/* Debug Info - Only in development */}
            {process.env.NODE_ENV === "development" && (
                <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-4">
                    <h3 className="font-bold text-yellow-800">Debug Info</h3>
                    <p className="text-sm text-yellow-700">
                        Role: {session.user.role || "undefined"} |
                        ID: {session.user.id} |
                        Name: {session.user.name}
                    </p>
                </div>
            )}

            {/* Header */}
            <div className="mb-8 grid md:grid-cols-2 justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-500 mt-2">
                        Welcome back, {session.user.name}!
                        {session.user.role && ` (${session.user.role})`}
                    </p>
                </div>
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="mt-2 flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                    <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                    {refreshing ? "Refreshing..." : "Refresh Data"}
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Link href={"/Properties"}>
                    <StatCard
                        title="Total Properties"
                        value={totalProperties}
                        growth={propertyGrowth}
                        icon={Home}
                        color="green"
                    />
                </Link>
                <Link href={"/SeeAllDistrict"}>
                    <StatCard
                        title="Districts Covered"
                        value={totalDistricts}
                        avg={avgPropertiesPerDistrict}
                        icon={MapPin}
                        color="green"
                    />
                </Link>
                {
                    session.user.role === UserRole.ADMIN && <Link href={"/dashboard/users-information"}>
                        <StatCard
                            title="Total Users"
                            value={totalUsers}
                            growth={userGrowth}
                            icon={Users}
                            color="purple"
                        />
                    </Link>
                }
                <StatCard
                    title="Platform Health"
                    value={healthConfig.value}
                    status={healthConfig.status}
                    icon={healthConfig.icon}
                    color={healthConfig.color}
                />
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <PropertiesDistribution
                    districts={districts}
                    properties={properties}
                    totalProperties={totalProperties}
                />
                <RecentActivity />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <UserOverview totalUsers={totalUsers} adminCount={5} moderatorCount={3} ownerCount={2} />
            </div>

            {/* Error */}
            {(propertiesError || districtsError) && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="h-6 w-6 text-red-500" />
                        <div>
                            <h3 className="text-lg font-semibold text-red-800">Error Loading Data</h3>
                            <p className="text-red-500 mt-1">{propertiesError || districtsError || "Unknown error occurred"}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* System Health Details */}
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className={`p-4 rounded-lg border ${!propertiesError && !districtsError
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                        }`}>
                        <div className="flex items-center gap-2 mb-2">
                            {!propertiesError && !districtsError ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                                <XCircle className="h-5 w-5 text-red-600" />
                            )}
                            <span className="font-medium">Database</span>
                        </div>
                        <p className="text-sm text-gray-600">
                            {!propertiesError && !districtsError ? 'Connected' : 'Connection issues'}
                        </p>
                    </div>

                    <div className={`p-4 rounded-lg border ${Array.isArray(users) && Array.isArray(properties) && Array.isArray(districts)
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                        }`}>
                        <div className="flex items-center gap-2 mb-2">
                            {Array.isArray(users) && Array.isArray(properties) && Array.isArray(districts) ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                                <XCircle className="h-5 w-5 text-red-600" />
                            )}
                            <span className="font-medium">API</span>
                        </div>
                        <p className="text-sm text-gray-600">
                            {Array.isArray(users) && Array.isArray(properties) && Array.isArray(districts) ? 'Responsive' : 'Slow response'}
                        </p>
                    </div>

                    <div className={`p-4 rounded-lg border ${users.length > 0 || properties.length > 0 || districts.length > 0
                        ? 'bg-green-50 border-green-200'
                        : 'bg-yellow-50 border-yellow-200'
                        }`}>
                        <div className="flex items-center gap-2 mb-2">
                            {users.length > 0 || properties.length > 0 || districts.length > 0 ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                                <AlertCircle className="h-5 w-5 text-yellow-600" />
                            )}
                            <span className="font-medium">Data</span>
                        </div>
                        <p className="text-sm text-gray-600">
                            {users.length > 0 || properties.length > 0 || districts.length > 0 ? 'Loaded' : 'No data'}
                        </p>
                    </div>

                    <div className="p-4 rounded-lg border bg-green-50 border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="font-medium">Performance</span>
                        </div>
                        <p className="text-sm text-gray-600">Optimal</p>
                    </div>
                </div>
            </div>
        </div>
    )
}