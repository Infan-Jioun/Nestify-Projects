import { Home } from "lucide-react";

interface BookingHeaderProps {
  isAutoFilled?: boolean;
  currentUser?: { name?: string | null; email?: string | null };
  isPropertySold?: boolean;
}

export const BookingHeader = ({ isAutoFilled, currentUser, isPropertySold }: BookingHeaderProps) => {
  return (
    <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 p-6 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative">
        <div className="flex items-center gap-3 text-white text-xl">
          <div className="bg-white/20 p-2 rounded-xl">
            <Home className="h-5 w-5" />
          </div>
          <div>
            <div>
              {isPropertySold ? "Property Sold" : "Schedule Visit"}
            </div>
            <div className="text-sm font-normal text-green-100">
              {isPropertySold
                ? "This property is no longer available"
                : "Book your property viewing"
              }
            </div>
          </div>
        </div>

        {isAutoFilled && currentUser && !isPropertySold && (
          <div className="flex items-center gap-2 mt-3 text-green-200 text-xs bg-white/10 p-2 rounded-lg">
            <span>Form auto-filled with your profile</span>
          </div>
        )}

        {isPropertySold && (
          <div className="flex items-center gap-2 mt-3 text-red-200 text-xs bg-red-500/20 p-2 rounded-lg border border-red-300/30">
            <span>⚠️ This property has been sold</span>
          </div>
        )}
      </div>
    </div>
  );
};