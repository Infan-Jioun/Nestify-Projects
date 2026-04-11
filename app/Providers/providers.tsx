"use client"
import { Provider } from 'react-redux'

import { AppStore, makeStore } from '../../lib/store';
import { useRef } from 'react';

type Props = {
    children?: React.ReactNode
}

export default function Providers({ children }: Props) {
    const storeRef = useRef<AppStore | null>(null);

    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return (
        <Provider store={storeRef.current}>
            {children}
        </Provider>
    );
}