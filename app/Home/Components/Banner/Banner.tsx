"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { setSkletonLoader } from "@/app/features/loader/loaderSlice";

export default function Banner() {
  const dispatch = useDispatch<AppDispatch>();
  // const skletonLoader = useSelector((state: RootState) => state.loader.skletonLoader);
  const [imageLoaded, setImageLoaded] = useState(false);
 const  [isLoading , setIsLoading] = useState(true);
  // useEffect(() => {

  //   dispatch(setSkletonLoader(true));
  // }, [dispatch]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setIsLoading(false);
  };

  return (
    <div className="px-4 mx-auto drop-shadow-2xl lg:px-15 relative mt-5">

      {isLoading && (
        <div className="rounded-xl lg:rounded-3xl bg-gray-200 animate-pulse h-[300px] md:h-[700px] lg:h-[700px] w-full"></div>
      )}


      <Image
        width={1200}
        height={500}
        className={`rounded-xl lg:rounded-3xl shadow w-full ${isLoading ? "hidden" : "block"
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
           setIsLoading(false); 
        }}
        priority
      />
    </div>
  );
}