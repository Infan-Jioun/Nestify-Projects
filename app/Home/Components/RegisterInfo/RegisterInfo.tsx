
import Image from 'next/image'
import React from 'react'

export default function RegisterInfo() {
  return (
<div className='px-4 md:px-4 lg:px-15'>
<div className='bg-pink-100  rounded-2xl   '>
     <div className=" mt-20  rounded-2xl  p-9 px-10 md:p-0">
      <div className="px-4 md:px-4 lg:px-15  grid md:grid-cols-2 items-center gap-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Your Dream House</h2>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          </p>
          <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
            Register Now ↗
          </button>
        </div>
        <div className="flex justify-center">
          <Image
            src="https://i.ibb.co/pjSdXzkf/cta-building-1.webp"
            alt="Building" width={320} height={320}
            className="object-contain md:block hidden"
          />
        </div>
      </div>
    </div>
   </div>
</div>
  )
}
