import { DialogTitle } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SidebarHeader } from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
type Props = {
    navlinks: { name: string, href: string }[]
}
export default function LeftSidebar({ navlinks }: Props) {
    const pathname = usePathname();
    return (
        <div>

            <Sheet>
                <SheetTrigger>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 lg:h-10 w-7 lg:w-10 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <line x1="1" y1="8" x2="20" y2="8" />
                        <line x1="1" y1="16" x2="16" y2="16" />
                    </svg>
                </SheetTrigger>
                <SheetContent side="left" className="pt-10">
                    {/* Hidden title for accessibility */}
                    <DialogTitle className="sr-only">
                        Main Navigation Menu
                    </DialogTitle>

                    <SidebarHeader className="font-bold text-black text-xl text-center border-b-2 mb-5">
                        Welcome To Nestify
                    </SidebarHeader>
                    <nav className="space-y-4">
                        {navlinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block px-5 py-2 text-sm hover:border-r-4 hover:border-green-500 hover:bg-green-100 hover:text-green-600 text-[15px] font-semibold relative duration-300 before:absolute before:w-full before:h-[2px] before:origin-left before:scale-x-0 before:transition-transform before:duration-300 ${pathname === link.href
                                    ? "border-r-4 border-green-500 bg-green-100 text-green-600"
                                    : ""
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}


                    </nav>
                </SheetContent>
            </Sheet>
        </div>
    )
}
