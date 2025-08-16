"use client"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { AnimatePresence } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from "framer-motion"
export default function OtherFeatures() {
    const [open, setOpen] = useState(false)
    const features = [
        "Attic",
        "Basketball court",
        "Air Conditioning",
        "Lawn",
        "TV Cable",
        "Dryer",
        "Outdoor",
        "Shower",
        "Washer",
        "Lake view",
        "Wine celler",
        "Front yard",
        "Refrigerator"
    ];
    const [selected, setSeclected] = useState<String[]>([
        "Attic", "Basketball court", "Air Conditioning", "Lawn"
    ])
    const toggleFeature = (feature: string) => {
        if (selected.includes(feature)) {
            setSeclected(selected.filter((filterItems) => filterItems !== feature));
        } else {
            setSeclected(selected.concat(feature))
        }
    }
    return (
        <div className='w-full max-w-sm border rounded-lg p-4 bg-green-100 shadow-sm'>

            <div>
                <Button className='bg-green-500 text-white hover:bg-green-600' onClick={() => setOpen(!open)}> <SlidersHorizontal size={18} />
                    Other Features</Button>
            </div>
            <AnimatePresence>
                {
                    open && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 10 }}
                            exit={{ height: 0, opacity: -0 }}
                            transition={{ duration: 0.8 }}
                            className='overflow-hidden'

                        >
                            <div className='grid grid-cols-2 gap-3 mt-4'>
                                {
                                    features.map((feature => (
                                        <label className='flex gap-2 ' key={feature} >
                                            <Checkbox
                                            checked={selected.includes(feature)}
                                            onCheckedChange={() => toggleFeature(feature)}
                                                className="mt-1  " id={feature} />
                                            <Label className='text-black' htmlFor={feature}>{feature}</Label>
                                        </label>
                                    )))
                                }
                            </div>
                        </motion.div>

                    )
                }
            </AnimatePresence>
        </div >
    )
}
