import { Input } from '@/components/ui/input'
import { SidebarHeader } from '@/components/ui/sidebar'
import { SearchIcon } from 'lucide-react'
import React from 'react'

export default function SearchBar() {
  return (
    <SidebarHeader className="font-bold text-black px-4 text-xl text-center border-b-2 mb-5">
    <div className="relative w-full">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
        <SearchIcon className="w-4 h-4" />
      </div>

      {/* Search Input */}
      <Input
        type="search"
        placeholder="Search your need"
        className="pl-9 pr-3 py-2 w-full  border-green-500   focus:ring-green-500"
      />
    </div>
  </SidebarHeader>
  )
}
