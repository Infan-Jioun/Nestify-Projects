import { PropertyType } from "@/app/Types/properties";
import { DistrictInfo } from "@/lib/districtInfo";
import { TrendingUp, MapPin, BarChart3 } from "lucide-react";
import Link from "next/link";

type Props = {
    districts: DistrictInfo[];
    properties: PropertyType[];
    totalProperties: number;
}

export default function PropertiesDistribution({ districts, properties, totalProperties }: Props) {
    const getDistrictPropertyCount = (districtName: string) => {
        if (!Array.isArray(properties)) return 0;
        return properties.filter((property) => {
            const propertyLocation = (property.geoCountryLocation || "").toString().toLowerCase();
            const districtNameLower = districtName.toLowerCase();
            return propertyLocation.includes(districtNameLower);
        }).length;
    }

    const districtsWithData = districts.map(district => ({
        ...district,
        propertyCount: getDistrictPropertyCount(district.districtName)
    }))
        .sort((a, b) => b.propertyCount - a.propertyCount)
        .slice(0, 6);

    const topDistrict = districtsWithData[0];
    const totalInTopDistricts = districtsWithData.reduce((sum, district) => sum + district.propertyCount, 0);

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 hover:shadow-xl transition-all duration-300 w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                        <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">Properties by District</h3>
                        <p className="text-xs sm:text-sm text-gray-500">Distribution across locations</p>
                    </div>
                </div>
                <div className="text-left sm:text-right">
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{totalProperties}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-green-500" />
                        Total Properties
                    </div>
                </div>
            </div>

            {/* Top District Highlight */}
            {topDistrict && topDistrict.propertyCount > 0 && (
                <div className="mb-6 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                            </div>
                            <Link
                                href={`/DetailsDistrict/${topDistrict.districtName}`}
                                className="text-base sm:text-lg font-semibold text-gray-900 hover:underline line-clamp-1"
                            >
                                {topDistrict.districtName}
                            </Link>
                        </div>
                        <div className="text-left sm:text-right">
                            <div className="text-xl sm:text-2xl font-bold text-green-600">{topDistrict.propertyCount}</div>
                            <div className="text-sm text-green-600 font-medium">
                                {((topDistrict.propertyCount / totalProperties) * 100).toFixed(1)}%
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Distribution List */}
            <div className="space-y-3 sm:space-y-4">
                {districtsWithData.map((district, index) => {
                    const percentage = totalProperties > 0 ? (district.propertyCount / totalProperties) * 100 : 0;
                    const rankColors = [
                        "from-yellow-400 to-amber-500",
                        "from-gray-400 to-gray-600",
                        "from-orange-400 to-orange-500",
                        "from-green-400 to-green-500",
                        "from-blue-400 to-blue-500",
                        "from-purple-400 to-purple-500"
                    ];

                    return (
                        <div key={district.id || index} className="group hover:bg-gray-50 rounded-lg p-2 sm:p-3 transition-all duration-200">
                            <div className="flex items-center justify-between gap-2 sm:gap-4">
                                <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                                    {/* Rank Badge */}
                                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r ${rankColors[index]} flex items-center justify-center flex-shrink-0`}>
                                        <span className="text-white text-xs sm:text-sm font-bold">{index + 1}</span>
                                    </div>

                                    {/* District Info */}
                                    <Link
                                        href={`/DetailsDistrict/${district.districtName}`}
                                        className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mb-1">
                                                <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                                                    {district.districtName}
                                                </h4>
                                                {index < 3 && (
                                                    <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium ${index === 0 ? "bg-yellow-100 text-yellow-800" :
                                                        index === 1 ? "bg-gray-100 text-gray-800" :
                                                            "bg-orange-100 text-orange-800"
                                                        } self-start sm:self-auto`}>
                                                        {index === 0 ? "Top" : index === 1 ? "2nd" : "3rd"}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                                                <div
                                                    className="h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000 ease-out"
                                                    style={{ width: `${Math.min(100, percentage)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                {/* Count and Percentage */}
                                <div className="text-right flex-shrink-0 ml-2">
                                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1">
                                        <span className="text-base sm:text-lg font-bold text-gray-900">
                                            {district.propertyCount}
                                        </span>
                                        <span className="text-xs text-gray-500 hidden sm:inline">properties</span>
                                        <span className="text-xs text-gray-500 sm:hidden">prop</span>
                                    </div>
                                    <div className="text-xs sm:text-sm font-medium text-green-600">
                                        {percentage.toFixed(1)}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Footer Stats */}
            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm">
                    <div className="text-center p-2 sm:p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg sm:text-2xl font-bold text-gray-900">{districtsWithData.length}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Districts Covered</div>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
                        <div className="text-lg sm:text-2xl font-bold text-green-600">{totalInTopDistricts}</div>
                        <div className="text-xs sm:text-sm text-green-600">Properties in Top Districts</div>
                    </div>
                </div>

                {/* Coverage Indicator */}
                <div className="mt-4 flex flex-col sm:flex-row sm:gap-3 sm:items-center sm:justify-between text-sm">
                    <span className="text-gray-600 text-sm mb-1 sm:mb-0">Coverage Rate</span>
                    <div className="flex items-center gap-2">
                        <div className="text-green-900 font-bold text-base sm:text-lg">
                            {totalProperties > 0 ? ((totalInTopDistricts / totalProperties) * 100).toFixed(1) : 0}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}