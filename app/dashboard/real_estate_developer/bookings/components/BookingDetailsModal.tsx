import { XCircle, Loader2 } from 'lucide-react'
import { Booking } from '@/app/Types/Booking'
import { getStatusColor, formatDate, formatTime } from '../utils/bookingHelpers'
import { StatusIcon } from './StatusIcon'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface BookingDetailsModalProps {
    booking: Booking;
    onClose: () => void;
    onUpdateStatus: (bookingId: string, status: string) => void;
    updating: boolean;
}

const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'confirmed', label: 'Confirmed', color: 'blue' },
    { value: 'completed', label: 'Completed', color: 'green' },
    { value: 'cancelled', label: 'Cancelled', color: 'red' }
]

export default function BookingDetailsModal({
    booking,
    onClose,
    onUpdateStatus,
    updating
}: BookingDetailsModalProps) {
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
            case 'completed': return 'bg-green-100 text-green-800 border-green-200'
            default: return ''
        }
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="
                max-w-[95vw] 
                sm:max-w-[90vw] 
                md:max-w-2xl 
                lg:max-w-3xl 
                xl:max-w-4xl
                max-h-[95vh]
                sm:max-h-[90vh]
                overflow-y-auto
                p-4
                sm:p-6
            ">
                <DialogHeader className="px-1 sm:px-0">
                    <DialogTitle className="text-lg sm:text-xl font-semibold">
                        Booking Details
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 sm:space-y-6">
                    {/* Property Information */}
                    <Card className="border-0 sm:border">
                        <CardHeader className="pb-3 sm:pb-6 px-4 sm:px-6">
                            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                                <span>Property Information</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 px-4 sm:px-6 pb-4 sm:pb-6">
                            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                                <div className="space-y-1 sm:space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                                        Property Title
                                    </label>
                                    <p className="text-xs sm:text-sm line-clamp-2">
                                        {booking.propertyDetails.title}
                                    </p>
                                </div>
                                <div className="space-y-1 sm:space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                                        Address
                                    </label>
                                    <p className="text-xs sm:text-sm line-clamp-2">
                                        {booking.propertyDetails.address}
                                    </p>
                                </div>
                                <div className="space-y-1 sm:space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                                        Price
                                    </label>
                                    <p className="text-xs sm:text-sm font-semibold">
                                        {booking.propertyDetails.price.toLocaleString()} {booking.propertyDetails.currency}
                                    </p>
                                </div>
                                <div className="space-y-1 sm:space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                                        Status
                                    </label>
                                    <div className="flex flex-col xs:flex-row xs:items-center gap-2">
                                        <Badge
                                            variant={getStatusVariant(booking.status)}
                                            className={`gap-1 w-fit ${getStatusBadgeClass(booking.status)} text-xs`}
                                        >
                                            <StatusIcon status={booking.status} />
                                            <span className="hidden xs:inline">
                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                            </span>
                                            <span className="xs:hidden">
                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).substring(0, 3)}
                                            </span>
                                        </Badge>

                                        <Select
                                            value={booking.status}
                                            onValueChange={handleStatusChange}
                                            disabled={updating}
                                        >
                                            <SelectTrigger className="w-full xs:w-32 h-7 sm:h-8 text-xs">
                                                {updating ? (
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                ) : (
                                                    <SelectValue placeholder="Change" />
                                                )}
                                            </SelectTrigger>
                                            <SelectContent className="text-xs">
                                                {statusOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                        className="text-xs"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-2 h-2 rounded-full bg-${option.color}-500`}></div>
                                                            {option.label}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Client Information */}
                    <Card className="border-0 sm:border">
                        <CardHeader className="pb-3 sm:pb-6 px-4 sm:px-6">
                            <CardTitle className="text-base sm:text-lg">
                                Client Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                                <div className="space-y-1 sm:space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                                        Full Name
                                    </label>
                                    <p className="text-xs sm:text-sm">
                                        {booking.userName}
                                    </p>
                                </div>
                                <div className="space-y-1 sm:space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                                        Email
                                    </label>
                                    <p className="text-xs sm:text-sm break-all">
                                        {booking.userEmail}
                                    </p>
                                </div>
                                <div className="space-y-1 sm:space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                                        Mobile
                                    </label>
                                    <p className="text-xs sm:text-sm">
                                        {booking.userMobile}
                                    </p>
                                </div>
                                <div className="space-y-1 sm:space-y-2">
                                    <label className="text-xs sm:text-sm font-medium text-muted-foreground">
                                        Booking Date & Time
                                    </label>
                                    <p className="text-xs sm:text-sm">
                                        {formatDate(booking.bookingDate)} at {formatTime(booking.bookingTime)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Client Message */}
                    {booking.message && (
                        <Card className="border-0 sm:border">
                            <CardHeader className="pb-3 sm:pb-6 px-4 sm:px-6">
                                <CardTitle className="text-base sm:text-lg">
                                    Client Message
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                                <div className="bg-muted/50 rounded-lg p-3 sm:p-4 max-h-32 sm:max-h-40 overflow-y-auto">
                                    <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">
                                        {booking.message}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Booking Timeline */}
                    <Card className="border-0 sm:border">
                        <CardHeader className="pb-3 sm:pb-6 px-4 sm:px-6">
                            <CardTitle className="text-base sm:text-lg">
                                Booking Timeline
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                            <div className="space-y-2 sm:space-y-3">
                                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1 xs:gap-2 py-1">
                                    <span className="text-xs sm:text-sm text-muted-foreground">Created:</span>
                                    <span className="text-xs sm:text-sm font-medium">{formatDate(booking.createdAt)}</span>
                                </div>
                                <Separator className="xs:hidden" />
                                <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-1 xs:gap-2 py-1">
                                    <span className="text-xs sm:text-sm text-muted-foreground">Last Updated:</span>
                                    <span className="text-xs sm:text-sm font-medium">{formatDate(booking.updatedAt)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col-reverse xs:flex-row justify-end gap-2 sm:gap-3 pt-4 sm:pt-6 px-1 sm:px-0">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="w-full xs:w-auto text-xs sm:text-sm h-8 sm:h-9"
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}