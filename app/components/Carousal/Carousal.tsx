"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

type CarousalProps = {
    images: string[];
    title?: string;
    aspectRatio?: "video" | "square";
};

export default function Carousal({ images, title,  aspectRatio = "video" }: CarousalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // autoplay effect
    useEffect(() => {
        if (!images || images.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images]);

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded-t-xl">
                <span className="text-gray-500">No Image</span>
            </div>
        );
    }

    return (
        <Carousel className="w-full ">
            <CarouselContent
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: "transform 0.6s ease-in-out",
                    display: "flex",
                }}
            >
                {images.map((src, index) => (
                    <CarouselItem key={index} className="min-w-full">
                        <Image
                            src={src}
                            alt={title || `Property image ${index + 1}`}
                            width={600}
                            height={400}
                            unoptimized
                            className="w-full h-56 object-cover rounded-t-xl"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)} />
            <CarouselNext onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)} />
        </Carousel>
    );
}
