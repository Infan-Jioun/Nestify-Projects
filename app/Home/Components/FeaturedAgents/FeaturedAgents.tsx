"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";
import { setSkletonLoader } from "@/app/features/loader/loaderSlice";
import type { RootState } from "@/lib/store";

const agents = [
  {
    name: "Marvin McKinney",
    role: "Designer",
    image: "https://i.ibb.co/GfbdnZdP/image-1.webp",
  },
  {
    name: "Ralph Edwards",
    role: "Designer",
    image: "https://i.ibb.co/PZNY4g89/image-2.webp",
  },
  {
    name: "Annette Black",
    role: "Designer",
    image: "https://i.ibb.co/xqRtcKvP/image-3.webp",
  },
];

export default function FeaturedAgents() {
  const dispatch = useDispatch();
  const skletonLoader = useSelector((state: RootState) => state.loader.skletonLoader);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(setSkletonLoader(true));
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
      dispatch(setSkletonLoader(false));
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="px-4 lg:px-20 mt-20">
      <section className="px-10 py-16 flex flex-col lg:flex-row gap-10 items-center justify-between bg-gray-200 rounded-3xl">
        {/* Left - Agents List */}
        <div className="bg-white shadow p-6 rounded-xl w-full lg:w-1/3">
          {loading || skletonLoader ? (
            <>
              <div className="h-7 bg-gray-200 rounded animate-pulse w-40 mb-4"></div>
              <ul className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <li key={item} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 rounded animate-pulse w-32 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h3 className="text-[20px] font-semibold mb-4">
                <span className="text-green-600">3+</span> Exclusive Agents
              </h3>
              <ul className="space-y-4">
                {agents.map((agent, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-gray-500">{agent.role}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Center - Highlighted Agent */}
        <div className="bg-white p-4 rounded-xl shadow text-center">
          {loading || skletonLoader ? (
            <>
              <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse mt-4 mx-auto w-36"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mt-2 mx-auto w-24"></div>
            </>
          ) : (
            <>
              <Image
                src="https://i.ibb.co/MxXCJjXb/graduate8.jpg"
                alt="Highlighted Agent"
                width={200}
                height={200}
                className="rounded-lg mx-auto"
              />
              <p className="mt-4 font-semibold">Marvin McKinney</p>
              <p className="text-sm text-gray-500">Designer</p>
            </>
          )}
        </div>

        {/* Right - Text Content */}
        <div className="w-full lg:w-1/3 space-y-6">
          {loading || skletonLoader ? (
            <>
              <div className="h-8 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <ul className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                  </li>
                ))}
              </ul>
              <div className="h-10 bg-gray-200 rounded animate-pulse w-32"></div>
            </>
          ) : (
            <>
              <h2 className="text-2xl lg:text-3xl font-bold">
                Let's find the right selling option for you
              </h2>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  {/* <BsCheckCircleFill className="text-green-600" /> */}
                  Find excellent deals
                </li>
                <li className="flex items-center gap-2">
                  {/* <BsCheckCircleFill className="text-green-600" /> */}
                  Friendly host & Fast support
                </li>
                <li className="flex items-center gap-2">
                  {/* <BsCheckCircleFill className="text-green-600" /> */}
                  List your own property
                </li>
              </ul>
              <button className="mt-4 px-6 py-2 bg-black text-white rounded-md inline-flex items-center gap-2">
                See More 
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
