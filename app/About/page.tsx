"use client";
import React, { useState, useEffect } from "react";
import NextHead from "../components/NextHead/NextHead";
import { motion } from "framer-motion";
import ContactPage from "../Contact/page";

export default function AboutPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <NextHead title="About - Nestify" />

        {/* Hero Section Skeleton */}
        <div className="relative py-32 px-6 text-center bg-gradient-to-br from-green-50 via-white to-green-100 overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <div className="h-12 bg-gray-200 rounded animate-pulse w-3/4 mx-auto mb-6"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2 mx-auto"></div>
          </div>
        </div>

        {/* Mission & Vision Skeleton */}
        <div className="max-w-7xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-12">
          {[1, 2].map((item) => (
            <div key={item} className="bg-white rounded-2xl p-10 h-full animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>

        {/* Values Section Skeleton */}
        <div className="bg-gradient-to-r from-green-50 to-yellow-50 py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="h-10 bg-gray-200 rounded animate-pulse w-1/4 mx-auto mb-16"></div>
            <div className="flex flex-col md:flex-row md:justify-between gap-12">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex-1 text-center">
                  <div className="bg-white p-8 rounded-2xl">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section Skeleton */}
        <div className="relative py-28 px-6 text-center bg-gray-200">
          <div className="max-w-3xl mx-auto">
            <div className="h-10 bg-gray-300 rounded animate-pulse w-3/4 mx-auto mb-6"></div>
            <div className="h-5 bg-gray-300 rounded animate-pulse w-1/2 mx-auto mb-10"></div>
            <div className="h-12 bg-gray-300 rounded animate-pulse w-48 mx-auto"></div>
          </div>
        </div>

        {/* Contact Section Skeleton */}
        <div className="bg-white py-24 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="h-10 bg-gray-200 rounded animate-pulse w-1/4 mx-auto mb-6"></div>
            <div className="h-5 bg-gray-200 rounded animate-pulse w-1/2 mx-auto mb-10"></div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="md:col-span-2 h-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="md:col-span-2 h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Property Seller Section Skeleton */}
        <div className="bg-gradient-to-r from-yellow-50 to-green-50 py-24 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="h-10 bg-gray-200 rounded animate-pulse w-1/2 mx-auto mb-6"></div>
            <div className="h-5 bg-gray-200 rounded animate-pulse w-2/3 mx-auto mb-12"></div>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white p-8 rounded-2xl">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
                </div>
              ))}
            </div>
            <div className="h-12 bg-gray-200 rounded animate-pulse w-48 mx-auto mt-12"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <NextHead title="About - Nestify" />

      {/* Hero Section */}
      <section className="relative py-32 px-6 text-center bg-gradient-to-br from-green-50 via-white to-green-100 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-green-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-52 h-52 bg-yellow-300/30 rounded-full blur-3xl animate-pulse"></div>

        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-600"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Welcome to Nestify
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto relative z-10 backdrop-blur-md bg-white/50 px-6 py-3 rounded-2xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Not just properties, we help you discover places where life truly
          happens.
        </motion.p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-12">
        {[
          {
            title: "Our Mission",
            desc: "To simplify real estate experiences by combining human values with cutting-edge technology. Nestify makes every property search smooth, transparent, and stress-free.",
            border: "white",
          },
          {
            title: "Our Vision",
            desc: "To become the most trusted property platform, empowering people to find not just houses, but homes where dreams are built and communities thrive.",
            border: "white",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className={`relative rounded-2xl p-[2px] bg-gradient-to-r ${item.border} shadow-2xl border-2 border-green-300`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-10 h-full">
              <h2 className="text-2xl font-bold text-green-500 mb-4">
                {item.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Values Section */}
      <section className="bg-gradient-to-r from-green-50 to-yellow-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Our Core Values
          </h2>
          <div className="flex flex-col md:flex-row md:justify-between gap-12 relative">
            {[
              {
                title: "Trust",
                desc: "We put honesty and transparency at the heart of every interaction.",
                icon: "🤝",
              },
              {
                title: "Innovation",
                desc: "We embrace technology to create smarter and faster real estate solutions.",
                icon: "💡",
              },
              {
                title: "Excellence",
                desc: "We always aim higher to provide the best possible experiences.",
                icon: "🌟",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                className="flex-1 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-green-100 hover:scale-105 transition">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-green-700 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section
        className="relative bg-fixed bg-cover bg-center py-28 px-6 text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c')",
        }}
      >
        <div className="absolute inset-0 backdrop-blur-[4px]"></div>
        <div className="relative z-10 max-w-3xl mx-auto ">
          <motion.h2
            className="text-3xl md:text-5xl font-extrabold mb-6 text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Ready to find your dream property?
          </motion.h2>
          <motion.p
            className="mb-10 text-gray-100 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Join thousands of happy users who trust Nestify for their real
            estate needs.
          </motion.p>
          <motion.a
            href="/Properties"
            className="inline-block backdrop-blur-[5px] border-2 border-green-300  text-white font-semibold px-10 py-4 rounded-full shadow-xl hover:scale-105 transition"
            whileHover={{ scale: 1.1 }}
          >
            Explore Properties
          </motion.a>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-24 px-6">
        <ContactPage />
      </section>

      {/* Property Seller Section */}
      <section className="bg-gradient-to-r from-yellow-50 to-green-50 py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Become a Nestify Property Seller
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Like Amazon Sellers, you can join our platform and list your
            properties to reach thousands of potential buyers.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏠",
                title: "List Your Property",
                desc: "Upload details, photos, and pricing of your property easily.",
              },
              {
                icon: "📈",
                title: "Reach More Buyers",
                desc: "Showcase your property to thousands of daily visitors.",
              },
              {
                icon: "💰",
                title: "Grow Your Sales",
                desc: "Get leads, close deals faster, and maximize your earnings.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="bg-white shadow-lg rounded-2xl p-8 hover:scale-105 transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-green-700 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.a
            href="/RegisterPage"
            className="mt-12 inline-block bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-10 py-4 rounded-full shadow-xl hover:scale-105 transition"
            whileHover={{ scale: 1.1 }}
          >
            Start Selling
          </motion.a>
        </div>
      </section>
    </div>
  );
}