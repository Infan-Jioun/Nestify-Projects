"use client";

import { AlertTriangle, CheckCircle, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    confirmLabel: string;
    onConfirm: () => void;
    loading?: boolean;
    variant?: "danger" | "default";
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open, onOpenChange, title, description,
    confirmLabel, onConfirm, loading, variant = "danger",
}) => (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-sm rounded-2xl border-0 shadow-2xl">
            <DialogHeader className="text-center">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 ${variant === "danger" ? "bg-rose-100" : "bg-green-100"}`}>
                    {variant === "danger"
                        ? <AlertTriangle className="h-7 w-7 text-rose-600" />
                        : <CheckCircle className="h-7 w-7 text-green-600" />
                    }
                </div>
                <DialogTitle className="text-xl font-bold text-gray-900">{title}</DialogTitle>
                <DialogDescription className="text-gray-600 leading-relaxed">{description}</DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-3 mt-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    disabled={loading}
                    className="flex-1 rounded-xl border-2 h-11"
                >
                    Keep It
                </Button>
                <Button
                    onClick={onConfirm}
                    disabled={loading}
                    className={`flex-1 rounded-xl h-11 font-semibold ${variant === "danger"
                        ? "bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 shadow-lg shadow-rose-500/25"
                        : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                        }`}
                >
                    {loading
                        ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Cancelling...</>
                        : <><Trash2 className="h-4 w-4 mr-2" />{confirmLabel}</>
                    }
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);