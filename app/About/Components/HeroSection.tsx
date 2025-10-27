import { motion } from "framer-motion";

export default function HeroSection() {
    return (
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
    );
}