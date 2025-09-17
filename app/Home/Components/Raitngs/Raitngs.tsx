"use client";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setSkletonLoader } from "@/app/features/loader/loaderSlice";
import { RootState } from "@/lib/store";

const testimonialsData = [
  {
    quote:
      "Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn't on our original designs.",
    rating: 5,
    author: {
      name: "Leslie Alexander",
      company: "Nintendo",
      image: "https://i.ibb.co/GfbdnZdP/image-1.webp",
    },
  },
  {
    quote:
      "Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn't on our original designs.",
    rating: 3,
    author: {
      name: "Floyd Miles",
      company: "Bank of America",
      image: "https://i.ibb.co/xqRtcKvP/image-3.webp",
    },
  },
  {
    quote:
      "Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn't on our original designs.",
    rating: 4,
    author: {
      name: "Leslie Alexander",
      company: "Nintendo",
      image: "https://i.ibb.co/GfbdnZdP/image-1.webp",
    },
  },
  {
    quote:
      "Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn't on our original designs.",
    rating: 5,
    author: {
      name: "Floyd Miles",
      company: "Bank of America",
      image: "https://i.ibb.co/xqRtcKvP/image-3.webp",
    },
  },
  {
    quote:
      "Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn't on our original designs.",
    rating: 4,
    author: {
      name: "Leslie Alexander",
      company: "Nintendo",
      image: "https://i.ibb.co/GfbdnZdP/image-1.webp",
    },
  },
];

export default function Ratings() {
  const dispatch = useDispatch();
  const skletonLoader = useSelector((state: RootState) => state.loader.skletonLoader);
  const [loading, setLoading] = useState(true);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);


  useEffect(() => {
    dispatch(setSkletonLoader(true));
    setLoading(true);
    
    const timer = setTimeout(() => {
      setLoading(false);
      dispatch(setSkletonLoader(false));
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [dispatch]);

  
  const TestimonialSkeleton = () => (
    <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
      {/* Quote Icon Skeleton */}
      <div className="absolute top-6 right-6 w-8 h-8 bg-gray-200 rounded-full"></div>
      
      {/* Feedback Skeleton */}
      <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
      <div className="h-3 bg-gray-200 rounded mb-1 w-full"></div>
      <div className="h-3 bg-gray-200 rounded mb-1 w-full"></div>
      <div className="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
      
      {/* Rating Skeleton */}
      <div className="flex mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-200 rounded mr-1"></div>
        ))}
      </div>
      
      {/* Author Skeleton */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded mb-1 w-2/3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-20 px-4 lg:px-44">
   
      <div className="flex flex-col sm:flex-row justify-between items-center px-5 mb-8 gap-3">
  
        <div>
          {loading || skletonLoader ? (
            <>
              <div className="h-7 bg-gray-200 rounded animate-pulse w-64 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
            </>
          ) : (
            <>
              <h2 className="text-xl text-center sm:text-left font-bold mb-1">
                People Love Living with Realton
              </h2>
              <p className="text-gray-500 text-center sm:text-left">
                Aliquam lacinia diam quis lacus euismod
              </p>
            </>
          )}
        </div>

        {!loading && !skletonLoader && (
          <div className="flex justify-center items-center gap-4">
            <button
              ref={prevRef}
              className="text-black hover:text-green-500 text-xl transition"
            >
              <GoArrowLeft />
            </button>
            <div className="custom-pagination flex gap-2" />
            <button
              ref={nextRef}
              className="text-black hover:text-green-500 text-xl transition"
            >
              <GoArrowRight />
            </button>
          </div>
        )}
      </div>

      {/* Swiper Section */}
      {loading || skletonLoader ? (
        // Skeleton loader grid
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <TestimonialSkeleton key={index} />
          ))}
        </div>
      ) : (
        // Actual swiper with data
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            if (swiper.params.navigation) {
              // @ts-expect-error navigation element type mismatch fixed manually
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-expect-error navigation element type mismatch fixed manually
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {testimonialsData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 relative">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-5xl text-gray-200 font-serif font-bold">
                  “
                </div>
                {/* Feedback */}
                <h3 className="text-sm font-bold mb-2">Great Work</h3>
                <p className="text-sm text-gray-600 mb-4">{item.quote}</p>
                {/* Rating */}
                <div className="flex mb-4">
                  {Array.from({ length: item.rating }, (_, i) => (
                    <FaStar key={i} className="text-yellow-400 w-4 h-4 mr-1" />
                  ))}
                </div>
                {/* Author */}
                <div className="flex items-center gap-4">
                  <Image
                    src={item.author.image}
                    alt={item.author.name}
                    width={48}
                    height={48}
                    className="rounded-full w-12 h-12 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-sm">{item.author.name}</h4>
                    <p className="text-xs text-gray-500">
                      {item.author.company}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}