'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSkletonLoader } from '@/app/features/loader/loaderSlice'
import { RootState } from '@/lib/store'
import Link from 'next/link'
import { motion } from "framer-motion"
import { GoArrowUpRight } from 'react-icons/go'
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
    <div className='px-4 md:px-8 lg:px-16 py-16'>
      {/* Modern Green Gradient Background */}
      <div className='bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 rounded-3xl shadow-2xl overflow-hidden border border-green-100'>
        <div className="relative">
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-green-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-lime-200/30 rounded-full blur-2xl animate-bounce"></div>

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="relative px-6 py-12 md:py-16 lg:py-20 md:px-12 lg:px-20">
            <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-16">
              {/* Left Content - Modern Text Section */}
              <div className="space-y-6 lg:space-y-8">
                {loading || skletonLoader ? (
                  <div className="space-y-4">
                    <div className="h-4 bg-green-200 rounded-full animate-pulse w-32 mb-6"></div>
                    <div className="h-12 bg-green-200 rounded-2xl animate-pulse w-3/4 mb-4"></div>
                    <div className="h-4 bg-green-200 rounded animate-pulse w-full mb-2"></div>
                    <div className="h-4 bg-green-200 rounded animate-pulse w-5/6 mb-2"></div>
                    <div className="h-4 bg-green-200 rounded animate-pulse w-4/6 mb-8"></div>
                    <div className="flex gap-4 mb-6">
                      <div className="h-16 bg-green-200 rounded-xl animate-pulse w-20"></div>
                      <div className="h-16 bg-green-200 rounded-xl animate-pulse w-20"></div>
                      <div className="h-16 bg-green-200 rounded-xl animate-pulse w-20"></div>
                    </div>
                    <div className="h-14 bg-green-200 rounded-xl animate-pulse w-48"></div>
                  </div>
                ) : (
                  <>
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-full shadow-lg">
                      <span className="text-sm font-semibold">🌿 Limited Time Offer</span>
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900">
                      Find Your
                      <span className="block text-green-600 mt-2">Dream Home</span>
                      Today
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">
                      Discover exclusive green properties and get personalized eco-friendly recommendations.
                      Join thousands of happy homeowners who found their perfect sustainable match with us.
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-6 lg:gap-8 pt-4">
                      <div className="text-center">
                        <div className="text-2xl lg:text-3xl font-bold text-green-600">10K+</div>
                        <div className="text-gray-600 text-sm lg:text-base">Eco Properties</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl lg:text-3xl font-bold text-green-600">95%</div>
                        <div className="text-gray-600 text-sm lg:text-base">Success Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl lg:text-3xl font-bold text-green-600">24/7</div>
                        <div className="text-gray-600 text-sm lg:text-base">Green Support</div>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 lg:pt-8">
                      <Link href="/Authentication">
                        <motion.button
                          whileHover={{ scale: 1.0 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn w-[250px] h-10 px-4 rounded-full bg-white text-black border border-gray-300 hover:text-green-500 transition"
                        >
                          Get Started Free <GoArrowUpRight />
                        </motion.button>
                      </Link>

                    </div>

                    {/* Trust Indicators */}
                    <div className="flex items-center gap-4 pt-6">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((item) => (
                          <div key={item} className="w-8 h-8 bg-green-200 rounded-full border-2 border-white"></div>
                        ))}
                      </div>
                      <p className="text-gray-500 text-sm">
                        <span className="font-semibold text-green-600">500+</span> people registered last week
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Right Content - Modern Image Section */}
              <div className="relative">
                {loading || skletonLoader ? (
                  <div className="w-full h-80 lg:h-96 bg-green-200 rounded-2xl animate-pulse lg:block hidden"></div>
                ) : (
                  <div className="relative lg:block hidden">
                    {/* Main Image Container */}
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl opacity-20 blur-xl"></div>
                      <Image
                        src="https://i.ibb.co/pjSdXzkf/cta-building-1.webp"
                        alt="Luxury Modern Green Building"
                        width={600}
                        height={500}
                        className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 border-4 border-white"
                      />

                      {/* Floating Card 1 */}
                      <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-2xl transform hover:scale-110 transition-transform duration-300 border border-green-100">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl text-green-600">⭐</span>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">4.9/5</div>
                            <div className="text-xs text-gray-600">Green Rating</div>
                          </div>
                        </div>
                      </div>

                      {/* Floating Card 2 */}
                      <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-2xl transform hover:scale-110 transition-transform duration-300 border border-green-100">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl text-emerald-600">🏆</span>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">#1</div>
                            <div className="text-xs text-gray-600">Eco Friendly</div>
                          </div>
                        </div>
                      </div>

                      {/* Floating Card 3 */}
                      <div className="absolute top-1/2 -right-6 bg-white rounded-2xl p-4 shadow-2xl transform hover:scale-110 transition-transform duration-300 border border-green-100">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center">
                            <span className="text-2xl text-lime-600">💚</span>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">100%</div>
                            <div className="text-xs text-gray-600">Sustainable</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Background Decoration */}
                    <div className="absolute -z-10 top-8 right-8 w-full h-full bg-green-300 rounded-2xl opacity-10"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}