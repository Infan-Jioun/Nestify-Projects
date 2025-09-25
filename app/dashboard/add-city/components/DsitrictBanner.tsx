"use client"

import * as React from "react"
import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Skeleton from "react-loading-skeleton"
// import "react-loading-skeleton/dist/skeleton.css"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/lib/store"
import { setSkletonLoader } from "@/app/features/loader/loaderSlice"

const banners = [
    {
        id: 1,
        src: "https://i.ibb.co/HfgMX6Yk/A-breathtaking-8-K-ultra-realistic-aerial-view-of-Dhaka-city-at-day-with-glowing-street-lights-busy.jpg",
        alt: "Dhaka City"
    },
    {
        id: 2,
        src: "https://i.ibb.co/qYzjbb3F/An-8-K-highly-detailed-photo-realistic-view-of-Chittagong-port-city-with-cargo-ships-cranes-and-ocea.jpg",
        alt: "Chittagong City"
    },
    {
        id: 3,
        src: "https://i.ibb.co/1G84WRnw/An-ultra-realistic-8-K-aerial-view-of-Cox-s-Bazar-the-world-s-longest-sea-beach-with-golden-sandy-sh.jpg",
        alt: "Cox's Bazar City"
    },
    {
        id: 4,
        src: "https://i.ibb.co/dw1BwV86/8-K-ultra-detailed-view-of-Chattogram-city-surrounded-by-tea-gardens-and-hills-modern-urban-skyline.jpg",
        alt: "Sylhet City"
    },
]

export default function DistrictBanner() {
    const [current, setCurrent] = React.useState(0)
    const dispatch = useDispatch<AppDispatch>();
    const skletonLoader = useSelector((state: RootState) => state.loader.skletonLoader);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className=" w-full mx-auto py-6">
            <Carousel
                className="rounded-2xl shadow-lg overflow-hidden"
                opts={{ startIndex: current }}
            >
                <CarouselContent>
                    {banners.map((banner, index) => (
                        <CarouselItem key={banner.id}>
                            <div className="relative h-[400px] w-full flex items-center justify-center">
                                {skletonLoader && index === current && (
                                    <Skeleton height={400} width="100%" />
                                )}

                                <Image
                                    src={banner.src}
                                    alt={banner.alt}
                                    fill
                                    priority
                                    className={`object-cover transition-opacity duration-500 ${skletonLoader ? "opacity-0" : "opacity-100"}`}
                                    onLoad={() => dispatch(setSkletonLoader(false))}
                                />

                                <div className="absolute bottom-5 left-5 bg-black/50 text-white px-4 py-2 rounded-lg">
                                    {banner.alt}
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
            </Carousel>
        </div>
    )
}
