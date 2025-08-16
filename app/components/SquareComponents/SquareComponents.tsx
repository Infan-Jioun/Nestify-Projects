import { Input } from '@/components/ui/input'
import React from 'react'

export default function SquareComponents() {
  return (
    <div className='mt-5'>
        <div>
            <p className='font-semibold text-black'>Square Feet</p>
        </div>
    <div className='flex items-center gap-3 mt-3'>
        <Input type='number' placeholder='min' className='w-1/2'/>
        -
        <Input type='number' placeholder='max' className='w-1/2'/>
        

    </div>
    </div>
  )
}
