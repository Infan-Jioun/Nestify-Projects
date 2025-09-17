'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSkletonLoader } from '@/app/features/loader/loaderSlice'
import { RootState } from '@/lib/store'

export default function RegisterInfo() {
  const dispatch = useDispatch()
  const skletonLoader = useSelector((state: RootState) => state.loader.skletonLoader)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    dispatch(setSkletonLoader(true))
    setLoading(true)
    
    const timer = setTimeout(() => {
      setLoading(false)
      dispatch(setSkletonLoader(false))
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [dispatch])

  return (
    <div className='px-4 md:px-4 lg:px-15'>
      <div className='bg-pink-100 rounded-2xl'>
        <div className="mt-20 rounded-2xl p-9 px-10 md:p-0">
          <div className="px-4 md:px-4 lg:px-15 grid md:grid-cols-2 items-center gap-12">
            {/* Left Content */}
            <div>
              {loading || skletonLoader ? (
                <>
                  <div className="h-10 bg-gray-200 rounded animate-pulse w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5 mb-6"></div>
                  <div className="h-12 bg-gray-200 rounded animate-pulse w-40"></div>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Your Dream House</h2>
                  <p className="text-gray-600 mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                  </p>
                  <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
                    Register Now ↗
                  </button>
                </>
              )}
            </div>

          
            <div className="flex justify-center">
              {loading || skletonLoader ? (
                <div className="w-80 h-80 bg-gray-200 rounded-lg animate-pulse md:block hidden"></div>
              ) : (
                <Image
                  src="https://i.ibb.co/pjSdXzkf/cta-building-1.webp"
                  alt="Building"
                  width={320}
                  height={320}
                  className="object-contain md:block hidden"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}