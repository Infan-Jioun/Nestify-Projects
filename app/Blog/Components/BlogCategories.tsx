import { Category } from "@/app/Types/BlogPost";
import { Button } from "@/components/ui/button";


interface BlogCategoriesProps {
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export const BlogCategories = ({
    categories,
    selectedCategory,
    onCategoryChange
}: BlogCategoriesProps) => {
    return (
        <section className="bg-white/80 backdrop-blur-sm border-b border-gray-100 mt-44">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-wrap gap-3 justify-center">
                    <Button
                        variant={selectedCategory === "" ? "default" : "outline"}
                        onClick={() => onCategoryChange("")}
                        className="rounded-full px-6 py-2.5 transition-all duration-300 border-green-200 hover:border-green-400"
                    >
                         All Articles
                    </Button>
                    {categories.map((category) => (
                        <Button
                            key={category.name}
                            variant={selectedCategory === category.name ? "default" : "outline"}
                            onClick={() => onCategoryChange(category.name)}
                            className="rounded-full px-5 py-2.5 transition-all duration-300 border-green-200 hover:border-green-400 flex items-center gap-2"
                        >
                            {category.icon}
                            {category.name}
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    );
};