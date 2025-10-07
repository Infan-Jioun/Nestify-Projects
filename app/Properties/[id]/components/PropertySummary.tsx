"use client";

import { MapPin, Home, Star } from "lucide-react";

// Lightweight type for property summary
interface PropertySummaryType {
  _id?: string;
  title: string;
  address: string;
  price: number;
  currency: string;
  images?: string[];
}

interface PropertySummaryProps {
  property: PropertySummaryType;
}

const PropertySummary = ({ property }: PropertySummaryProps) => {
  return (
    <div className="p-4 sm:p-6 sm:pb-4">
      <div className="bg-gradient-to-r from-gray-50 to-green-50 p-4 rounded-xl border border-green-100">
        <div className="flex items-start gap-3 sm:gap-4">
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
              <Home className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
              {property.title}
            </h3>
            <div className="flex items-start gap-1 mt-1 text-xs text-gray-600">
              <MapPin className="h-3 w-3 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-2">{property.address}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-green-600 font-bold text-sm">
                {property.currency} {property.price.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                <span>4.8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySummary;
