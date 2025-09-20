"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { setSkletonLoader } from "@/app/features/loader/loaderSlice";

export default function Banner() {
  const dispatch = useDispatch<AppDispatch>();
  const skletonLoader = useSelector((state: RootState) => state.loader.skletonLoader);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
 
    dispatch(setSkletonLoader(true));
  }, [dispatch]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    dispatch(setSkletonLoader(false));
  };

  return (
    <div className="px-4 mx-auto drop-shadow-2xl lg:px-15 relative mt-5">

      {skletonLoader && (
        <div className="rounded-xl lg:rounded-3xl bg-gray-200 animate-pulse h-[300px] md:h-[400px] lg:h-[500px] w-full"></div>
      )}


      <Image
        width={2000}
        height={500}
        className={`rounded-xl lg:rounded-3xl shadow w-full ${skletonLoader ? "hidden" : "block"
          }`}
        style={{
          height: "auto",
          objectFit: "cover"
        }}
        src="https://i.ibb.co/dv68RMc/White-Classy-and-Refined-Real-Estate-Banner-1.png"
        alt="bannerImage"
        onLoad={handleImageLoad}
        onError={() => {
          setImageLoaded(true);
          dispatch(setSkletonLoader(false));
        }}
        priority
      />
    </div>
  );
}