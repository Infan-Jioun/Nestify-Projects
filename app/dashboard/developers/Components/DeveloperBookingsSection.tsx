
"use client";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface Booking {
  _id: string;
  propertyId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userMobile: string;
  bookingDate: string;
  bookingTime: string;
  message: string;
  propertyDetails: {
    title: string;
    email: string;
    address: string;
    price: number;
    currency: string;
    images: string[];
    status: string;
    listingStatus: string;
    contact: string;
  };
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

interface DeveloperBookingsSectionProps {
  developerId: string;
}

export function DeveloperBookingsSection({ developerId }: DeveloperBookingsSectionProps) {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeveloperBookings = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/bookings/developer/${developerId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        
        const data = await response.json();
        setBookings(data.bookings || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    if (developerId) {
      fetchDeveloperBookings();
    }
  }, [developerId]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h3>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Bookings ({bookings.length})</h3>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">{"No bookings found for this developer's properties."}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {booking.propertyDetails.title}
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>
                      <strong>Client:</strong> {booking.userName}
                    </div>
                    <div>
                      <strong>Email:</strong> {booking.userEmail}
                    </div>
                    <div>
                      <strong>Phone:</strong> {booking.userMobile}
                    </div>
                    <div>
                      <strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()} at {booking.bookingTime}
                    </div>
                  </div>
                  
                  {booking.message && (
                    <div className="mt-2">
                      <strong className="text-sm">Message:</strong>
                      <p className="text-sm text-gray-600 mt-1">{booking.message}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    booking.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800'
                      : booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                  
                  <span className="text-xs text-gray-500">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}