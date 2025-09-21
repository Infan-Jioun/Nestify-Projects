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
import "react-loading-skeleton/dist/skeleton.css"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/lib/store"
import { setSkletonLoader } from "@/app/features/loader/loaderSlice"

const banners = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&h=2160&q=80",
    alt: "Luxury Modern Home"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&h=2160&q=80",
    alt: "Elegant Interior Design"
  },

  {
    id: 3,
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&h=2160&q=80",
    alt: "Contemporary Villa"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&h=1080&q=80",
    alt: "Minimalist Apartment"
  },
  
]

export default function AddPropertyBannerPage() {
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
    <div className="w-full mx-auto py-6">
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
