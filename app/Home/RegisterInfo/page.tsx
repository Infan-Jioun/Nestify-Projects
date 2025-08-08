
import React from 'react'

export default function RegisterInfo() {
  return (
   <div className='px-4 lg:px-15 '>
     <div className="bg-pink-50 mt-20 rounded-2xl  p-9 md:p-0">
      <div className="max-w-7xl mx-auto  grid md:grid-cols-2 items-center gap-12">
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
          <Imag
            src="https://i.ibb.co/pjSdXzkf/cta-building-1.webp"
            alt="Building"
            className="w-80 h-80 object-contain md:block hidden"
          />
        </div>
      </div>
    </div>
   </div>
  )
}
