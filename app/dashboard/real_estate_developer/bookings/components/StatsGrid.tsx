import { BookingStats } from '@/app/Types/Booking';
import { Calendar, Clock4, CheckCircle, XCircle } from 'lucide-react'


interface StatsGridProps {
    stats: BookingStats
}

interface StatCardProps {
    title: string;
    value: number;
    color: string;
    icon: React.ReactNode;
}

function StatCard({ title, value, color, icon }: StatCardProps) {
    const getColorClasses = (): string => {
        switch (color) {
            case 'yellow': return 'bg-yellow-500';
            case 'blue': return 'bg-blue-500';
            case 'green': return 'bg-green-500';
            case 'red': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    <p className="text-sm text-gray-600 mt-1">{title}</p>
                </div>
                <div className={`p-2 rounded-lg ${getColorClasses()} text-white`}>
                    {icon}
                </div>
            </div>
        </div>
    )
}

export default function StatsGrid({ stats }: StatsGridProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <StatCard
                title="Total"
                value={stats.total}
                color="gray"
                icon={<Calendar className="w-4 h-4 sm:w-5 sm:h-5" />}
            />
            <StatCard
                title="Pending"
                value={stats.pending}
                color="yellow"
                icon={<Clock4 className="w-4 h-4 sm:w-5 sm:h-5" />}
            />
            <StatCard
                title="Confirmed"
                value={stats.confirmed}
                color="blue"
                icon={<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />}
            />
            <StatCard
                title="Completed"
                value={stats.completed}
                color="green"
                icon={<CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />}
            />
            <StatCard
                title="Cancelled"
                value={stats.cancelled}
                color="red"
                icon={<XCircle className="w-4 h-4 sm:w-5 sm:h-5" />}
            />
        </div>
    )
}