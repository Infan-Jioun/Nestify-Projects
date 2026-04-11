
import { useState } from "react";
import { Toast, ToastType } from "./types";

export const useToast = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (type: ToastType, title: string, message: string) => {
        const id = crypto.randomUUID();
        setToasts((prev) => [...prev, { id, type, title, message }]);
        setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4500);
    };

    const removeToast = (id: string) =>
        setToasts((prev) => prev.filter((t) => t.id !== id));

    return { toasts, showToast, removeToast };
};