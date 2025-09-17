"use client";
import React, { useEffect } from "react";
import { GoArrowUpRight, GoHome, GoChecklist } from "react-icons/go";
import { PiCurrencyDollar } from "react-icons/pi";
import CountUp from "./CountUp";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { setSkletonLoader } from "@/app/features/loader/loaderSlice";
import { RootState } from "@/lib/store"
export default function BannerService() {
  const dispatch = useDispatch();
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
      <div
        className="bg-gray-200 rounded-xl lg:rounded-3xl shadow-lg px-6 lg:px-10 py-6 lg:py-6 mt-5"
      >
        <div className="flex flex-col lg:flex-row justify-between items-center px-0 md:px-0 lg:px- md:h-[500px] lg:h-[700px] gap-10">
          {/* Left Content */}
          <div className="flex-1 space-y-7 mt-5">
            {loading || skletonLoader ? (
              // Skeleton for heading
              <div className="h-10 bg-gray-300 rounded-lg animate-pulse w-3/4"></div>
            ) : (
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800">
                Let s find the right selling option for you
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
                  <h4 className="font-semibold text-lg">Mortgage Services</h4>
                  <p className="text-gray-600 text-sm">
                    Nullam sollicitudin blandit eros eu pretium. <br />
                    Nullam maximus ultricies auctor.
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
                  <h4 className="font-semibold text-lg">Property Listing</h4>
                  <p className="text-gray-600 text-sm">
                    Nullam sollicitudin blandit eros eu pretium. <br />
                    Nullam maximus ultricies auctor.
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
                  <h4 className="font-semibold text-lg">Currency Services</h4>
                  <p className="text-gray-600 text-sm">
                    Nullam sollicitudin blandit eros eu pretium. <br />
                    Nullam maximus ultricies auctor.
                  </p>
                </div>
              </div>
            )}

            {/* Button */}
            {loading || skletonLoader ? (
              <div className="mt-4 inline-flex items-center gap-2 bg-gray-300 text-white px-5 py-2 rounded-full animate-pulse ml-0 lg:ml-16 mb-5 w-40 h-10"></div>
            ) : (
              <button className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition ml-0 lg:ml-16 mb-5">
                Learn More <GoArrowUpRight size={16} />
              </button>
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
                alt="manImage"
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
              <>
                <div className="h-8 bg-gray-300 rounded animate-pulse w-16 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-32 mx-auto"></div>
              </>
            ) : (
              <>
                <CountUp
                  from={0}
                  to={400}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text text-xl lg:text-2xl font-bold"
                />
                <p className="text-[9px] lg:text-xl">Stores around the world</p>
              </>
            )}
          </div>

          {/* Stat 2 */}
          <div className="text-center">
            {loading || skletonLoader ? (
              <>
                <div className="h-8 bg-gray-300 rounded animate-pulse w-20 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-32 mx-auto"></div>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center">
                  <CountUp
                    from={0}
                    to={200}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text text-xl lg:text-2xl font-bold"
                  />
                  <p className="text-xl lg:text-2xl font-bold">+</p>
                </div>
                <p className="text-[9px] lg:text-xl">Stores around the world</p>
              </>
            )}
          </div>

          {/* Stat 3 */}
          <div className="text-center">
            {loading || skletonLoader ? (
              <>
                <div className="h-8 bg-gray-300 rounded animate-pulse w-16 mx-auto mb-2"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-32 mx-auto"></div>
              </>
            ) : (
              <>
                <div className="flex justify-center items-center">
                  <CountUp
                    from={0}
                    to={10}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text text-xl lg:text-2xl font-bold"
                  />
                  <p className="text-xl lg:text-2xl font-bold">K</p>
                </div>
                <p className="text-[9px] lg:text-xl">Stores around the world</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}