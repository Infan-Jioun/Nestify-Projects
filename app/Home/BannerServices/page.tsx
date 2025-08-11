"use client";
import React from "react";
import { GoArrowUpRight, GoHome, GoChecklist } from "react-icons/go";
import { PiCurrencyDollar } from "react-icons/pi";
import CountUp from "./CountUp";
import Image from "next/image";


export default function BannerService() {




    return (
        <div className="px-4 md:px-0 lg:px-20 mt-20 border-b-2 border-gray-400">
            {/* Top Section */}
            <div
                className="bg-gray-200 rounded-xl lg:rounded-3xl shadow-lg px-6 lg:px-10 py-6 lg:py-10 mt-5 "

            >
                <div className="flex flex-col lg:flex-row justify-between items-center px-0 md:px-0 lg:px- md:h-[500px] lg:h-[700px] gap-10">
                    {/* Left Content */}
                    <div className="flex-1 space-y-7 mt-5">
                        <h2 className="text-xl md:text-2xl lg:text-3xl x font-semibold text-gray-800">
                        Let’s find the right selling option for you
                        </h2>

                        {/* Service Card 1 */}
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

                        {/* Service Card 2 */}
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

                        {/* Service Card 3 */}
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

                        {/* Button */}
                        <button className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition ml-0 lg:ml-16 mb-5">
                            Learn More <GoArrowUpRight size={16} />
                        </button>
                    </div>

                    {/* Right Image */}
                    <div className="hidden xl:flex  ">
                        <Image
                            width={500}
                            height={777}
                            className=" rounded-xl object-cover"
                            src="https://i.ibb.co/2YZJYYy0/man-holding-little-house.png"
                            alt="manImage"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Stats */}
            <div className="mb-5">
                <div className="flex justify-around items-center mt-20">
                    {/* Stat 1 */}
                    <div className="text-center">
                        <CountUp
                            from={0}
                            to={400}
                            separator=","
                            direction="up"
                            duration={1}
                            className="count-up-text text-xl lg:text-2xl font-bold"
                        />
                        <p className="text-[9px] lg:text-xl">Stores around the world</p>
                    </div>

                    {/* Stat 2 */}
                    <div className="text-center">
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
                    </div>

                    {/* Stat 3 */}
                    <div className="text-center">
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
                    </div>
                </div>
            </div>
        </div>
    );
}  