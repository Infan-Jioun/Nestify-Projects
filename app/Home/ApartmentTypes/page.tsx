"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const apartmentData = [
  {
    title: "Apartments",
    subtitle: "20 Properties",
    image: "https://i.ibb.co/pj35Qbjb/image-1.webp",
  },
  {
    title: "Office",
    subtitle: "34 Properties",
    image: "https://i.ibb.co/ks6vMKY3/Image-2.webp",
  },
  {
    title: "Villa",
    subtitle: "42 Properties",
    image: "https://i.ibb.co/mF08HD2T/Image-3.webp",
  },
  {
    title: "House",
    subtitle: "18 Properties",
    image: "https://i.ibb.co/YBGd2FkP/Image-4.webp",
  },
  {
    title: "Apartments",
    subtitle: "52 Properties",
    image: "https://i.ibb.co/xS82zC52/Image-5.webp",
  },
  {
    title: "Apartments",
    subtitle: "14 Properties",
    image: "https://i.ibb.co/xS82zC52/Image-5.webp",
  },
];

export default function ApartmentTypes() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="mt-16 px-4 md:px-4 lg:px-44">
      {/* Title Section */}
<div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-3">
  {/* Title Section */}
  <div>
    <h2 className="text-xl text-center sm:text-left font-bold mb-1">
      Explore Apartment Types
    </h2>
    <p className="text-gray-500 text-center sm:text-left">
      Aliquam lacinia diam quis lacus euismod
    </p>
  </div>

  {/* Arrows + Pagination */}
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
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        onInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        spaceBetween={20}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="pb-10"
      >
        {apartmentData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300">
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={300}
                className="w-full h-48 transition-transform duration-300 group-hover:scale-110"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Styles */}
      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #ccc;
          border-radius: 9999px;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: #000;
        }
      `}</style>
    </div>
  );
}
