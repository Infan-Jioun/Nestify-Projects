"use client"

import { Home, Users, MapPin, Calendar, Eye, TrendingUp, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface Activity {
    id: string
    type: 'property' | 'user' | 'district' | 'view' | 'review'
    title: string
    description: string
    timestamp: Date
    user?: string
    data?: {
        price?: number
        location?: string
        userType?: string
        propertiesCount?: number
        district?: string
        propertiesAdded?: number
        views?: number
        propertyId?: string
        rating?: number
        review?: string
    }
}

export default function RecentActivity() {
    const [activities, setActivities] = useState<Activity[]>([])
    const [loading, setLoading] = useState(true)

    // Mock data generator - Replace with actual API calls
    const generateMockActivities = (): Activity[] => {
        const currentTime = new Date()
        return [
            {
                id: '1',
                type: 'property',
                title: 'New Luxury Villa Listed',
                description: '5-bedroom villa in Gulshan with pool',
                timestamp: new Date(currentTime.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
                user: 'John Doe',
                data: { price: 250000, location: 'Gulshan' }
            },
            {
                id: '2',
                type: 'user',
                title: 'New Premium User Registered',
                description: 'Real estate agent with 10+ properties',
                timestamp: new Date(currentTime.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
                user: 'Sarah Wilson',
                data: { userType: 'agent', propertiesCount: 10 }
            },
            {
                id: '3',
                type: 'district',
                title: 'New District Coverage Added',
                description: 'Extended services to Bashundhara R/A',
                timestamp: new Date(currentTime.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
                data: { district: 'Bashundhara R/A', propertiesAdded: 15 }
            },
            {
                id: '4',
                type: 'view',
                title: 'Property Views Surge',
                description: 'Luxury apartment in Banani gained 250+ views',
                timestamp: new Date(currentTime.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
                data: { views: 256, propertyId: 'prop_123' }
            },
            {
                id: '5',
                type: 'review',
                title: 'New Property Review',
                description: '4.8-star rating for commercial space',
                timestamp: new Date(currentTime.getTime() - 8 * 60 * 60 * 1000), // 8 hours ago
                user: 'Mike Chen',
                data: { rating: 4.8, review: 'Excellent location and amenities' }
            }
        ]
    }

    useEffect(() => {
        // Simulate API call
        const loadActivities = async () => {
            setLoading(true)
            try {
                // Replace with actual API call
                // const response = await fetch('/api/activities/recent')
                // const data = await response.json()

                // Using mock data for now
                setTimeout(() => {
                    setActivities(generateMockActivities())
                    setLoading(false)
                }, 1000)
            } catch (error) {
                console.error('Failed to load activities:', error)
                setLoading(false)
            }
        }

        loadActivities()
    }, [])

    const getActivityConfig = (type: Activity['type']) => {
        const config = {
            property: {
                icon: Home,
                color: 'green',
                bgColor: 'bg-green-50',
                borderColor: 'border-green-200',
                iconColor: 'text-green-600'
            },
            user: {
                icon: Users,
                color: 'blue',
                bgColor: 'bg-blue-50',
                borderColor: 'border-blue-200',
                iconColor: 'text-blue-600'
            },
            district: {
                icon: MapPin,
                color: 'purple',
                bgColor: 'bg-purple-50',
                borderColor: 'border-purple-200',
                iconColor: 'text-purple-600'
            },
            view: {
                icon: Eye,
                color: 'orange',
                bgColor: 'bg-orange-50',
                borderColor: 'border-orange-200',
                iconColor: 'text-orange-600'
            },
            review: {
                icon: MessageCircle,
                color: 'pink',
                bgColor: 'bg-pink-50',
                borderColor: 'border-pink-200',
                iconColor: 'text-pink-600'
            }
        }
        return config[type]
    }

    const formatTimeAgo = (timestamp: Date) => {
        const now = new Date()
        const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000)

        if (diffInSeconds < 60) return 'Just now'
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
        return timestamp.toLocaleDateString()
    }

    const getActivityBadge = (type: Activity['type']) => {
        const badges = {
            property: 'Property',
            user: 'User',
            district: 'Location',
            view: 'Analytics',
            review: 'Review'
        }
        return badges[type]
    }

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 animate-pulse">
                            <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                            <div className="space-y-2 flex-1">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                        <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                        <p className="text-sm text-gray-500">Latest platform interactions</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{activities.length}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        Active Today
                    </div>
                </div>
            </div>

            {/* Activities List */}
            <div className="space-y-3">
                {activities.map((activity) => {
                    const config = getActivityConfig(activity.type)
                    const Icon = config.icon

                    return (
                        <div
                            key={activity.id}
                            className={`p-4 rounded-lg border ${config.bgColor} ${config.borderColor} hover:shadow-md transition-all duration-200 group cursor-pointer`}
                        >
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className={`p-2 rounded-lg ${config.bgColor} border ${config.borderColor} group-hover:scale-110 transition-transform duration-200`}>
                                    <Icon className={`h-5 w-5 ${config.iconColor}`} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.iconColor} border ${config.borderColor}`}>
                                            {getActivityBadge(activity.type)}
                                        </span>
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {formatTimeAgo(activity.timestamp)}
                                        </span>
                                    </div>

                                    <h4 className="font-semibold text-gray-900 text-sm mb-1">
                                        {activity.title}
                                    </h4>

                                    <p className="text-gray-600 text-sm mb-2">
                                        {activity.description}
                                    </p>

                                    {/* Additional Info */}
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        {activity.user && (
                                            <span>By {activity.user}</span>
                                        )}
                                        {activity.data && (
                                            <div className="flex items-center gap-4">
                                                {activity.data.price && (
                                                    <span className="font-medium text-green-600">
                                                        ${activity.data.price.toLocaleString()}
                                                    </span>
                                                )}
                                                {activity.data.rating && (
                                                    <span className="flex items-center gap-1">
                                                        ⭐ {activity.data.rating}
                                                    </span>
                                                )}
                                                {activity.data.views && (
                                                    <span className="flex items-center gap-1">
                                                        <Eye className="h-3 w-3" /> {activity.data.views}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last updated: {new Date().toLocaleTimeString()}</span>
                    <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                        View All Activity
                        <TrendingUp className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}