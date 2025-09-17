'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSkletonLoader } from '@/app/features/loader/loaderSlice'
import { RootState } from '@/lib/store'

type BlogPost = {
  id: number
  title: string
  category: string
  image: string
  date: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Private Contemporary Home Balancing Openness',
    category: 'Living Room',
    image: 'https://i.ibb.co/203S549p/blog-1.webp',
    date: 'July 28',
  },
  {
    id: 2,
    title: 'Contemporary Home Private Balancing Openness',
    category: 'Living Room',
    image: 'https://i.ibb.co/tTsYh0Sf/blog-2.webp',
    date: 'July 28',
  },
  {
    id: 3,
    title: 'Balancing Private Contemporary Home Openness',
    category: 'Living Room',
    image: 'https://i.ibb.co/5gWh6sm2/blog-3.webp',
    date: 'July 28',
  },
]

export default function OurBlog() {
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


  const BlogCardSkeleton = () => (
    <div className="group bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="relative overflow-hidden">
        <div className="w-full h-48 bg-gray-200"></div>
        <div className="absolute top-4 right-4 w-16 h-6 bg-gray-300 rounded-full"></div>
      </div>

      <div className="p-5">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
        <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-4/5"></div>
      </div>
    </div>
  )

  return (
    <section className="mt-20 px-4 lg:px-32">
      {/* Section Title */}
      <div className="text-center mb-12">
        {loading || skletonLoader ? (
          <>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-80 mx-auto"></div>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-800">From Our Blog</h2>
            <p className="text-gray-500 mt-2">Aliquam lacinia diam quis lacus euismod</p>
          </>
        )}
      </div>

      {/* Blog Cards */}
      <div className="grid md:grid-cols-3 gap-10">
        {loading || skletonLoader ? (
        
          Array.from({ length: 3 }).map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))
        ) : (
         
          blogPosts.map((post) => (
            <div
              key={post.id}
              className="group bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 duration-300"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={350}
                  className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white text-gray-700 text-sm px-3 py-1 rounded-full shadow font-medium">
                  {post.date}
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">{post.category}</p>
                <h3 className="text-lg font-semibold text-gray-800 leading-snug transition-colors duration-300">
                  {post.title}
                </h3>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}