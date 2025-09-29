import { Home, Users, MapPin } from "lucide-react"

export default function RecentActivity() {
    return (
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
    )
}
