"use client";

import Image from "next/image";
import { useState } from "react";
import { FiHeart, FiPlus, FiShare } from "react-icons/fi";

const tabs = ["House", "Villa", "Office", "Apartments"];
const properties = [
  {
    id: 1,
    type: "House",
    title: "Luxury villa in Rego Park",
    location: "Los Angeles City, CA, USA",
    price: "$823,000",
    image: "https://i.ibb.co/r281PQmD/Image-1.webp",
  },
  {
    id: 2,
    type: "House",
    title: "Luxury villa in Rego Park",
    location: "Los Angeles City, CA, USA",
    price: "$82,000",
    image: "https://i.ibb.co/MkTJrWvd/image-4.webp",
  },
  {
    id: 3,
    type: "House",
    title: "Luxury villa in Rego Park",
    location: "Los Angeles City, CA, USA",
    price: "$82,000",
    image: "https://i.ibb.co/wmtFPZh/image-5.webp",
  },
  {
    id: 4,
    type: "Office",
    title: "Equestrian Family Home",
    location: "Texas City, CA, USA",
    price: "$14,000",
    image: "https://i.ibb.co/vCF8pdrR/Image-2.webp",
  },
  {
    id: 5,
    type: "House",
    title: "Luxury villa in Rego Park",
    location: "Los Angeles City, CA, USA",
    price: "$82,000",
    image: "https://i.ibb.co/MkTJrWvd/image-4.webp",
  },
  {
    id: 6,
    type: "Apartments",
    title: "Equestrian Family Home",
    location: "Texas City, CA, USA",
    price: "$14,000",
    image: "https://i.ibb.co/r281PQmD/Image-1.webp",
  },
  {
    id: 7,
    type: "Apartments",
    title: "Equestrian Family Home",
    location: "Texas City, CA, USA",
    price: "$14,000",
    image: "https://i.ibb.co/r281PQmD/Image-1.webp",
  },
  {
    id: 8,
    type: "Villa",
    title: "Luxury villa in Rego Park",
    location: "New Jersey City, CA, USA",
    price: "$82,000",
    image: "https://i.ibb.co/Pv5hj6rP/Image-3.webp",
  },
  {
    id: 9,
    type: "House",
    title: "Luxury villa in Rego Park",
    location: "Los Angeles City, CA, USA",
    price: "$12,000",
    image: "https://i.ibb.co/MkTJrWvd/image-4.webp",
  },
 
];

export default function PropertiesTab() {
  const [activeTab, setActiveTab] = useState("House");

  const filteredProperties = properties.filter(
    (p) => p.type === activeTab
  );

  return (
    <div className="mt-20 px-4 md:px-20 lg:px-44">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl text-center sm:text-left font-bold mb-1">Discover Popular Properties</h2>
          <p className="text-gray-500 text-center sm:text-left">Aliquam lacinia diam quis lacus euismod</p>
        </div>
        <div className="flex space-x-3 px-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-2 rounded-md border ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="relative overflow-hidden group rounded-xl shadow border"
          >
            {/* Image */}
            <Image
              src={property.image}
              alt={property.title}
              width={500}
              height={500}
              className="  transition-transform duration-300 group-hover:scale-110"
            />

            {/* Top Right Icons */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <button className="bg-white p-2 rounded-full shadow hover:bg-red-100">
                <FiHeart className="text-xl text-green-500" />
              </button>
              <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                <FiPlus className="text-xl text-green-500" />
              </button>
              <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                <FiShare className="text-xl text-green-500" />
              </button>
            </div>

            {/* Bottom Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-sm px-4 py-3 z-10 flex justify-between items-center text-white">
              <div>
                <h3 className="font-semibold">{property.title}</h3>
                <p className="text-sm">{property.location}</p>
              </div>
              <div className="bg-white text-black font-semibold px-3 py-1 rounded-2xl hover:bg-black hover:text-white transition">
                {property.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
