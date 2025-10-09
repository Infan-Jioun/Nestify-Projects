"use client";
import React from "react";

export default function SkeletonLoader() {
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-gray-300 to-gray-400 px-8 py-16">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto bg-gray-400 rounded-full mb-6"></div>
          <div className="h-8 bg-gray-400 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-400 rounded w-1/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-400 rounded w-1/5 mx-auto"></div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="border-b border-gray-200 mt-3">
        <div className="px-8">
          <div className="flex space-x-8">
            {[...Array(1)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-300 rounded w-24"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6">
                <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="grid grid-cols-2 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}