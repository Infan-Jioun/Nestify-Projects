"use client";

import Image from "next/image";
import { useState } from "react";
import { FiHeart, FiPlus, FiShare } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { FilterSidebar } from "../FilterSidebar/FilterSidebar";
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

export default function PropertyCard() {
  const [activeTab,] = useState("House");

  const filteredProperties = properties.filter(
    (p) => p.type === activeTab
  );

  return (
    <div>

      

        <FilterSidebar />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
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
              <Button className="bg-white p-2 rounded-full shadow hover:bg-red-100">
                <FiHeart className="text-xl text-green-500" />
              </Button>
              <Button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                <FiPlus className="text-xl text-green-500" />
              </Button>
              <Button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                <FiShare className="text-xl text-green-500" />
              </Button>
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
