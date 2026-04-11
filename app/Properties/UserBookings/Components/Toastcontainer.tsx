
"use client";

import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Toast, ToastType } from "./types";

const toastConfig: Record<ToastType, { bg: string; icon: React.ReactNode; border: string }> = {
    success: {
        bg: "from-emerald-50 to-green-50",
        border: "border-emerald-200",
        icon: <CheckCircle className="h-5 w-5 text-emerald-600" />,
    },
    error: {
        bg: "from-rose-50 to-red-50",
        border: "border-rose-200",
        icon: <X className="h-5 w-5 text-rose-600" />,
    },
    warning: {
        bg: "from-amber-50 to-yellow-50",
        border: "border-amber-200",
        icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
    },
    info: {
        bg: "from-sky-50 to-blue-50",
        border: "border-sky-200",
        icon: <Info className="h-5 w-5 text-sky-600" />,
    },
};

interface ToastContainerProps {
    toasts: Toast[];
    onRemove: (id: string) => void;
}

export const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => (
    <div className="fixed bottom-6 right-4 sm:right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => {
            const cfg = toastConfig[toast.type];
            return (
                <div
                    key={toast.id}
                    className={`
                        pointer-events-auto flex items-start gap-3 w-80 sm:w-96
                        bg-gradient-to-br ${cfg.bg} border-2 ${cfg.border}
                        rounded-2xl shadow-2xl p-4
                        animate-[slideInRight_0.35s_cubic-bezier(0.34,1.56,0.64,1)]
                    `}
                    style={{ animationFillMode: "both" }}
                >
                    <div className="flex-shrink-0 mt-0.5">{cfg.icon}</div>
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 text-sm">{toast.title}</p>
                        <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">{toast.message}</p>
                    </div>
                    <button
                        onClick={() => onRemove(toast.id)}
                        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            );
        })}

        <style>{`
            @keyframes slideInRight {
                from { opacity: 0; transform: translateX(100%) scale(0.9); }
                to   { opacity: 1; transform: translateX(0) scale(1); }
            }
        `}</style>
    </div>
);