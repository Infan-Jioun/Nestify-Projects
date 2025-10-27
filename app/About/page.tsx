"use client";
import React, { useState, useEffect } from "react";
import NextHead from "../components/NextHead/NextHead";
import { motion } from "framer-motion";
import { FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";

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
      <section className="py-12 bg-gradient-to-r from-green-50 to-blue-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-black mb-3">Property Seller Demo Access</h2>
              <p className="text-gray-600">
                Use these credentials to test the seller dashboard and property management features
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Login Credentials */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-black">Seller Login</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500 block mb-1">Email</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value="infanjiounrahman20606@gmail.com"
                        readOnly
                        className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 font-mono cursor-pointer"
                        onClick={(e) => e.currentTarget.select()}
                      />
                      <button
                        onClick={() => navigator.clipboard.writeText('infanjiounrahman20606@gmail.com')}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors duration-200"
                        title="Copy to clipboard"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500 block mb-1">Password</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="password"
                        value="12345678"
                        readOnly
                        className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 font-mono cursor-pointer"
                        onClick={(e) => e.currentTarget.select()}
                      />
                      <button
                        onClick={() => navigator.clipboard.writeText('12345678')}
                        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors duration-200"
                        title="Copy to clipboard"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Access */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-black">Available Features</h3>
                </div>

                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Property Listings Management
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Add/Edit Property Details
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    View Property Analytics
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Manage Buyer Inquiries
                  </li>
                  <li className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Track Property Views
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="/LoginPage"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login as Seller
              </a>

              <a
                href="/RegisterPage"
                className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Create New Account
              </a>
            </div>

            {/* Security Note */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                🔒 This is a demo account. Please do not change the password or use for personal purposes.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Developer Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Meet the Developer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate about creating innovative solutions and building amazing user experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center group hover:transform hover:-translate-y-2">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-green-500 group-hover:border-green-600 transition-colors duration-300">
                <Image
                  src="https://i.ibb.co/hxVK2S3c/IMG-20250907-122427-2.jpg"
                  width={120}
                  height={120}
                  alt="Developer 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Infan Jioun Rahman</h3>
              <p className="text-green-500 text-sm font-medium mb-3">Full Stack Developer</p>
              <a
                href="mailto:infanjiounrahman20606@gmail.com"
                className="text-green-500 hover:text-green-600 text-sm font-medium mb-3 block transition-colors duration-200"
              >
                infanjiounrahman20606@gmail.com
              </a>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Passionate about building scalable web applications and creating exceptional user experiences.
              </p>
              <div className="flex justify-center space-x-3">
                <a
                  href="https://github.com/Infan-Jioun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-gray-800 text-gray-600 hover:text-white p-3 rounded-lg transition-all duration-200 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/infan-jioun-rahman"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-blue-400 text-gray-600 hover:text-white p-3 rounded-lg transition-all duration-200 hover:scale-110"
                >
                  <FaLinkedinIn className="w-5 h-5" />
                </a>
                <a
                  href="https://infan-portfolio.web.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-green-500 text-gray-600 hover:text-white p-3 rounded-lg transition-all duration-200 hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                  </svg>
                </a>
              </div>
            </div>


          </div>



        </div>
      </section>
    </div>
  );
}