"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSkletonLoader } from "@/app/features/loader/loaderSlice";
import { RootState } from "@/lib/store";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";

type City = {
  id: number;
  title: string;
  image: string;
  propertiesLength: number;
};

const PropertiesByCity: React.FC = () => {
  const dispatch = useDispatch();
  const skletonLoader = useSelector((state: RootState) => state.loader.skletonLoader);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const mockCities: City[] = [
    { id: 1, title: "California", image: "https://i.ibb.co/F4XYDNvz/California.webp", propertiesLength: 12 },
    { id: 2, title: "Los Angeles", image: "https://i.ibb.co/5hcvzpPm/Los-Angeles.webp", propertiesLength: 15 },
    { id: 3, title: "Manhattan", image: "https://i.ibb.co/MkzM5jnT/Manhattan.webp", propertiesLength: 13 },
    { id: 4, title: "New Jersey", image: "https://i.ibb.co/jk3CsKPX/New-Jersey.webp", propertiesLength: 14 },
    { id: 5, title: "San Diego", image: "https://i.ibb.co/rG6r2PQF/San-Diego.webp", propertiesLength: 12 },
    { id: 6, title: "San Francisco", image: "https://i.ibb.co/h1BhqZ3G/San-Francisco.webp", propertiesLength: 10 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setSkletonLoader(true));
      setLoading(true);
   
      await new Promise(resolve => setTimeout(resolve, 1500));

      setCities(mockCities);
      setLoading(false);
      dispatch(setSkletonLoader(false));
    };

    fetchData();

    // Check if device is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, [dispatch]);

  const isLoading = loading || skletonLoader;


  const renderSkeletonLoaders = () => {
    if (isMobile) {
  
      return Array.from({ length: 2 }).map((_, index) => (
        <SwiperSlide key={index}>
          <div className="flex flex-col items-center">
            <div className="animate-pulse">
              <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2 mx-auto w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
            </div>
          </div>
        </SwiperSlide>
      ));
    } else {
   
      return Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="animate-pulse">
            <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-6 bg-gray-200 rounded mb-2 mx-auto w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
          </div>
        </div>
      ));
    }
  };

  
  const renderContent = () => {
    if (isLoading) {
      if (isMobile) {
        return (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={2}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="w-full"
          >
            {renderSkeletonLoaders()}
          </Swiper>
        );
      } else {
        return renderSkeletonLoaders();
      }
    }

    if (isMobile) {
      return (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="w-full"
        >
          {cities.map(city => (
            <SwiperSlide key={city.id}>
              <div className="flex flex-col items-center group">
                <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-full shadow-md group-hover:shadow-lg transition-shadow">
                  <Image
                    src={city.image}
                    alt={city.title}
                    width={50} height={50}
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{city.title}</h3>
                  <p className="text-gray-600">{city.propertiesLength} Properties</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      );
    }

    return cities.map(city => (
      <div key={city.id} className="flex flex-col items-center group">
        <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-full shadow-md group-hover:shadow-lg transition-shadow">
          <img
            src={city.image}
            alt={city.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg text-gray-900 mb-1">{city.title}</h3>
          <p className="text-gray-600">{city.propertiesLength} Properties</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
 
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div className="text-center md:text-left mb-6 md:mb-0">
          {isLoading ? (
            <>
              <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-gray-900">Properties by Cities</h2>
              <p className="text-gray-600 mt-2">Aliquam lacinia diam quis lacus euismod</p>
            </>
          )}
        </div>
        
        {!isLoading && (
          <button className="flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors">
            See All Cities
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        )}
      </div>

      <div className={`${isMobile ? '' : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8'}`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default PropertiesByCity;