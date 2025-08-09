"use client";

import Link from "next/link";
import React, { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

export default function PropertiesByCity() {
  const cards = [
    {
      title: "California",
      image: "https://i.ibb.co/F4XYDNvz/California.webp",
      propertiesLength: 12,
    },
    {
      title: "Los Angeles",
      image: "https://i.ibb.co/5hcvzpPm/Los-Angeles.webp",
      propertiesLength: 15,
    },
    {
      title: "Manhattan",
      image: "https://i.ibb.co/MkzM5jnT/Manhattan.webp",
      propertiesLength: 13,
    },
    {
      title: "New Jersey",
      image: "https://i.ibb.co/jk3CsKPX/New-Jersey.webp",
      propertiesLength: 14,
    },
    {
      title: "San Diego",
      image: "https://i.ibb.co/rG6r2PQF/San-Diego.webp",
      propertiesLength: 12,
    },
    {
      title: "San Francisco",
      image: "https://i.ibb.co/h1BhqZ3G/San-Francisco.webp",
      propertiesLength: 10,
    },
  ];

  const [ , setLoadedImages] = useState({});

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="mt-20 px-4 md:px-4 lg:px-44">
      {/* Heading Section */}
      <section className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-3">
        <div className="text-center sm:text-left">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-black">
            Properties by Cities
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-medium mt-1">
            Aliquam lacinia diam quis lacus euismod
          </p>
        </div>
        <div>
          <Link href="/seeAllCities">
            <p className="flex items-center gap-1 text-[14px] hover:text-green-600 font-semibold">
              See All Cities <GoArrowUpRight size={16} />
            </p>
          </Link>
        </div>
      </section>

      {/* Swiper Cards Section */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-screen-xl mx-auto"
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          // navigation={true}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 2 },
            480: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
            1280 : {slidesPerView : 4},
            
          }}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index} className="flex justify-center items-center ">
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.90 }}
                className="w-[160px] sm:w-[220px] md:w-[230px] bg-white  rounded-2xl  px-2 md:px-3 lg:px-4   transition-all duration-300"
              >
                <Image
                  src={card.image}
                  alt={card.title || "Property"}
                  onLoad={() => handleImageLoad(index)}
                  width={400} height={400}
                  className="rounded-full w-full  object-cover transition-opacity duration-700"
                />
                <h3 className="text-lg text-center font-semibold r mt-4 text-black">
                  {card.title}
                </h3>
                <p className="text-sm text-center  text-gray-600 mt-1">
                  {card.propertiesLength} <span>Properties</span>
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
}
