"use client";
import React, { useEffect } from "react";
import { GoArrowUpRight, GoHome, GoChecklist } from "react-icons/go";
import { PiCurrencyDollar } from "react-icons/pi";
import CountUp from "./CountUp";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { setSkletonLoader } from "@/app/features/loader/loaderSlice";
import { RootState } from "@/lib/store";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BannerService() {
  const dispatch = useDispatch();
  const { district: districts } = useSelector((state: RootState) => state.district);
  const { properties } = useSelector(
    (state: RootState) => state.properties
  );
  const skletonLoader = useSelector((state: RootState) => state.loader.skletonLoader);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    dispatch(setSkletonLoader(true));

    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      dispatch(setSkletonLoader(false));
    }, 1500);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="px-4 md:px-0 lg:px-20 mt-20 border-b-2 border-gray-400">
      {/* Top Section */}
      <div className="bg-gray-200 rounded-xl lg:rounded-3xl shadow-lg px-6 lg:px-10 py-6 mt-5">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">

          {/* Left Content */}
          <div className="flex-1 space-y-7 mt-5">
            {loading || skletonLoader ? (
              <div className="h-10 bg-gray-300 rounded-lg animate-pulse w-3/4"></div>
            ) : (
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800">
                {"Find Your Dream Home Easily"}
              </h2>
            )}

            {/* Service Card 1 */}
            {loading || skletonLoader ? (
              <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow animate-pulse">
                <div className="w-7 h-7 bg-gray-300 rounded-full mt-1"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow">
                <div className="text-green-600 mt-1">
                  <GoHome size={28} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Property Listings</h4>
                  <p className="text-gray-600 text-sm">
                    Explore thousands of homes for sale and rent. <br />
                    Find the perfect property for your family.
                  </p>
                </div>
              </div>
            )}

            {/* Service Card 2 */}
            {loading || skletonLoader ? (
              <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow animate-pulse">
                <div className="w-7 h-7 bg-gray-300 rounded-full mt-1"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow">
                <div className="text-green-600 mt-1">
                  <GoChecklist size={28} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Mortgage Assistance</h4>
                  <p className="text-gray-600 text-sm">
                    Get help with home loans and financing options. <br />
                    Expert advice to make buying easy.
                  </p>
                </div>
              </div>
            )}

            {/* Service Card 3 */}
            {loading || skletonLoader ? (
              <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow animate-pulse">
                <div className="w-7 h-7 bg-gray-300 rounded-full mt-1"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow">
                <div className="text-green-600 mt-1">
                  <PiCurrencyDollar size={28} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Property Valuation</h4>
                  <p className="text-gray-600 text-sm">
                    Know the true value of your property. <br />
                    Accurate appraisals to make informed decisions.
                  </p>
                </div>
              </div>
            )}

            {/* Button */}
            {loading || skletonLoader ? (
              <div className="mt-4 inline-flex items-center gap-2  text-white px-5 py-2 rounded-full animate-pulse w-40 h-10"></div>
            ) : (
              <Link href="/Properties">
                <motion.button
                  whileHover={{ scale: 1.0 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn w-[250px] h-10 px-4 rounded-full bg-white text-black border border-gray-300 hover:text-green-500 transition"
                >
                  Explore More <GoArrowUpRight  />
                </motion.button>
              </Link>

            )}
          </div>

          {/* Right Image */}
          <div className="hidden xl:flex">
            {loading || skletonLoader ? (
              <div className="w-[500px] h-[600px] bg-gray-300 rounded-xl animate-pulse"></div>
            ) : (
              <Image
                width={500}
                height={1000}
                className="rounded-xl object-cover"
                src="https://i.ibb.co/2YZJYYy0/man-holding-little-house.png"
                alt="realEstateImage"
              />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="mb-5">
        <div className="flex justify-around items-center mt-20">
          {/* Stat 1 */}
          <div className="text-center">
            {loading || skletonLoader ? (
              <div className="h-8 bg-gray-300 rounded animate-pulse w-16 mx-auto mb-2"></div>
            ) : (
              <>
                <div className="flex items-center justify-center gap-1">
                  <CountUp from={0} to={properties.length} separator="," direction="up" duration={2} className="text-xl lg:text-2xl font-bold" />
                  <p className="text-[9px] lg:text-xl">+</p>
                </div>
                <p className="text-[9px] lg:text-xl">Properties Listed</p>
              </>
            )}
          </div>

          {/* Stat 2 */}
          <div className="text-center">
            {loading || skletonLoader ? (
              <div className="h-8 bg-gray-300 rounded animate-pulse w-20 mx-auto mb-2"></div>
            ) : (
              <>
                <CountUp from={0} to={800} separator="," direction="up" duration={1} className="text-xl lg:text-2xl font-bold" />
                <p className="text-[9px] lg:text-xl">Happy Clients</p>
              </>
            )}
          </div>

          {/* Stat 3 */}
          <div className="text-center">
            {loading || skletonLoader ? (
              <div className="h-8 bg-gray-300 rounded animate-pulse w-16 mx-auto mb-2"></div>
            ) : (
              <>
                <div className="flex items-center justify-center gap-1">
                  <CountUp from={0} to={districts.length} separator="," direction="up" duration={2} className="text-xl lg:text-2xl font-bold" />
                  <p className="text-[9px] lg:text-xl">+</p>
                </div>
                <p className="text-[9px] lg:text-xl">District Served</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
