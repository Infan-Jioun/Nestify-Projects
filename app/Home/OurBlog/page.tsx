'use client'

import React from 'react'

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
  return (
    <section className="mt-20 px-4 lg:px-32">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">From Our Blog</h2>
        <p className="text-gray-500 mt-2">Aliquam lacinia diam quis lacus euismod</p>
      </div>

      {/* Blog Cards */}
      <div className="grid md:grid-cols-3 gap-10">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="group bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 duration-300"
          >
            <div className="relative overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                className="w-full h-[240px] object-cover transform transition-transform duration-500 group-hover:scale-110"
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
        ))}
      </div>
    </section>
  )
}
