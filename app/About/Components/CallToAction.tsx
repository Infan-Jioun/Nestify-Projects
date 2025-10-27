import { motion } from "framer-motion";

export default function CallToAction() {
    return (
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
    );
}