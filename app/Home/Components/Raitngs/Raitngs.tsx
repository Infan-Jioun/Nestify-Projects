"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { FaStar } from "react-icons/fa";

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

export default function Raitngs() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className="mt-20 px-4 lg:px-44">
      {/* Testimonial Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-5 mb-8 gap-3">
        {/* Title Section */}
        <div>
          <h2 className="text-xl text-center sm:text-left font-bold mb-1">
            People Love Living with Realton
          </h2>
          <p className="text-gray-500 text-center sm:text-left">
            Aliquam lacinia diam quis lacus euismod
          </p>
        </div>

        {/* Arrows */}
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
      </div>

      {/* Swiper Section */}
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
    </div>
  );
}
