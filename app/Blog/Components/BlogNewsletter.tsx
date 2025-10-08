import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlogNewsletterProps {
    title?: string;
    description?: string;
}

export const BlogNewsletter = ({
    title = "Stay Updated with Market Insights",
    description = "Get the latest real estate trends, investment opportunities, and expert advice delivered directly to your inbox."
}: BlogNewsletterProps) => {
    return (
        <section className="brelative py-16 px-6 text-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-400/10 rounded-full blur-3xl"></div>

            <div className="relative container mx-auto px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-0 px-4 py-2 rounded-full backdrop-blur-sm">
                        💌 Stay Informed
                    </Badge>
                    <h2 className="text-4xl font-bold mb-4">{title}</h2>
                    <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                        {description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <Input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 rounded-2xl border-0 bg-white/10 backdrop-blur-lg text-white placeholder-gray-300 py-3 px-5 focus:bg-white/20 focus:ring-2 focus:ring-green-300 transition-all duration-300"
                        />
                        <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            Subscribe Now
                        </Button>
                    </div>
                    <p className="text-gray-400 text-sm mt-4">No spam, unsubscribe at any time</p>
                </div>
            </div>
        </section>
    );
};