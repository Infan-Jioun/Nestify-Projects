import { CheckCircle, XCircle, Clock4 } from 'lucide-react'
import React from 'react'

export const getStatusColor = (status: string): string => {
    switch (status) {
        case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
        case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200'
        case 'completed': return 'bg-green-100 text-green-800 border-green-200'
        case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
        default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
}

// Component হিসেবে পরিবর্তন করুন
export const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
        case 'pending': 
            return React.createElement(Clock4, { className: "w-4 h-4" })
        case 'confirmed': 
            return React.createElement(CheckCircle, { className: "w-4 h-4" })
        case 'completed': 
            return React.createElement(CheckCircle, { className: "w-4 h-4" })
        case 'cancelled': 
            return React.createElement(XCircle, { className: "w-4 h-4" })
        default: 
            return React.createElement(Clock4, { className: "w-4 h-4" })
    }
}

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

export const formatTime = (timeString: string): string => {
    return timeString
}