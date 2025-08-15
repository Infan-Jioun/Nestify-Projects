"use client";
import  { useEffect } from 'react'

export default function usePageTitle(title: string) {
    useEffect(() => {
        if (title) {
            document.title = title;
        }
    }, [title])
    return
}
