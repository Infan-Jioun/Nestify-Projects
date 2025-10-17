"use client";

import { motion } from "framer-motion";
import NextHead from "../components/NextHead/NextHead";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Message sent successfully! We'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          {"Have questions or need support? We're here to help. Reach out to us anytime."}
        </p>
      </section>

      {/* Contact Info */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-10 text-center">
        {[
          {
            title: "Email",
            value: "support@nestify.com",
            icon: <Mail className="w-10 h-10 mx-auto mb-4 text-gray-500" />
          },
          {
            title: "Phone",
            value: "+880 1234-567890",
            icon: <Phone className="w-10 h-10 mx-auto mb-4 text-gray-500" />
          },
          {
            title: "Location",
            value: "Dhaka, Bangladesh",
            icon: <MapPin className="w-10 h-10 mx-auto mb-4 text-gray-500" />
          },
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

          {/* Status Message */}
          {submitStatus.message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg mb-6 ${submitStatus.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
                }`}
            >
              {submitStatus.message}
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition"
                placeholder="Your name"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition"
                placeholder="you@example.com"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition"
                placeholder="Write your message..."
                required
                disabled={isLoading}
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-green-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center justify-center"
              whileHover={{ scale: isLoading ? 1 : 1.03 }}
              whileTap={{ scale: isLoading ? 1 : 0.97 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </motion.button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}