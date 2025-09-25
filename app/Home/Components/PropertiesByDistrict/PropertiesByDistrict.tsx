"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { fetchProperties } from "@/app/features/Properties/propertySlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { DistrictInfo } from "@/lib/districtInfo";
import { fetchDistrict } from "@/app/features/district/districtSlice";

type DistrictCardProps = {
  district: DistrictInfo;
  count: number;
};

const DistrictCard: React.FC<DistrictCardProps> = ({ district, count }) => {
  const districtName = district.districtName || "";
  const districtImage =
    typeof district.districtImage === "string" ? district.districtImage : "";

  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-full shadow-md group-hover:shadow-lg transition-shadow">
        <Image
          src={districtImage}
          alt={districtName}
          width={800}
          height={800}
          className="object-cover w-32 h-32 transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-lg text-gray-900 mb-1">
          {districtName || "Unavailable district"}
        </h3>
        <p className="text-sm text-gray-600">{count} Properties</p>
      </div>
    </div>
  );
};

const PropertiesByDistrict: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { district: districtList, loading: districtLoading } = useSelector(
    (state: RootState) => state.district
  );
  const { properties, loading: propertiesLoading } = useSelector(
    (state: RootState) => state.properties
  );
  const skletonLoader = useSelector(
    (state: RootState) => state.loader.skletonLoader
  );

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    dispatch(fetchDistrict());
    dispatch(fetchProperties());

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const isLoading = districtLoading || skletonLoader || propertiesLoading;

  const propertyCountMap = useMemo(() => {
    const map: Record<string, number> = {};
    if (!properties || !Array.isArray(properties)) return map;

    properties.forEach((property) => {
      const location = (property.geoCountryLocation || "")
        .toString()
        .toLowerCase()
        .trim();

      (districtList || []).forEach((district) => {
        const districtName = district.districtName;
        if (!districtName) return;
        const districtNameLower = districtName.toLowerCase();
        if (location.includes(districtNameLower)) {
          map[districtNameLower] = (map[districtNameLower] || 0) + 1;
        }
      });
    });

    return map;
  }, [properties, districtList]);

  const renderSkeletonLoaders = () => {
    const count = isMobile ? 2 : 6;
    return Array.from({ length: count }).map((_, index) => (
      <div key={index} className="flex flex-col items-center animate-pulse">
        <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
        <div className="h-6 bg-gray-200 rounded mb-2 w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
    ));
  };

  const visibledistrict = (districtList || []).slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div className="text-center md:text-left mb-6 md:mb-0">
          {isLoading ? (
            <>
              <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
            </>
          ) : (
            <>
              <h2 className="text-xl text-center sm:text-left font-bold mb-1">
                Properties by district
              </h2>
              <p className="text-gray-600 mt-2">
                Aliquam lacinia diam quis lacus euismod
              </p>
            </>
          )}
        </div>

        {!isLoading && districtList?.length > 0 && (
          <Link href={"/SeeAllDistrict"}>
            <button className="flex items-center text-green-500 font-semibold hover:text-green-700 transition-colors">
              See All district <MdArrowOutward />
            </button>
          </Link>
        )}
      </div>

      {/* Content */}
      <div
        className={`${isMobile
          ? ""
          : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8"
          }`}
      >
        {isLoading ? (
          isMobile ? (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={2}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
            >
              {renderSkeletonLoaders().map((skeleton, i) => (
                <SwiperSlide key={i}>{skeleton}</SwiperSlide>
              ))}
            </Swiper>
          ) : (
            renderSkeletonLoaders()
          )
        ) : districtList?.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            Unavailable district
          </p>
        ) : isMobile ? (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={2}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
          >
            {visibledistrict.map((district) => {
              const districtName = district.districtName || "";
              return (
                <SwiperSlide key={districtName}>
                  <DistrictCard
                    district={district}
                    count={
                      propertyCountMap[districtName.toLowerCase()] || 0
                    }
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          visibledistrict.map((district) => {
            const districtName = district.districtName || "";
            return (
              <Link
                href={`/DetailsDistrict/${district.districtName}`}
                key={districtName}
              >
                <DistrictCard
                  district={district}
                  count={
                    propertyCountMap[districtName.toLowerCase()] || 0
                  }
                />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PropertiesByDistrict;
