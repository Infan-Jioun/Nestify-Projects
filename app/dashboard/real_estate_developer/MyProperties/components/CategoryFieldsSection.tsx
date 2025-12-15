import React from 'react'
import { Ruler, Bed, Bath, Layers, DoorOpen, Car, TreePine } from 'lucide-react'
import { UseFormRegister } from 'react-hook-form'
import { EditPropertyInputs } from './types/property-form.types'

interface CategoryField {
    name: string
    label: string
    type: 'number' | 'text'
}

interface CategoryFieldsSectionProps {
    categoryName: string
    categoryFields: CategoryField[]
    register: UseFormRegister<EditPropertyInputs>
}

const getFieldIcon = (fieldName: string) => {
    switch (fieldName) {
        case 'bedrooms': return <Bed className="w-4 h-4" />
        case 'bathrooms': return <Bath className="w-4 h-4" />
        case 'floor': return <Layers className="w-4 h-4" />
        case 'kitchen': return <DoorOpen className="w-4 h-4" />
        case 'parkingSpaces': return <Car className="w-4 h-4" />
        case 'landArea': return <TreePine className="w-4 h-4" />
        case 'floorArea': return <Ruler className="w-4 h-4" />
        default: return <Ruler className="w-4 h-4" />
    }
}

export function CategoryFieldsSection({
    categoryName,
    categoryFields,
    register
}: CategoryFieldsSectionProps) {
    if (!categoryName || categoryFields.length === 0) return null

    return (
        <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-medium text-foreground flex items-center gap-2">
                <Ruler className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                {categoryName} Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {categoryFields.map((field) => (
                    <div key={field.name} className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                            {getFieldIcon(field.name)}
                            {field.label} {field.type === 'number' ? '' : ''}
                        </label>
                        {field.type === 'number' ? (
                            <input
                                type="number"
                                {...register(field.name as keyof EditPropertyInputs)}
                                className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                min={0}
                            />
                        ) : (
                            <input
                                type="text"
                                {...register(field.name as keyof EditPropertyInputs)}
                                className="w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}