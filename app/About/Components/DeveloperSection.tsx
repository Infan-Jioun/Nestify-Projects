import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";

export default function DeveloperSection() {
    return (
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
    );
}