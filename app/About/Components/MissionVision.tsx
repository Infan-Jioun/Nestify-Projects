import { motion } from "framer-motion";

export default function MissionVision() {
    const items = [
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
    ];

    return (
        <section className="max-w-7xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-12">
            {items.map((item, i) => (
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
    );
}