import React from 'react'
import { Home, X } from 'lucide-react'

interface ModalHeaderProps {
    title: string
    hasChanges: boolean
    onClose: () => void
    isLoading: boolean
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
    title,
    hasChanges,
    onClose,
    isLoading
}) => {
    return (
        <div className="flex items-center justify-between p-4 sm:p-6 border-b bg-muted/50">
            <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-lg">
                    <Home className="w-3 h-3 sm:w-4 sm:h-4 text-primary-foreground" />
                </div>
                <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-foreground">{title}</h2>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                        {hasChanges ? 'You have unsaved changes' : 'All changes saved'}
                    </p>
                </div>
            </div>
            <button
                onClick={onClose}
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none p-1"
                disabled={isLoading}
            >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="sr-only">Close</span>
            </button>
        </div>
    )
}

export default ModalHeader