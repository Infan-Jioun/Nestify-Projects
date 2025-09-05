// components/Filters/OtherFeatures.tsx
"use client"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { AnimatePresence } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from "framer-motion"

interface OtherFeaturesProps {
    selectedFeatures: string[];
    onFeaturesChange: (features: string[]) => void;
}

export default function OtherFeatures({ selectedFeatures, onFeaturesChange }: OtherFeaturesProps) {
    const [open, setOpen] = useState(false)
    const features = [
        "Attic", "Basketball court", "Air Conditioning", "Lawn",
        "TV Cable", "Dryer", "Outdoor", "Shower", "Washer",
        "Lake view", "Wine celler", "Front yard", "Refrigerator"
    ];

    const toggleFeature = (feature: string) => {
        if (selectedFeatures.includes(feature)) {
            onFeaturesChange(selectedFeatures.filter((item) => item !== feature));
        } else {
            onFeaturesChange([...selectedFeatures, feature]);
        }
    }

    return (
        <div className='w-full max-w-sm rounded-lg p-4'>
            <div className='w-full mx-auto'>
                <Button
                    className='w-full rounded-3xl bg-green-500 text-white hover:bg-green-600'
                    onClick={() => setOpen(!open)}
                >
                    <SlidersHorizontal size={18} />
                    Other Features
                </Button>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className='overflow-hidden'
                    >
                        <div className='grid grid-cols-2 gap-3 mt-4'>
                            {features.map((feature) => (
                                <label className='flex gap-2' key={feature}>
                                    <Checkbox
                                        checked={selectedFeatures.includes(feature)}
                                        onCheckedChange={() => toggleFeature(feature)}
                                        className="mt-1"
                                        id={feature}
                                    />
                                    <Label className='text-black' htmlFor={feature}>
                                        {feature}
                                    </Label>
                                </label>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}