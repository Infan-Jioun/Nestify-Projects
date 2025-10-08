import Link from "next/link";
import { Home } from "lucide-react";

interface BlogHeaderProps {
    title?: string;
    subtitle?: string;
}

export default function BlogHeader({
    title = "Real Estate Intelligence",
    subtitle = "Strategic insights, market analytics, and expert perspectives to empower your property investment decisions"
}: BlogHeaderProps) {
    return (
        <section className="relative py-16 px-6 text-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-green-200/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-teal-200/25 rounded-full blur-2xl animate-bounce"></div>

            {/* Geometric Patterns */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-32 h-32 border-2 border-green-400 rounded-lg rotate-45"></div>
                <div className="absolute bottom-32 right-32 w-24 h-24 border-2 border-emerald-400 rounded-full"></div>
                <div className="absolute top-40 right-40 w-16 h-16 border border-green-500 rotate-12"></div>
            </div>

            <div className="relative container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="flex justify-center mb-12">
                        <div className="flex items-center gap-4 text-sm text-green-700">
                            <Link href="/" className="hover:text-green-900 transition-colors duration-300 flex items-center gap-2 group">
                                <Home size={16} className="group-hover:scale-110 transition-transform" />
                                Home
                            </Link>
                            <span className="text-green-600">/</span>
                            <span className="text-green-800 font-medium">Blog</span>
                        </div>
                    </nav>

                    {/* Main Content */}
                    <div className="mb-16">
                        {/* Premium Badge */}
                        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl mb-8 border border-green-400/30 backdrop-blur-sm">
                            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                            <span className="font-semibold tracking-wide">🏆 INDUSTRY INSIGHTS</span>
                        </div>

                        {/* Main Heading - Fixed Colors */}
                        <h1 className="text-6xl md:text-8xl font-bold text-green-800 mb-8 leading-tight">
                            Real Estate
                            <span className="block bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mt-4">
                                Intelligence
                            </span>
                        </h1>

                        {/* Subheading - Fixed Colors */}
                        <p className="text-xl md:text-2xl text-green-700 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                            {subtitle}
                        </p>

                     
                    </div>

                    {/* Scroll Indicator */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <div className="w-6 h-10 border-2 border-green-500/50 rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-green-500 rounded-full mt-2"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 right-20 w-6 h-6 bg-green-500 rounded-full animate-float opacity-60"></div>
            <div className="absolute bottom-40 left-32 w-4 h-4 bg-emerald-400 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-60 right-44 w-3 h-3 bg-green-600 rounded-full animate-float opacity-30" style={{ animationDelay: '2s' }}></div>
        </section>
    );
}