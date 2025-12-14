import React from 'react'
import { Save, Loader2 } from 'lucide-react'

interface ModalFooterProps {
    onCancel: () => void
    onSubmit: () => void
    isLoading: boolean
    hasChanges: boolean
    saveLabel?: string
    cancelLabel?: string
}

const ModalFooter: React.FC<ModalFooterProps> = ({
    onCancel,
    onSubmit,
    isLoading,
    hasChanges,
    saveLabel = 'Save Changes',
    cancelLabel = 'Cancel'
}) => {
    return (
        <div className="flex items-center justify-end gap-2 sm:gap-3 p-4 sm:p-6 border-t bg-muted/50">
            <button
                type="button"
                onClick={onCancel}
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 sm:h-10 px-3 sm:px-4 py-2"
            >
                {cancelLabel}
            </button>
            <button
                type="submit"
                disabled={isLoading || !hasChanges}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 sm:h-10 px-3 sm:px-4 py-2 gap-2"
            >
                {isLoading ? (
                    <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                ) : (
                    <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                )}
                {isLoading ? 'Saving...' : saveLabel}
            </button>
        </div>
    )
}

export default ModalFooter