"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Building2, User, LogIn, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
}

const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5 },
    },
    hover: {
        y: -5,
        transition: { duration: 0.2 },
    },
}

const iconVariants = {
    hidden: { scale: 0 },
    visible: {
        scale: 1,
        transition: { duration: 0.3 },
    },
}

// Color constant

const green = '#22c52e';


export default function AuthenticationPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex justify-center items-center p-6 relative overflow-hidden">
            <motion.div
                className="flex flex-col md:flex-row justify-center items-center gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Real Estate Developer Card */}
                <motion.div
                    className="group relative bg-white p-8 rounded-2xl border-2 border-green-200 hover:border-green-300 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer w-full max-w-md"
                    style={{ borderColor: green }}
                    variants={cardVariants}
                    whileHover="hover"
                >
                    <div className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-lg border border-green-100">
                        <motion.div
                            className="text-white p-2 rounded-full"
                            style={{ backgroundColor: green }}
                            variants={iconVariants}
                        >
                            <Building2 size={20} />
                        </motion.div>
                    </div>

                    <Link href="/DeveloperRegister" className="block">
                        <motion.div
                            className="text-4xl mb-6 text-green-300 group-hover:text-green-200 transition-colors duration-300"
                            whileHover={{ scale: 1.1 }}
                        >
                            <Building2 />
                        </motion.div>

                        <h3 className="font-bold text-2xl text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                            Join as Developer
                        </h3>

                        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                           {" Become a verified Real Estate Developer and list your properties for thousands of buyers."}
                           {" Grow your business with our tools and dashboard."}
                        </p>

                        <motion.div
                            className="flex items-center text-green-600 font-semibold text-sm group-hover:text-green-700 transition-colors duration-300"
                            whileHover={{ x: 5 }}
                        >
                            Get Started
                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </motion.div>
                    </Link>

                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-green-50 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 -z-10" />
                </motion.div>

                {/* Customer Sign In / Register Card */}
                <motion.div
                    className="group relative bg-white p-8 rounded-2xl border-2 border-green-200 hover:border-green-300 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer w-full max-w-md"
                    style={{ borderColor: green }}
                    variants={cardVariants}
                    whileHover="hover"
                >
                    <div className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-lg border border-green-100">
                        <motion.div
                            className="text-white p-2 rounded-full"
                            style={{ backgroundColor: green }}
                            variants={iconVariants}
                        >
                            <User size={20} />
                        </motion.div>
                    </div>

                    <Link href="/RegisterPage" className="block">
                        <motion.div
                            className="text-4xl mb-6 text-green-300 group-hover:text-green-200 transition-colors duration-300"
                            whileHover={{ scale: 1.1 }}
                        >
                            <LogIn />
                        </motion.div>

                        <h3 className="font-bold text-2xl text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                            Sign Up as Buyer
                        </h3>

                        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                           {" Explore the best real estate listings and find your dream home."}
                            {"Create an account to save favorites and connect with developers."}
                        </p>

                        <motion.div
                            className="flex items-center text-green-600 font-semibold text-sm group-hover:text-green-700 transition-colors duration-300"
                            whileHover={{ x: 5 }}
                        >
                            Join Now
                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </motion.div>
                    </Link>

                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-green-50 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 -z-10" />
                </motion.div>
            </motion.div>

            {/* Animated background elements */}
            <div className="fixed top-10 left-10 w-20 h-20 bg-green-100 rounded-full blur-xl opacity-30 animate-pulse" />
            <div className="fixed bottom-10 right-10 w-32 h-32 bg-green-200 rounded-full blur-2xl opacity-20 animate-pulse delay-1000" />
            <div className="fixed top-1/2 right-1/4 w-16 h-16 bg-green-100 rounded-full blur-xl opacity-40 animate-pulse delay-500" />
        </div>
    )
}
