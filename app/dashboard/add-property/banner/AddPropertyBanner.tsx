import Image from 'next/image'
import React from 'react'
import image from '../../../../Image/White Classy and Refined Real Estate Banner (2).png'
export default function AddPropertyBannerPage() {
  return (
    <div> <Image width={2000} height={2000} className="  rounded-xl lg:rounded-3xl shadow " src={image} alt="bannerImage" /></div>
  )
}
