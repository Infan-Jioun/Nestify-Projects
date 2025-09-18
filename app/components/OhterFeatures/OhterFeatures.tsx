"use client"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { AnimatePresence, motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/lib/store'
import { setOtherFeatures } from '@/app/features/filter/filterSlice'

export default function OtherFeatures() {
    const dispatch = useDispatch<AppDispatch>()
    const selectedFeatures = useSelector((state: RootState) => state.filter.otherFeatures)
    const [open, setOpen] = useState(false)

    const features = [
        "Attic", "Basketball court", "Air Conditioning", "Lawn", "TV Cable",
        "Dryer", "Outdoor", "Shower", "Washer", "Lake view",
        "Wine celler", "Front yard", "Refrigerator"
    ];

    const toggleFeature = (feature: string) => {
        if (selectedFeatures.includes(feature)) {
            dispatch(setOtherFeatures(selectedFeatures.filter(f => f !== feature)))
        } else {
            dispatch(setOtherFeatures([...selectedFeatures, feature]))
        }
    }

    return (
        <div className='w-full max-w-sm rounded-lg p-4'>
            <div className='w-full mx-auto'>
                <Button className='w-full rounded-3xl bg-green-500 text-white hover:bg-green-600 flex items-center gap-2' onClick={() => setOpen(!open)}>
                    <SlidersHorizontal size={18} /> Other Features
                </Button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className='overflow-hidden mt-4'
                    >
                        <div className='grid grid-cols-2 gap-3'>
                            {features.map(feature => (
                                <label className='flex gap-2 items-center' key={feature}>
                                    <Checkbox
                                        checked={selectedFeatures.includes(feature)}
                                        onCheckedChange={() => toggleFeature(feature)}
                                        id={feature}
                                    />
                                    <Label htmlFor={feature}>{feature}</Label>
                                </label>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
