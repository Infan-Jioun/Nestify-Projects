// src/components/PropertyCard.tsx
"use client";
import Image from "next/image";
import { Bed, Bath, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Filters } from "../FilterSidebar/page";


interface Property {
    title: string;
    subtitle: string;
    image: string;
    status: string;
    location: string;
    price: number;
    beds: number;
    baths: number;
    sqft: number;
}

interface PropertyCardProps {
    filters?: Filters;
}

const properties: Property[] = [
    { title: "Apartments", subtitle: "20 Properties", image: "https://i.ibb.co/pj35Qbjb/image-1.webp", status: "For Sale", location: "New York, USA", price: 250000, beds: 3, baths: 2, sqft: 1200 },
    { title: "Office", subtitle: "34 Properties", image: "https://i.ibb.co/ks6vMKY3/Image-2.webp", status: "For Rent", location: "California, USA", price: 1500, beds: 0, baths: 1, sqft: 500 },
    { title: "Villa", subtitle: "42 Properties", image: "https://i.ibb.co/mF08HD2T/Image-3.webp", status: "For Sale", location: "Miami, USA", price: 450000, beds: 4, baths: 3, sqft: 2000 },
    { title: "House", subtitle: "18 Properties", image: "https://i.ibb.co/YBGd2FkP/Image-4.webp", status: "For Sale", location: "Texas, USA", price: 300000, beds: 3, baths: 2, sqft: 1600 },
    { title: "Apartments", subtitle: "52 Properties", image: "https://i.ibb.co/xS82zC52/Image-5.webp", status: "For Rent", location: "Chicago, USA", price: 1200, beds: 2, baths: 1, sqft: 900 },
    { title: "Apartments", subtitle: "14 Properties", image: "https://i.ibb.co/xS82zC52/Image-5.webp", status: "For Sale", location: "Boston, USA", price: 280000, beds: 3, baths: 2, sqft: 1400 },
];

const PropertyCard: React.FC<PropertyCardProps> = ({ filters }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const propertiesPerPage = 3;
    const [filteredProperties, setFilteredProperties] = useState(properties);

    useEffect(() => {
        let temp = properties;

        if (filters) {
            // Search filter
            if (filters.search) {
                temp = temp.filter(p => p.title.toLowerCase().includes(filters.search.toLowerCase()) || p.location.toLowerCase().includes(filters.search.toLowerCase()));
            }

            // Status filter
            if (filters.status !== "all") {
                temp = temp.filter(p => p.status.toLowerCase() === filters.status.toLowerCase());
            }

            // Type filter
            if (filters.types.length > 0) {
                temp = temp.filter(p => filters.types.includes(p.title));
            }

            // Price filter
            temp = temp.filter(p => p.price >= filters.price[0] && p.price <= filters.price[1]);
        }

        setFilteredProperties(temp);
        setCurrentPage(1); // reset to first page
    }, [filters]);

    const indexOfLast = currentPage * propertiesPerPage;
    const indexOfFirst = indexOfLast - propertiesPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

    return (
        <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {currentProperties.map((property, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                        <div className="relative">
                            <Image src={property.image} alt={property.title} width={400} height={250} className="w-full object-cover" />
                            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                {property.status}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-800">{property.title}</h3>
                            <p className="text-gray-500 text-sm mb-2">{property.location}</p>
                            <p className="text-2xl font-bold text-red-600 mb-4">${property.price.toLocaleString()}</p>
                            <div className="flex items-center justify-between text-gray-600">
                                <div className="flex items-center gap-2"><Bed size={18} /><span>{property.beds} Beds</span></div>
                                <div className="flex items-center gap-2"><Bath size={18} /><span>{property.baths} Baths</span></div>
                                <div className="flex items-center gap-2"><ArrowRight size={18} /><span>{property.sqft} sqft</span></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={`px-3 py-1 rounded border ${currentPage === i + 1 ? "bg-red-600 text-white border-red-600" : "bg-white text-gray-700 border-gray-300"}`}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PropertyCard;
