import { CheckCircle, XCircle, Clock4 } from 'lucide-react'
import React from 'react'

interface StatusIconProps {
    status: string
    className?: string
}

export const StatusIcon = ({ status, className = "w-4 h-4" }: StatusIconProps) => {
    switch (status) {
        case 'pending':
            return <Clock4 className={className} />
        case 'confirmed':
            return <CheckCircle className={className} />
        case 'completed':
            return <CheckCircle className={className} />
        case 'cancelled':
            return <XCircle className={className} />
        default:
            return <Clock4 className={className} />
    }
}

export default StatusIcon