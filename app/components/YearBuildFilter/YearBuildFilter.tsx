import { Input } from '@/components/ui/input'
import React from 'react'

export default function YearBuildFilter() {
    return (
        <div className='mt-5'>
            <div>
                <p className='font-semibold text-black'>createdAt</p>
            </div>
            <div className='flex items-center gap-3 mt-3'>
                <Input type='number' placeholder='2019' className='w-1/2' />
                -
                <Input type='number' placeholder='2025' className='w-1/2' />


            </div>
        </div>
    )
}
