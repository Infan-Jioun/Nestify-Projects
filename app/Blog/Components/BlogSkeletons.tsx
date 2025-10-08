import { Card, CardContent } from "@/components/ui/card";

export const BlogCardSkeleton = () => (
  <Card className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse hover:shadow-lg transition-all duration-300">
    <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300"></div>
    <CardContent className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-3 bg-gray-200 rounded-full w-20"></div>
        <div className="h-3 bg-gray-200 rounded-full w-16"></div>
      </div>
      <div className="h-5 bg-gray-200 rounded-full mb-3"></div>
      <div className="h-4 bg-gray-200 rounded-full mb-4 w-3/4"></div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="h-3 bg-gray-200 rounded-full w-16"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded-full w-24"></div>
      </div>
    </CardContent>
  </Card>
);

export const FeaturedPostSkeleton = () => (
  <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 border border-green-100 rounded-3xl p-8 animate-pulse">
    <div className="grid lg:grid-cols-2 gap-10 items-center">
      <div className="h-80 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl"></div>
      <div className="space-y-5">
        <div className="h-4 bg-gray-200 rounded-full w-32"></div>
        <div className="h-8 bg-gray-200 rounded-full w-full"></div>
        <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
        <div className="h-12 bg-gray-200 rounded-full w-40"></div>
      </div>
    </div>
  </div>
);