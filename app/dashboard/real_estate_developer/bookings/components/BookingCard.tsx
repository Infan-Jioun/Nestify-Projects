import { useState } from 'react'
import {
    Calendar,
    Clock,
    User,
    Phone,
    Mail,
    MapPin,
    DollarSign,
    Eye,
    Edit,
    Loader2
} from 'lucide-react'
import { Booking } from '@/app/Types/Booking'
import { getStatusColor, formatDate, formatTime } from '../utils/bookingHelpers'
import { StatusIcon } from './StatusIcon'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface BookingCardProps {
    booking: Booking;
    onViewDetails: () => void;
    onUpdateStatus: (bookingId: string, status: string) => void;
    updating: boolean;
}

const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'confirmed', label: 'Confirmed', color: 'blue' },
    { value: 'completed', label: 'Completed', color: 'green' },
    { value: 'cancelled', label: 'Cancelled', color: 'red' }
]

export default function BookingCard({
    booking,
    onViewDetails,
    onUpdateStatus,
    updating
}: BookingCardProps) {
    const handleStatusChange = async (newStatus: string) => {
        await onUpdateStatus(booking._id, newStatus)
    }

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'pending': return 'secondary'
            case 'confirmed': return 'default'
            case 'completed': return 'default'
            case 'cancelled': return 'destructive'
            default: return 'secondary'
        }
    }

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100'
            default: return ''
        }
    }

    // Get user initials for avatar
    const getUserInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    // Get short status text for mobile
    const getShortStatus = (status: string) => {
        switch (status) {
            case 'pending': return 'Pend'
            case 'confirmed': return 'Conf'
            case 'completed': return 'Comp'
            case 'cancelled': return 'Canc'
            default: return status.substring(0, 4)
        }
    }

    return (
        <Card className="hover:shadow-md transition-all duration-200 border-l-2 sm:border-l-4 border-l-green-500">
            <CardContent className="p-4 sm:p-6">
                {/* Mobile Layout - Stacked */}
                <div className="block lg:hidden space-y-4">
                    {/* Header Section */}
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                            <Avatar className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg border flex-shrink-0">
                                {booking.propertyDetails.images && booking.propertyDetails.images.length > 0 ? (
                                    <AvatarImage
                                        src={booking.propertyDetails.images[0]}
                                        alt={booking.propertyDetails.title}
                                        className="object-cover"
                                    />
                                ) : null}
                                <AvatarFallback className="rounded-lg bg-muted">
                                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm sm:text-base mb-1 line-clamp-2">
                                    {booking.propertyDetails.title}
                                </h3>

                                <div className="flex items-center text-muted-foreground text-xs sm:text-sm mb-2">
                                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                                    <span className="truncate">{booking.propertyDetails.address}</span>
                                </div>

                                <div className="flex flex-wrap gap-1 sm:gap-2">
                                    <Badge variant="outline" className="gap-1 text-xs">
                                        <DollarSign className="w-2 h-2 sm:w-3 sm:h-3" />
                                        {booking.propertyDetails.price.toLocaleString()} {booking.propertyDetails.currency}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Status Dropdown - Mobile */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={updating}
                                    className="gap-1 h-6 w-6 p-0 flex-shrink-0"
                                >
                                    {updating ? (
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                    ) : (
                                        <StatusIcon status={booking.status} />
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-36">
                                {statusOptions.map((option) => (
                                    <DropdownMenuItem
                                        key={option.value}
                                        onClick={() => handleStatusChange(option.value)}
                                        className="flex items-center gap-2 cursor-pointer text-xs"
                                    >
                                        <div className={`w-2 h-2 rounded-full bg-${option.color}-500`} />
                                        {option.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Client Info - Mobile */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                        {getUserInitials(booking.userName)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-0.5">
                                    <p className="text-xs sm:text-sm font-medium leading-none">{booking.userName}</p>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Mail className="w-2 h-2 sm:w-3 sm:h-3" />
                                        <span className="truncate">{booking.userEmail}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                                <span className="font-medium truncate">{formatDate(booking.bookingDate)}</span>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="truncate">{formatTime(booking.bookingTime)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Button - Mobile */}
                    <div className="flex justify-between items-center gap-2">
                        <Badge
                            variant={getStatusVariant(booking.status)}
                            className={`gap-1 ${getStatusBadgeClass(booking.status)} text-xs`}
                        >
                            <StatusIcon status={booking.status} />
                            {getShortStatus(booking.status)}
                        </Badge>

                        <Button
                            onClick={onViewDetails}
                            className="gap-1 sm:gap-2 text-xs sm:text-sm"
                            size="sm"
                        >
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="hidden xs:inline">Details</span>
                            <span className="xs:hidden">View</span>
                        </Button>
                    </div>
                </div>

                {/* Desktop Layout - Horizontal */}
                <div className="hidden lg:flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
                    {/* Property Info */}
                    <div className="flex-1">
                        <div className="flex items-start gap-4">
                            <Avatar className="w-14 h-14 xl:w-16 xl:h-16 rounded-lg border flex-shrink-0">
                                {booking.propertyDetails.images && booking.propertyDetails.images.length > 0 ? (
                                    <AvatarImage
                                        src={booking.propertyDetails.images[0]}
                                        alt={booking.propertyDetails.title}
                                        className="object-cover"
                                    />
                                ) : null}
                                <AvatarFallback className="rounded-lg bg-muted">
                                    <MapPin className="w-5 h-5 xl:w-6 xl:h-6 text-muted-foreground" />
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-base xl:text-lg mb-2 line-clamp-1">
                                    {booking.propertyDetails.title}
                                </h3>

                                <div className="flex items-center text-muted-foreground text-sm xl:text-base mb-3">
                                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                                    <span className="truncate">{booking.propertyDetails.address}</span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="outline" className="gap-1">
                                        <DollarSign className="w-3 h-3" />
                                        {booking.propertyDetails.price.toLocaleString()} {booking.propertyDetails.currency}
                                    </Badge>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={updating}
                                                className="gap-1 h-6 xl:h-7"
                                            >
                                                {updating ? (
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                ) : (
                                                    <StatusIcon status={booking.status} />
                                                )}
                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                <Edit className="w-3 h-3" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start" className="w-40">
                                            {statusOptions.map((option) => (
                                                <DropdownMenuItem
                                                    key={option.value}
                                                    onClick={() => handleStatusChange(option.value)}
                                                    className="flex items-center gap-2 cursor-pointer"
                                                >
                                                    <div className={`w-2 h-2 rounded-full bg-${option.color}-500`} />
                                                    {option.label}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Client & Booking Info */}
                    <div className="flex flex-col sm:flex-row xl:flex-col 2xl:flex-row gap-4 xl:gap-3 2xl:gap-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                        {getUserInitials(booking.userName)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">{booking.userName}</p>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Mail className="w-3 h-3" />
                                        <span className="max-w-[120px] 2xl:max-w-none truncate">{booking.userEmail}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Phone className="w-3 h-3" />
                                        <span>{booking.userMobile}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span className="font-medium">{formatDate(booking.bookingDate)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span>{formatTime(booking.bookingTime)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={onViewDetails}
                            className="gap-2"
                            size="sm"
                        >
                            <Eye className="w-4 h-4" />
                            View Details
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}