"use client";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { setSkletonLoader } from "@/app/features/loader/loaderSlice";
import { RootState } from "@/lib/store";
import Link from "next/link";

interface ApartmentCategory {
  title: string;
  categoryName: string;
  image: string;
}

interface ApartmentCategoryWithCount extends ApartmentCategory {
  subtitle: string;
  count: number;
}

interface Property {
  category?: {
    name: string;
  };
}

const apartmentCategories: ApartmentCategory[] = [
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
  const skletonLoader = useSelector(
    (state: RootState) => state.loader.skletonLoader
  );
  const [loading, setLoading] = useState<boolean>(true);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperInitialized, setSwiperInitialized] = useState<boolean>(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const { properties } = useSelector((state: RootState) => state.properties);

  const getPropertiesCountByCategory = (categoryName: string): number => {
    return properties.filter(
      (property: Property) => property.category?.name === categoryName
    ).length;
  };

  const apartmentData: ApartmentCategoryWithCount[] = apartmentCategories.map((category) => ({
    ...category,
    subtitle: `${getPropertiesCountByCategory(
      category.categoryName
    )} Properties`,
    count: getPropertiesCountByCategory(category.categoryName)
  }));

  const filteredApartmentData: ApartmentCategoryWithCount[] = apartmentData.filter(item => item.count > 0);

  useEffect(() => {
    dispatch(setSkletonLoader(true));
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
      dispatch(setSkletonLoader(false));
      setSwiperInitialized(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch, properties]);

  const SkeletonSlide: React.FC = () => (
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
                Find apartments, houses, and commercial spaces that match your lifestyle.
              </p>
            </>
          )}
        </div>

        {/* Arrows + Pagination */}
        {!loading && !skletonLoader && filteredApartmentData.length > 0 && (
          <div className="flex justify-center items-center gap-4">
            <button
              ref={prevRef}
              className="text-black hover:text-green-500 text-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={filteredApartmentData.length <= 1}
            >
              <GoArrowLeft />
            </button>
            <div className="custom-pagination flex gap-2"></div>
            <button
              ref={nextRef}
              className="text-black hover:text-green-500 text-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={filteredApartmentData.length <= 1}
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
      ) : filteredApartmentData.length === 0 ? (
        // No properties message
        <div className="text-center py-10">
          <p className="text-gray-500">No properties available in any category.</p>
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
            renderBullet: function (index: number, className: string) {
              return `<span class="${className} bg-gray-300 w-2 h-2 rounded-full transition-all duration-300"></span>`;
            },
          }}
          onInit={(swiper: SwiperType) => {
            swiperRef.current = swiper;
            setSwiperInitialized(true);
            // Update navigation after init
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          onSwiper={(swiper: SwiperType) => {
            swiperRef.current = swiper;
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
          {filteredApartmentData.map((item: ApartmentCategoryWithCount, index: number) => (
            <SwiperSlide key={index}>
              <Link
                href={`/category/${encodeURIComponent(item.categoryName)}`}
                className="block"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300 group cursor-pointer h-full">
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {item.count}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Custom Pagination Styles */}
      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          border-radius: 50%;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: #000;
          width: 20px;
          border-radius: 4px;
        }
        
        /* Swiper navigation styles */
        .swiper-button-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}