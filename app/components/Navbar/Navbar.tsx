"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { SidebarHeader } from "@/components/ui/sidebar";
import { RxAvatar } from "react-icons/rx";
import { DropdownAvatar } from "./DropdownAvatar";
import SearchBar from "./SearchBar";
import SidebarFooter from "./SidebarFooter";
import Image from "next/image";
import { DialogTitle } from "@radix-ui/react-dialog";

const navlinks = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/Properties" },
  { name: "About", href: "/About" },
];

const links = [
  { name: "Apartments", href: "/ApartmentsPage" },
  { name: "Bungalow", href: "/BungalowPage" },
  { name: "Houses", href: "/HousesPage" },
  { name: "Loft", href: "/LoftPage" },
  { name: "Office", href: "/officePage" },
  { name: "Townhome", href: "/TownhomePage" },
  { name: "Vila", href: "/VilaPage" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/LoginPage" || pathname === "/RegisterPage" || pathname === "/ResetPassword" || pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header
      className={`bg-white transition-all duration-300 ease-in-out ${scrolled ? "fixed top-0 left-0 w-full z-50 shadow-md" : ""
        }`}
    >
      <div className="container mx-auto px-4 md:px-5 lg:px-24 py-3 flex items-center justify-between">
        {/* Mobile Left Menu */}
        <div className="lg:hidden flex items-center">
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

                <div className="mt-6 border-t pt-4">
                  {session ? (
                    <Button
                      variant="outline"
                      onClick={() => signOut()}
                      className="w-full h-10 hover:border-green-500 hover:bg-green-100 hover:text-green-600"
                    >
                      <LogOutIcon /> Logout
                    </Button>
                  ) : (
                    <Link href="/LoginPage">
                      <motion.button
                        whileHover={{ scale: 1.0 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-4 flex justify-center items-center p-2 gap-2 rounded-full hover:text-white bg-green-500 text-white hover:bg-green-600 font-semibold transition"
                      >
                        <LogInIcon /> Login
                      </motion.button>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo + Desktop Nav */}
        <div className="flex justify-center items-center gap-10">
          <Link href="/" className="">
            <Image
              className="mr-7 -mt-3 mx-auto"
              src="https://i.ibb.co/RpTRch3g/Nestify.png"
              alt="logo"
              width={80}
              height={80}
            />
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex space-x-6">
              {navlinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-[15px] font-semibold relative inline-block duration-300
    before:content-[''] 
    before:absolute 
    before:bottom-[-4px] 
    before:left-0 
    before:w-full 
    before:h-[2px] 
    before:bg-green-500 
    before:origin-left 
    before:transform 
    before:scale-x-0 
    before:transition-transform 
    before:duration-300 
    hover:before:scale-x-100
    ${pathname === link.href ? "text-green-500 before:scale-x-100" : "text-black"}`}
                  >
                    {link.name}
                  </Link>

                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4">
            {session ? null : (
              <div className="flex">
                <Link href="/LoginPage" className="font-semibold">
                  Login
                </Link>
                /
                <Link href="/RegisterPage" className="font-semibold">
                  Register
                </Link>
              </div>
            )}



          </div>
          {/* Property Button */}
          <div className="hidden sm:block">
            <motion.button
              whileHover={{ scale: 1.0 }}
              whileTap={{ scale: 0.95 }}
              className="btn h-10 px-4 rounded-full bg-white text-black border border-gray-300 hover:text-green-500 transition"
            >
              Property
            </motion.button>
          </div>
          {/* Right Menu */}
          <div className="hidden lg:block">
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
                <SearchBar />

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
            </Sheet>
          </div>

          {session ? (
            <DropdownAvatar />
          ) : (
            <div className="block lg:hidden">
              <Link href="/LoginPage" className="text-xl">
                <RxAvatar />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}