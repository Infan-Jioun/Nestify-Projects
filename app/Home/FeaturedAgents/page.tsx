"use client";
import React from "react";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";
import { BsCheckCircleFill } from "react-icons/bs";

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

export default function ExclusiveAgentsSection() {
  return (
   <div className="px-4 lg:px-20 mt-20">
     <section className=" px-10 py-16 flex flex-col lg:flex-row gap-10 items-center justify-between bg-gray-200 rounded-3xl">
      {/* Left - Agents List */}
      <div className="bg-white shadow p-6 rounded-xl w-full lg:w-1/3">
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
      </div>

      {/* Center - Highlighted Agent */}
      <div className="bg-white p-4 rounded-xl shadow text-center">
        <Image
          src="https://i.ibb.co/MxXCJjXb/graduate8.jpg"
          alt="Highlighted Agent"
          width={200}
          height={200}
          className="rounded-lg mx-auto"
        />
        <p className="mt-4 font-semibold">Marvin McKinney</p>
        <p className="text-sm text-gray-500">Designer</p>
      </div>

      {/* Right - Text Content */}
      <div className="w-full lg:w-1/3 space-y-6">
        <h2 className="text-2xl lg:text-3xl font-bold">
          Let’s find the right selling option for you
        </h2>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </p>
        <ul className="space-y-3">
          <li className="flex items-center gap-2">
            <BsCheckCircleFill className="text-green-600" />
            Find excellent deals
          </li>
          <li className="flex items-center gap-2">
            <BsCheckCircleFill className="text-green-600" />
            Friendly host & Fast support
          </li>
          <li className="flex items-center gap-2">
            <BsCheckCircleFill className="text-green-600" />
            List your own property
          </li>
        </ul>
        <button className="mt-4 px-6 py-2 bg-black text-white rounded-md inline-flex items-center gap-2">
          See More <GoArrowUpRight />
        </button>
      </div>
    </section>
   </div>
  );
}
