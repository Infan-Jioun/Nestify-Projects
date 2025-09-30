import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Plus, Search } from 'lucide-react'

interface CategoriesProps {
    selectedCategories?: string[]
    onCategoriesChange?: (categories: string[]) => void
    maxCategories?: number
    className?: string
}

const predefinedCategories = [
    "Real Estate Tips",
    "Market Trends",
    "Home Improvement",
    "Investment Guide",
    "Legal Advice",
    "Interior Design",
    "Property Management",
    "Commercial Real Estate",
    "Home Buying Guide",
    "Selling Strategies",
    "Mortgage Advice",
    "Home Valuation",
    "Rental Properties",
    "Real Estate Technology",
    "Sustainable Homes"
]

export default function Categories({
    selectedCategories = [],
    onCategoriesChange = () => { },
    maxCategories = 5,
    className = ""
}: CategoriesProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [customCategory, setCustomCategory] = useState('')

    const filteredCategories = predefinedCategories.filter(category =>
        category.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedCategories.includes(category)
    )

    const addCategory = (category: string) => {
        if (category.trim() &&
            !selectedCategories.includes(category.trim()) &&
            selectedCategories.length < maxCategories) {
            onCategoriesChange([...selectedCategories, category.trim()])
            setCustomCategory('')
            setSearchTerm('')
        }
    }

    const removeCategory = (categoryToRemove: string) => {
        onCategoriesChange(selectedCategories.filter(cat => cat !== categoryToRemove))
    }

    const handleAddCustom = () => {
        if (customCategory.trim()) {
            addCategory(customCategory.trim())
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAddCustom()
        }
    }

    return (
        <Card className={`border-2 border-gray-200 ${className}`}>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                    <span>Categories</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {selectedCategories.length}/{maxCategories}
                    </Badge>
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Selected Categories */}
                {selectedCategories.length > 0 && (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Selected Categories</Label>
                        <div className="flex flex-wrap gap-2">
                            {selectedCategories.map((category, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="px-3 py-1.5 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 transition-colors group"
                                >
                                    {category}
                                    <button
                                        type="button"
                                        onClick={() => removeCategory(category)}
                                        className="ml-2 hover:text-green-900 transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Custom Category Input */}
                <div className="space-y-2">
                    <Label htmlFor="custom-category" className="text-sm font-medium text-gray-700">
                        Add Custom Category
                    </Label>
                    <div className="flex gap-2">
                        <Input
                            id="custom-category"
                            type="text"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter custom category..."
                            className="flex-1"
                            disabled={selectedCategories.length >= maxCategories}
                        />
                        <Button
                            type="button"
                            onClick={handleAddCustom}
                            disabled={!customCategory.trim() || selectedCategories.length >= maxCategories}
                            size="sm"
                            className="whitespace-nowrap"
                        >
                            <Plus size={16} className="mr-1" />
                            Add
                        </Button>
                    </div>
                </div>

                {/* Predefined Categories */}
                <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Suggested Categories</Label>

                    {/* Search Box */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            type="text"
                            placeholder="Search categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    {/* Categories Grid */}
                    {filteredCategories.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1">
                            {filteredCategories.map((category, index) => (
                                <Button
                                    key={index}
                                    type="button"
                                    variant="outline"
                                    onClick={() => addCategory(category)}
                                    disabled={selectedCategories.length >= maxCategories}
                                    className="justify-start h-auto py-2 px-3 text-sm hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
                                >
                                    <Plus size={14} className="mr-2" />
                                    {category}
                                </Button>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-4 text-gray-500 text-sm">
                            {searchTerm ? 'No categories found' : 'No more categories available'}
                        </div>
                    )}
                </div>

                {/* Helper Text */}
                {selectedCategories.length >= maxCategories && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-yellow-800 text-sm text-center">
                            Maximum {maxCategories} categories allowed
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}