import { DialogTitle } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SidebarHeader } from '@/components/ui/sidebar'
import React from 'react'

import Link from 'next/link'
import SidebarFooter from './SidebarFooter'
import { usePathname } from 'next/navigation'
import SearchBar from './Search/SearchBar'
type Props = {
    links: { name: string, href: string }[]
}
export default function RightSidebar({ links }: Props) {
    const pathname = usePathname();
    return (
        <div>
            <Sheet>
                <SheetTrigger>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 mt-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="1" y1="7" x2="20" y2="7" />
                        <line x1="6" y1="13" x2="20" y2="13" />
                    </svg>
                </SheetTrigger>
                <SheetContent side="right" className="pt-10">
                    {/* Hidden title for accessibility */}
                    <DialogTitle className="sr-only">
                        Browse Listings
                    </DialogTitle>

                    <SidebarHeader className="font-bold text-black text-xl text-center border-b-2 mb-5">
                        Browse Listings
                    </SidebarHeader>
             <div className='px-5 mb-5'>
             {/* <SearchBar /> */}
             </div>

                    <nav className="space-y-4">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block px-5 py-2 text-sm hover:border-l-4 hover:border-green-500 hover:bg-green-100 hover:text-green-600 text-[15px] font-semibold relative duration-300 before:absolute before:w-full before:h-[2px] before:origin-left before:scale-x-0 before:transition-transform before:duration-300 ${pathname === link.href
                                    ? "border-l-4 border-green-500 bg-green-100 text-green-600"
                                    : ""
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="mt-6 border-t pt-7">
                            <SidebarFooter />
                        </div>
                    </nav>
                </SheetContent>
            </Sheet></div>
    )
}
