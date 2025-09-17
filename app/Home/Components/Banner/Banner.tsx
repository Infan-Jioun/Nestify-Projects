"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { setSkletonLoader } from "@/app/features/loader/loaderSlice";

export default function Banner() {
  const dispatch = useDispatch<AppDispatch>();
  const skletonLoader = useSelector((state: RootState) => state.loader.skletonLoader);

  useEffect(() => {
 
    dispatch(setSkletonLoader(true));
  }, [dispatch]);

  return (
    <div className="px-4 mx-auto drop-shadow-2xl lg:px-15 relative">
      {skletonLoader && (
        <Skeleton
          height={500} 
          className="rounded-xl lg:rounded-3xl"
        />
      )}
      <Image
        width={2000}
        height={500}
        className={`rounded-xl lg:rounded-3xl shadow ${
          skletonLoader ? "hidden" : "block"
        }`}
        src="https://i.ibb.co/dv68RMc/White-Classy-and-Refined-Real-Estate-Banner-1.png"
        alt="bannerImage"
        onLoadingComplete={() => dispatch(setSkletonLoader(false))}
      />
    </div>
  );
}
