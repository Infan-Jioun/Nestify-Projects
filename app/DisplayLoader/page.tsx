"use client";

import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import logo from '../../public/image/logo.png'
import Image from "next/image";
export default function DisplayLoader({ children, }: {
    children?: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white">
                {/* <Loader className="animate-spin  text-green-500" width={50} height={50} /> */}
                <Image src={logo} alt="logo" width={250} height={250} className="animate-pulse" />

            </div>
        );
    }

    return <>{children}</>;
}
