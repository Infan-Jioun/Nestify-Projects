"use client";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { setSkletonLoader } from "@/app/features/loader/loaderSlice";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";


const apartmentCategories = [
  {
    title: "Apartments",
    categoryName: "Apartment",
    image: "https://i.ibb.co/F4B27j7m/Apartment-3.jpg",
  },
  {
    title: "Office Space",
    categoryName: "Office Space",
    image: "https://i.ibb.co/XZY199mw/Image-1.jpg",
  },
  {
    title: "House",
    categoryName: "House",
    image: "https://i.ibb.co/n8Y1h3sZ/Bedrooms-4-Prompt-A-semi-furnished-modern-bedroom-with-a-double-bed-wardrobe-and-bedside-table-Cozy.jpg",
  },
  {
    title: "Duplex",
    categoryName: "Duplex",
    image: "https://i.ibb.co/VcMtQyjD/Image-1.jpg",
  },
  {
    title: "Land",
    categoryName: "Land",
    image: "https://i.ibb.co/W4p8pdvY/land-1.jpg",
  },
  {
    title: "Shop",
    categoryName: "Shop",
    image: "https://i.ibb.co/fmdmZCq/Image-2.jpg",
  },
  {
    title: "Warehouse",
    categoryName: "Warehouse",
    image: "https://i.ibb.co/fmdmZCq/Image-2.jpg",
  },
];

export default function ApartmentTypes() {
  const dispatch = useDispatch();
  const router = useRouter();
  const skletonLoader = useSelector((state: RootState) => state.loader.skletonLoader);
  const [loading, setLoading] = useState(true);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const { properties } = useSelector((state: RootState) => state.properties);

  // Function to count properties by category
  const getPropertiesCountByCategory = (categoryName: string) => {
    return properties.filter(property =>
      property.category?.name === categoryName
    ).length;
  };

  // Function to handle category click
  const handleCategoryClick = (categoryName: string) => {
    // Navigate to properties page with category filter
    router.push(`/Properties?category=${encodeURIComponent(categoryName)}`);
  };

  // Create apartment data with dynamic counts
  const apartmentData = apartmentCategories.map(category => ({
    ...category,
    subtitle: `${getPropertiesCountByCategory(category.categoryName)} Properties`,
    count: getPropertiesCountByCategory(category.categoryName)
  })).filter(item => item.count > 0); // Only show categories that have properties

  useEffect(() => {
    dispatch(setSkletonLoader(true));
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
      dispatch(setSkletonLoader(false));
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch, properties]);

  const SkeletonSlide = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow">
      <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
      </div>
    </div>
  );

  return (
    <div className="mt-20 px-4 md:px-4 lg:px-44">
      {/* Title Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-3">
        <div>
          {loading || skletonLoader ? (
            <>
              <div className="h-7 bg-gray-200 rounded animate-pulse w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-64"></div>
            </>
          ) : (
            <>
              <h2 className="text-xl text-center sm:text-left font-bold mb-1">
                Explore Property Types
              </h2>
              <p className="text-gray-500 text-center sm:text-left">
                {"Find apartments, houses, and commercial spaces that match your lifestyle."}
              </p>
            </>
          )}
        </div>

        {/* Arrows + Pagination */}
        {!loading && !skletonLoader && apartmentData.length > 0 && (
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
        // Skeleton loader for the swiper
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-10">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonSlide key={index} />
          ))}
        </div>
      ) : apartmentData.length === 0 ? (
        // Show message when no properties found
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No property categories available</p>
        </div>
      ) : (
        // Actual swiper with data
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
            // TypeScript-safe check for navigation params
            if (swiper.params.navigation) {
              // @ts-expect-error Navigation object is being assigned manually
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-expect-error Navigation object is being assigned manually
              swiper.params.navigation.nextEl = nextRef.current;
            }
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
              <div
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300 group cursor-pointer"
                onClick={() => handleCategoryClick(item.categoryName)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={500}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
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
      )}

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