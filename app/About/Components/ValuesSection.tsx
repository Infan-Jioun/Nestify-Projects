import { motion } from "framer-motion";

export default function ValuesSection() {
    const values = [
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
    ];

    return (
        <section className="bg-gradient-to-r from-green-50 to-yellow-50 py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
                    Our Core Values
                </h2>
                <div className="flex flex-col md:flex-row md:justify-between gap-12 relative">
                    {values.map((value, i) => (
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
    );
}