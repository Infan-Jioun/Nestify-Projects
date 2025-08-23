"use client"
import { Provider } from 'react-redux'
import React from 'react'
import { store } from '../../lib/store';
type Props = {
    children?: React.ReactNode
}
export default function Providers({ children }: Props) {
    return <Provider store={store}>{children}</Provider>
}
