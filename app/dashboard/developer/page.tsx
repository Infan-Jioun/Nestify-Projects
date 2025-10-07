"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/app/Types/user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Mail, Phone, MapPin, Building2, Eye, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function DevelopersListPage() {
  const router = useRouter();
  const [developers, setDevelopers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/developers');
        
        if (!response.ok) {
          throw new Error('Failed to fetch developers');
        }
        
        const data = await response.json();
        setDevelopers(data.developers || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load developers');
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  const filteredDevelopers = developers.filter(developer =>
    developer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    developer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    developer.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProfile = (developerId: string) => {
    router.push(`/dashboard/developers/${developerId}`);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              <p className="text-lg mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Real Estate Developers</h1>
          <p className="text-gray-600 mt-2">
            Manage and view all registered real estate developers
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {developers.length} Developers
        </Badge>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search developers by name, email, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Developers Grid */}
      {filteredDevelopers.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? 'No developers found' : 'No developers registered'}
            </h3>
            <p className="text-gray-600">
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'There are no real estate developers in the system yet.'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDevelopers.map((developer) => (
            <Card key={developer._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={developer.image || "/api/placeholder/40/40"}
                      alt={developer.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">{developer.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Badge variant="outline" className="text-xs">
                          Developer
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Contact Info */}
                <div className="space-y-2 text-sm">
                  {developer.email && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{developer.email}</span>
                    </div>
                  )}
                  
                  {developer.mobile && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{developer.mobile}</span>
                    </div>
                  )}
                  
                  {developer.location && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{developer.location}</span>
                    </div>
                  )}
                </div>

                {/* Bio */}
                {developer.bio && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {developer.bio}
                  </p>
                )}

                {/* Action Button */}
                <Button 
                  onClick={() => handleViewProfile(developer._id)}
                  className="w-full flex items-center gap-2"
                  variant="outline"
                >
                  <Eye className="w-4 h-4" />
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}