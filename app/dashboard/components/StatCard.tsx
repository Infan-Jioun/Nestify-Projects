import { LucideIcon, TrendingUp } from "lucide-react"
import Link from "next/link"

interface StatCardProps {
    title: string
    value: number | string
    growth?: number
    avg?: string | number
    status?: string
    icon: LucideIcon
    color: "green" | "purple" | "orange"
}

export default function StatCard({ title, value, growth, avg, status, icon: Icon, color }: StatCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <Link href={"/SeeAllDistrict"}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500">{title}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
                        {growth && (
                            <div className="flex items-center gap-1 mt-2">
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-500 font-medium">+{growth}%</span>
                                <span className="text-sm text-gray-500">from last month</span>
                            </div>
                        )}
                        {avg && <p className="text-sm text-gray-500 mt-2">Avg: {avg} properties/district</p>}
                        {status && <p className="text-sm text-green-500 font-medium mt-2">{status}</p>}
                    </div>
                    <div className={`p-3 bg-${color}-50 rounded-lg`}>
                        <Icon className={`h-6 w-6 text-${color}-500`} />
                    </div>
                </div>
            </Link>
        </div>
    )
}
