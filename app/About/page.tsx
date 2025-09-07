"use client"
import React from "react";
import NextHead from "../components/NextHead/NextHead";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <NextHead title="About - Nestify" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-emerald-500 text-white py-20 px-6 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Welcome to <span className="text-yellow-300">Nestify</span>
        </motion.h1>
        <motion.p
          className="max-w-2xl mx-auto text-lg text-gray-100"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Redefining the way people discover, buy, and rent properties with trust,
          transparency, and innovation.
        </motion.p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-10">
        <motion.div
          className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-lg rounded-2xl p-10 hover:shadow-2xl transition"
          whileHover={{ y: -5 }}
        >
          <h2 className="text-2xl font-bold text-green-700 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To simplify real estate experiences by combining human values with
            cutting-edge technology. Nestify makes every property search smooth,
            transparent, and stress-free.
          </p>
        </motion.div>

        <motion.div
          className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-lg rounded-2xl p-10 hover:shadow-2xl transition"
          whileHover={{ y: -5 }}
        >
          <h2 className="text-2xl font-bold text-green-700 mb-4">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            To become the most trusted property platform, empowering people to
            find not just houses, but homes where dreams are built and
            communities thrive.
          </p>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="bg-gradient-to-br from-green-50 to-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-14">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-10">
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
                className="bg-white rounded-2xl shadow-lg p-10 hover:shadow-2xl transition"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-green-700 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-green-600 text-white py-16 px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Ready to find your dream property?
        </motion.h2>
        <motion.p
          className="mb-8 text-gray-100"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Join thousands of happy users who trust Nestify for their real estate needs.
        </motion.p>
        <motion.a
          href="/Properties"
          className="inline-block bg-yellow-400 text-green-900 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition"
          whileHover={{ scale: 1.05 }}
        >
          Explore Properties
        </motion.a>
      </section>
    </div>
  );
}
