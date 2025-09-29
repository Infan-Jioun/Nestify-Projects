"use client"

import { useDispatch, useSelector } from "react-redux"
import NextHead from "../components/NextHead/NextHead"
import { AppDispatch, RootState } from "@/lib/store"
import { useEffect, useMemo, useState } from "react"
import { setUsers, setUserLoader } from "../features/user/userAuthSlice"
import { fetchProperties } from "../features/Properties/propertySlice"
import { fetchDistrict } from "../features/district/districtSlice"
import { RefreshCw, Home, MapPin, Users, TrendingUp, AlertCircle } from "lucide-react"
import StatCardSkeleton from "./components/StatCardSkeleton"
import DistributionSkeleton from "./components/DistributionSkeleton"
import StatCard from "./components/StatCard"
import PropertiesDistribution from "./components/PropertiesDistribution"
import RecentActivity from "./components/RecentActivity"
import UserOverview from "./components/UserOverview"
import Link from "next/link"



export default function DashboardPage() {
    const dispatch = useDispatch<AppDispatch>()
    const [refreshing, setRefreshing] = useState(false)

    const { users, userLoader } = useSelector((state: RootState) => state.user || { users: [], userLoader: false })
    const { properties, loading: propertiesLoading, error: propertiesError } = useSelector(
        (state: RootState) => state.properties || { properties: [], loading: false, error: null }
    )
    const { district: districts, loading: districtsLoading, error: districtsError } = useSelector(
        (state: RootState) => state.district || { district: [], loading: false, error: null }
    )

    useEffect(() => {
        loadAllData()
    }, [dispatch])

    const loadAllData = async () => {
        try {
            dispatch(setUserLoader(true))
            const usersResponse = await fetch("/api/users")
            const usersData = await usersResponse.json()
            dispatch(setUsers(usersData))

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
        loadAllData()
        setTimeout(() => setRefreshing(false), 1000)
    }

    const totalProperties = Array.isArray(properties) ? properties.length : 0
    const totalDistricts = Array.isArray(districts) ? districts.length : 0
    const totalUsers = Array.isArray(users) ? users.length : 0
    const avgPropertiesPerDistrict = totalDistricts > 0 ? (totalProperties / totalDistricts).toFixed(1) : "0"

    const userGrowth = 12.5
    const propertyGrowth = 8.2
    const isLoading = propertiesLoading || districtsLoading || userLoader

    if (isLoading && !refreshing) {
        return (
            <div className="min-h-screen bg-gray-50/30 p-6">
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
                    <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                    {refreshing ? "Refreshing..." : "Refresh Data"}
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
               <Link href={"/Properties"}> <StatCard title="Total Properties" value={totalProperties} growth={propertyGrowth} icon={Home} color="green" /></Link>
              <Link href={"/SeeAllDistrict"}>  <StatCard title="Districts Covered" value={totalDistricts} avg={avgPropertiesPerDistrict} icon={MapPin} color="green" /></Link>
           <Link href={"/dashboard/users-information"}>     <StatCard title="Total Users" value={totalUsers} growth={userGrowth} icon={Users} color="purple" /></Link>
                <StatCard title="Platform Health" value="98.2%" status="All systems operational" icon={TrendingUp} color="orange" />
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
        </div>
    )
}
