"use client";
import React, { useEffect } from "react";
import logo from '../../public/image/logo.png'
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { setLoading } from "../features/loader/loaderSlice";
export default function DisplayLoader({ children, }: {
    children?: React.ReactNode;
}) {
    // const [loading, setLoading] = useState(true);
    const dispatch = useDispatch<AppDispatch>()
    const loading = useSelector((state: RootState) => state.loader.loading)
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setLoading(false));
        }, 1500);
        return () => clearTimeout(timer);
    }, [dispatch]);

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
