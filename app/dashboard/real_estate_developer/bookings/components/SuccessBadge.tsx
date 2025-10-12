import { cn } from "@/lib/utils"

interface SuccessBadgeProps {
    children: React.ReactNode
    className?: string
}

export const SuccessBadge = ({ children, className }: SuccessBadgeProps) => {
    return (
        <span className={cn(
            "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200",
            className
        )}>
            {children}
        </span>
    )
}