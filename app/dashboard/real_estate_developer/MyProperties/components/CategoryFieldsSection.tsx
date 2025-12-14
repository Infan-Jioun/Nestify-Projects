import React from 'react'
import { Building } from 'lucide-react'
import { CategoryField } from '@/app/Types/properties'

interface CategoryFieldsSectionProps {
    categoryName?: string
    categoryFields: CategoryField[]
    onFieldChange: (fieldId: string, value: string | number | boolean) => void
}

const CategoryFieldsSection: React.FC<CategoryFieldsSectionProps> = ({
    categoryName,
    categoryFields,
    onFieldChange
}) => {
    if (categoryFields.length === 0) return null

    const fieldTypeMapping: Record<string, 'number' | 'select' | 'text'> = {
        bedrooms: 'number',
        bathroom: 'number',
        area: 'number',
        floor: 'number',
        furnishing: 'select',
        _default: 'text'
    }

    const getFieldType = (fieldName: string) => {
        const lowerName = fieldName.toLowerCase().trim()
        for (const [key, type] of Object.entries(fieldTypeMapping)) {
            if (key !== '_default' && lowerName.includes(key)) return type
        }
        return fieldTypeMapping._default
    }

    const getSelectOptions = (fieldName: string) => {
        const lowerName = fieldName.toLowerCase()
        if (lowerName.includes('furnishing')) {
            return [
                { value: 'Furnished', label: 'Furnished' },
                { value: 'Semi-Furnished', label: 'Semi-Furnished' },
                { value: 'Unfurnished', label: 'Unfurnished' }
            ]
        }
        return []
    }

    const getNumberPlaceholder = (fieldName: string) => {
        if (fieldName.toLowerCase().includes('area')) return 'Enter area in sq ft'
        if (fieldName.toLowerCase().includes('floor')) return 'Enter floor number'
        return `Enter ${fieldName}`
    }

    return (
        <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-medium text-foreground flex items-center gap-2">
                <Building className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                {categoryName || 'Category'} Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {categoryFields.map((field) => {
                    const fieldType = getFieldType(field.name)
                    const selectOptions = getSelectOptions(field.name)

                    return (
                        <div key={field.id} className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                                {field.name}
                            </label>

                            {fieldType === 'number' ? (
                                <div className="relative">
                                    <input
                                        type="number"
                                        min={0}
                                        step={field.name.toLowerCase().includes('area') ? 0.01 : 1}
                                        value={field.value as number || ''}
                                        onChange={(e) => {
                                            const value = e.target.value === '' ? 0 : Number(e.target.value)
                                            onFieldChange(field.id, value)
                                        }}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder={getNumberPlaceholder(field.name)}
                                    />
                                    {field.name.toLowerCase().includes('area') && (
                                        <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">
                                            sq ft
                                        </span>
                                    )}
                                </div>
                            ) : fieldType === 'select' && selectOptions.length > 0 ? (
                                <select
                                    value={field.value as string || ''}
                                    onChange={(e) => {
                                        onFieldChange(field.id, e.target.value)
                                    }}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">Select {field.name}</option>
                                    {selectOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    value={field.value as string || ''}
                                    onChange={(e) => {
                                        onFieldChange(field.id, e.target.value)
                                    }}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder={`Enter ${field.name}`}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CategoryFieldsSection;