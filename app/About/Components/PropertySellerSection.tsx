import { motion } from "framer-motion";

export default function PropertySellerSection() {
    const steps = [
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
    ];

    return (
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
                    {steps.map((step, i) => (
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
                    href="/Authentication"
                    className="mt-12 inline-block bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-10 py-4 rounded-full shadow-xl hover:scale-105 transition"
                    whileHover={{ scale: 1.1 }}
                >
                    Start Selling
                </motion.a>
            </div>
        </section>
    );
}