"use client"
import React from 'react'
import { Star } from 'lucide-react'
import {
    Dumbbell, Car, Shield, TreePine, Square, ArrowUp,
    ThermometerSun, Wifi, PawPrint, Sofa
} from 'lucide-react'
import { FaSwimmingPool } from 'react-icons/fa'
import { FacilityType } from './types/property-form.types'


interface FacilitiesSectionProps {
    facilities?: string[]
    onFacilityChange: (facility: string, checked: boolean) => void
}

const commonFacilities: FacilityType[] = [
    { id: 'pool', name: 'Swimming Pool', icon: FaSwimmingPool },
    { id: 'gym', name: 'Gym', icon: Dumbbell },
    { id: 'parking', name: 'Parking', icon: Car },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'garden', name: 'Garden', icon: TreePine },
    { id: 'balcony', name: 'Balcony', icon: Square },
    { id: 'elevator', name: 'Elevator', icon: ArrowUp },
    { id: 'ac', name: 'Air Conditioning', icon: ThermometerSun },
    { id: 'heating', name: 'Heating', icon: ThermometerSun },
    { id: 'wifi', name: 'WiFi', icon: Wifi },
    { id: 'pets', name: 'Pet Friendly', icon: PawPrint },
    { id: 'furnished', name: 'Furnished', icon: Sofa }
]

const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({
    facilities = [], // ✅ Default empty array
    onFacilityChange
}) => {
    return (
        <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-medium text-foreground flex items-center gap-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Facilities & Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {commonFacilities.map((facility) => {
                    const IconComponent = facility.icon
                    const isChecked = facilities.includes(facility.name) // ✅ Now safe

                    return (
                        <label
                            key={facility.id}
                            className={`flex items-center space-x-2 p-2 sm:p-3 rounded-md border text-xs sm:text-sm font-medium cursor-pointer transition-colors ${isChecked
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground'
                                }`}
                        >
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => onFacilityChange(facility.name, e.target.checked)}
                                className="rounded border-primary text-primary focus:ring-primary sr-only"
                            />
                            <span className="flex items-center gap-1 sm:gap-2">
                                <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden xs:inline">{facility.name}</span>
                                <span className="xs:hidden text-xs">{facility.name.split(' ')[0]}</span>
                            </span>
                        </label>
                    )
                })}
            </div>
        </div>
    )
}

export default FacilitiesSection