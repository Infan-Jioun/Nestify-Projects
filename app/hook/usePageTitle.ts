"use client";
import { useEffect } from "react";

export default function usePageTitle(title?: string) {
    useEffect(() => {
        if (!title) return;

        document.title = `${title} | Nestify`;
    }, [title]);
}