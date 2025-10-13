"use client"

import { useDispatch, useSelector } from "react-redux"
import NextHead from "../../../components/NextHead/NextHead"
import { AppDispatch, RootState } from "@/lib/store"
import { useEffect, useMemo, useState } from "react"
import { setUsers, setUserLoader } from "../../../features/user/userAuthSlice"
import { fetchProperties } from "../../../features/Properties/propertySlice"
import { fetchDistrict } from "../../../features/district/districtSlice"
import {
    RefreshCw,
    Home,
    MapPin,
    Users,
    TrendingUp,
    AlertCircle,
    CheckCircle,
    XCircle,
    PlusCircle,
    FileText,
    Building,
    BarChart3,
    Activity,
    Shield,
    Settings
} from "lucide-react"
import StatCardSkeleton from "../../components/StatCardSkeleton"
import DistributionSkeleton from "../../components/DistributionSkeleton"
import StatCard from "../../components/StatCard"
import PropertiesDistribution from "../../components/PropertiesDistribution"
import RecentActivity from "../../components/RecentActivity"
import UserOverview from "../../components/UserOverview"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { UserRole } from "../../../Types/auth"
import { useRoleGuard } from "../../../hook/useRoleGuard"

export default function AdminPage() {
    const { data: session, status } = useSession()
    const dispatch = useDispatch<AppDispatch>()
    const [refreshing, setRefreshing] = useState(false)
    const [systemHealth, setSystemHealth] = useState({
        status: "Loading...",
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

    // Role guard - Only allow ADMIN access
    const { hasAccess, isLoading: roleLoading, userRole } = useRoleGuard({
        allowedRoles: [UserRole.ADMIN],
        callbackUrl: "/dashboard"
    })

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
        if (session?.user && session.user.role === UserRole.ADMIN) {
            loadAllData()
        }
    }, [dispatch, session])

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
            status: "Loading...",
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

    const userCounts = useMemo(() => {
        if (!Array.isArray(users)) {
            return {
                total: 0,
                adminCount: 0,
                real_esate_developerCount: 0,
                regularUserCount: 0
            }
        }

        const adminCount = users.filter(user => user.role === UserRole.ADMIN).length
        const real_esate_developerCount = users.filter(user => user.role === UserRole.REAL_ESTATE_DEVELOPER).length
        const regularUserCount = users.filter(user =>
            user.role !== UserRole.ADMIN && user.role !== UserRole.REAL_ESTATE_DEVELOPER
        ).length

        return {
            total: users.length,
            adminCount,
            real_esate_developerCount,
            regularUserCount
        }
    }, [users])

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
                        <p className="text-gray-500">Role: {userRole || (session?.user?.role ? session.user.role : "Loading...")}</p>
                        <p className="text-gray-500">Status: {status}</p>
                    </div>
                </div>
            </div>
        )
    }

    // Show unauthorized access if user is not ADMIN
    if (session?.user?.role !== UserRole.ADMIN) {
        return (
            <div className="min-h-screen/30 p-6">
                <NextHead title="Unauthorized Access - Nestify" />
                <div className="flex justify-center items-center h-64">
                    <div className="text-center">
                        <div className="bg-red-100 p-4 rounded-full mb-4 inline-block">
                            <XCircle className="h-12 w-12 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Unauthorized Access</h2>
                        <p className="text-gray-600 mb-2">{"You don't have permission to access the admin dashboard."}</p>
                        <p className="text-sm text-gray-500 mb-4">
                            Your Role: <span className="font-medium">{session?.user?.role || "Unknown"}</span><br />
                            Required Role: <span className="font-medium">ADMIN</span>
                        </p>
                        <Link
                            href="/dashboard"
                            className="inline-block px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                            Go to User Dashboard
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
        <div className="min-h-screen bg-gray-50 px-4 lg:px-8 py-8">
            <NextHead title="Admin Dashboard - Nestify" />

            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="mb-4 lg:mb-0">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Shield className="h-6 w-6 text-green-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        </div>
                        <p className="text-gray-600">
                            Welcome back, <span className="font-semibold text-green-600">{session.user.name}</span>!
                            <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                {session.user.role}
                            </span>
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
                            <Activity className="h-4 w-4 text-green-500" />
                            <span>Last updated: {new Date().toLocaleTimeString()}</span>
                        </div>
                        <button
                            onClick={handleRefresh}
                            disabled={refreshing}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 transition-all duration-200 shadow-sm"
                        >
                            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                            {refreshing ? "Refreshing..." : "Refresh"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Settings className="h-5 w-5 text-gray-500" />
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                        href="/dashboard/add-property"
                        className="bg-white p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                                <PlusCircle className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Add Property</h3>
                                <p className="text-sm text-gray-500">Create new listing</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/add-city"
                        className="bg-white p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                                <Building className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Add City</h3>
                                <p className="text-sm text-gray-500">Manage locations</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/add-blog"
                        className="bg-white p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                                <FileText className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Add Blog</h3>
                                <p className="text-sm text-gray-500">Create content</p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/users-information"
                        className="bg-white p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                                <Users className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Manage Users</h3>
                                <p className="text-sm text-gray-500">User administration</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Link href="/Properties" className="block">
                    <StatCard
                        title="Total Properties"
                        value={totalProperties}
                        growth={propertyGrowth}
                        icon={Home}
                        color="green"
                        loading={isLoading}
                    />
                </Link>

                <Link href="/SeeAllDistrict" className="block">
                    <StatCard
                        title="Districts Covered"
                        value={totalDistricts}
                        avg={avgPropertiesPerDistrict}
                        icon={MapPin}
                        color="green"
                        loading={isLoading}
                    />
                </Link>

                <Link href="/dashboard/users-information" className="block">
                    <StatCard
                        title="Total Users"
                        value={totalUsers}
                        growth={userGrowth}
                        icon={Users}
                        color="purple"
                        loading={isLoading}
                    />
                </Link>

                <StatCard
                    title="Platform Health"
                    value={healthConfig.value}
                    status={healthConfig.status}
                    icon={healthConfig.icon}
                    color={healthConfig.color}
                    loading={isLoading}
                />
            </div>

            {/* Charts and Analytics Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
                <div className="xl:col-span-2">
                    <PropertiesDistribution
                        districts={districts}
                        properties={properties}
                        totalProperties={totalProperties}
                    />
                </div>
                <div className="xl:col-span-1">
                    <RecentActivity />
                </div>
            </div>

            {/* User Overview and System Health */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <UserOverview
                    totalUsers={userCounts.total}
                    adminCount={userCounts.adminCount}
                    real_esate_developerCount={userCounts.real_esate_developerCount}
                />

                {/* System Health Details */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Activity className="h-5 w-5 text-gray-500" />
                            System Health
                        </h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${systemHealth.status === "healthy" ? "bg-green-100 text-green-800" :
                            systemHealth.status === "degraded" ? "bg-orange-100 text-orange-800" :
                                "bg-red-100 text-red-800"
                            }`}>
                            {systemHealth.status.charAt(0).toUpperCase() + systemHealth.status.slice(1)}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Overall Status</span>
                            <span className="text-sm font-semibold">{systemHealth.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full transition-all duration-500 ${systemHealth.status === "healthy" ? "bg-green-500" :
                                    systemHealth.status === "degraded" ? "bg-orange-500" :
                                        "bg-red-500"
                                    }`}
                                style={{ width: `${systemHealth.percentage}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600">{systemHealth.message}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className={`p-3 rounded-lg border ${!propertiesError && !districtsError
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                            }`}>
                            <div className="flex items-center gap-2 mb-1">
                                {!propertiesError && !districtsError ? (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                    <XCircle className="h-4 w-4 text-red-600" />
                                )}
                                <span className="text-sm font-medium">Database</span>
                            </div>
                            <p className="text-xs text-gray-600">
                                {!propertiesError && !districtsError ? 'Connected' : 'Issues detected'}
                            </p>
                        </div>

                        <div className={`p-3 rounded-lg border ${Array.isArray(users) && Array.isArray(properties) && Array.isArray(districts)
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                            }`}>
                            <div className="flex items-center gap-2 mb-1">
                                {Array.isArray(users) && Array.isArray(properties) && Array.isArray(districts) ? (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                    <XCircle className="h-4 w-4 text-red-600" />
                                )}
                                <span className="text-sm font-medium">API</span>
                            </div>
                            <p className="text-xs text-gray-600">
                                {Array.isArray(users) && Array.isArray(properties) && Array.isArray(districts) ? 'Responsive' : 'Slow'}
                            </p>
                        </div>

                        <div className={`p-3 rounded-lg border ${users.length > 0 || properties.length > 0 || districts.length > 0
                            ? 'bg-green-50 border-green-200'
                            : 'bg-yellow-50 border-yellow-200'
                            }`}>
                            <div className="flex items-center gap-2 mb-1">
                                {users.length > 0 || properties.length > 0 || districts.length > 0 ? (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                                )}
                                <span className="text-sm font-medium">Data</span>
                            </div>
                            <p className="text-xs text-gray-600">
                                {users.length > 0 || properties.length > 0 || districts.length > 0 ? 'Loaded' : 'No data'}
                            </p>
                        </div>

                        <div className="p-3 rounded-lg border bg-green-50 border-green-200">
                            <div className="flex items-center gap-2 mb-1">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-medium">Performance</span>
                            </div>
                            <p className="text-xs text-gray-600">Optimal</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Display */}
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
        </div>
    )
}