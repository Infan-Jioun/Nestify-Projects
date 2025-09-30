'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSkletonLoader } from '@/app/features/loader/loaderSlice'
import { RootState } from '@/lib/store'
import { fetchBlogPosts, BlogPost as BlogPostType } from '@/app/features/blog/blogSlice'
import Link from 'next/link'

export default function OurBlog() {
  const dispatch = useDispatch()
  const skletonLoader = useSelector((state: RootState) => state.loader.skletonLoader)
  const { posts, loading, error } = useSelector((state: RootState) => state.blog)
  const [localLoading, setLocalLoading] = useState(true)

  useEffect(() => {
    // Fetch blog posts when component mounts
    dispatch(fetchBlogPosts({ page: 1, limit: 3 }) as any)
  }, [dispatch])

  useEffect(() => {
    dispatch(setSkletonLoader(true))
    setLocalLoading(true)

    const timer = setTimeout(() => {
      setLocalLoading(false)
      dispatch(setSkletonLoader(false))
    }, 2000)

    return () => clearTimeout(timer)
  }, [dispatch])

  // Get featured image safely
  const getFeaturedImage = (post: BlogPostType): string => {
    if (typeof post.featuredImage === "string" && post.featuredImage.trim() !== "") {
      return post.featuredImage;
    }
    return "/api/placeholder/400/300";
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

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
        {localLoading || skletonLoader || loading ? (
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

      {/* Error State */}
      {error && !loading && (
        <div className="text-center text-red-500 mb-8">
          <p>Failed to load blog posts. Please try again later.</p>
        </div>
      )}

      {/* Blog Cards */}
      <div className="grid md:grid-cols-3 gap-10">
        {localLoading || skletonLoader || loading ? (
          // Show skeleton loaders
          Array.from({ length: 3 }).map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))
        ) : posts.length > 0 ? (

          posts.slice(0, 3).map((post) => (
            <div
              key={post._id}
              className="group bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 duration-300"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={getFeaturedImage(post)}
                  alt={post.title}
                  width={600}
                  height={350}
                  className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white text-gray-700 text-sm px-3 py-1 rounded-full shadow font-medium">
                  {formatDate(post.publishedAt)}
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                  {post.categories.length > 0 ? post.categories[0] : 'Uncategorized'}
                </p>
                <Link href={`/Blog/${post.slug || post._id}`}>
                  <h3 className="text-lg font-semibold text-gray-800 leading-snug transition-colors duration-300 group-hover:text-green-500">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                  <span>{post.readTime} min read</span>
                  <span>{post.views} views</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          // No posts available
          !error && (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-500">No blog posts available.</p>
            </div>
          )
        )}
      </div>

      {/* View All Button */}
      {!localLoading && !skletonLoader && !loading && posts.length > 0 && (
        <div className="text-center mt-12">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-500 transition-colors duration-300">
            View All Blog Posts
          </button>
        </div>
      )}
    </section>
  )
}