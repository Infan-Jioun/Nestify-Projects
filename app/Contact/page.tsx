"use client";

import { motion } from "framer-motion";
import NextHead from "../components/NextHead/NextHead";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <NextHead title="Contact - Nestify" />

      {/* Hero Section */}
      <section className="py-20 text-center bg-gray-100">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-600"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Contact Us
        </motion.h1>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          Have questions or need support? We’re here to help. Reach out to us anytime.
        </p>
      </section>

      {/* Contact Info */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-10 text-center">
        {[
          { title: "Email", value: "support@nestify.com", icon: <Mail className="w-10 h-10 mx-auto mb-4 text-gray-500" /> },
          { title: "Phone", value: "+880 1234-567890", icon: <Phone className="w-10 h-10 mx-auto mb-4 text-gray-500" /> },
          { title: "Location", value: "Dhaka, Bangladesh", icon: <MapPin className="w-10 h-10 mx-auto mb-4 text-gray-500" /> },
        ].map((info, i) => (
          <motion.div
            key={i}
            className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-2xl transition border border-gray-200"
            whileHover={{ scale: 1.05 }}
          >
            {info.icon}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{info.title}</h3>
            <p className="text-gray-600">{info.value}</p>
          </motion.div>
        ))}
      </section>

      {/* Contact Form */}
      <section className="max-w-4xl mx-auto py-16 px-6">
        <motion.div
          className="bg-white shadow-xl rounded-2xl p-10 border border-gray-200"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400 outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400 outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                rows={5}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400 outline-none"
                placeholder="Write your message..."
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-green-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:opacity-90 transition"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
