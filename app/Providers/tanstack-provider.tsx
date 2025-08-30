"use client"

import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
type TanstackProviderProps = {
    children: React.ReactNode
}
export default function tanstackProvider({ children }: TanstackProviderProps) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>
    )


}
