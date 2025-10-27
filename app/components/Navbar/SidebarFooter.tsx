import { SidebarContent } from '@/components/ui/sidebar'
import { Facebook, Instagram, LinkedinIcon, Twitter } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function SidebarFooter() {
  return (
    <div>
      <SidebarContent className='px-5'>
        <div className='border-b pb-8'>
          <div className='flex justify-between '>
            <p className='text-sm text-gray-500'>Total Free Customer Care</p>
            <p className='text-sm text-gray-500'>Need Live Support?</p>
          </div>
          <div className='flex justify-between'>

            <p className='text-sm'>+8801610240096 </p>
            <Link href="/Contact" className='text-sm font-medium text-green-600'> Contact Us</Link>
          </div>
        </div>
        <div className='flex justify-between pt-7 px-2'>
          <div>
            <p className='font-bold'>Follow us</p>
          </div>
          <div className='flex justify-center  gap-2'>
            <Link className='text-sm' href={""}><Facebook /> </Link>
            <Link className='text-sm' href={""}><Twitter /> </Link>
            <Link className='text-sm' href={""}><Instagram /> </Link>
            <Link className='text-sm' href={"https://linkedin.com/in/infan-jioun-rahman"}><LinkedinIcon /> </Link>
          </div>
        </div>
      </SidebarContent>
    </div>
  )
}
