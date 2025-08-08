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
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogInIcon, Menu, X } from "lucide-react";
import { FaSignOutAlt } from "react-icons/fa";
import { SidebarHeader } from "@/components/ui/sidebar";

const links = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/Properties" },
  { name: "Add Property", href: "/AddProperty" },
  { name: "Contact", href: "/Contact" },
  { name: "About", href: "/About" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/LoginPage" || pathname === "/RegisterPage") {
    return null;
  }

  return (
    <header
      className={`bg-white transition-all duration-300  ease-in-out ${scrolled ? "fixed top-0 left-0 w-full z-50 shadow-md" : ""
        }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">

        <div className="lg:hidden flex items-center">
          <Sheet>
            <SheetTrigger>
              <svg xmlns="http://www.w3.org/2000/svg"
                className="h-8 lg:h-10 w-8 lg:w-10 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <line x1="1" y1="8" x2="20" y2="8" />
                <line x1="1" y1="16" x2="16" y2="16" />
              </svg>
            </SheetTrigger>
            <SheetContent side="left" className="pt-10 px-4">
        
              <SidebarHeader className="font-bold text-black text-xl text-center border-b-2 mb-5">Welcome To Nestify</SidebarHeader>
              <nav className="space-y-4">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-3 py-2  text-sm transition-colors hover:bg-green-500 hover:text-white hover:rounded-full text-[16px] font-semibold relative  duration-300 before:content-[''] before:absolute before:bottom-[-4px] before:w-full before:h-[2px] before:origin-left before:bg-green-500 before:scale-x-0 before:transition-transform before:duration-300  rounded ${pathname === link.href
                      ? "bg-green-500 rounded-full text-white"
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
                      className="w-full  h-10 hover:text-white  px-4 rounded-full bg-green-500 text-white  hover:bg-green-500 transition"
                    >
                      <FaSignOutAlt /> Logout
                    </Button>
                  ) : (
                    <>

                      <Link href="/LoginPage">

                        <motion.button
                          whileHover={{ scale: 1.0, rotate: 0 }}
                          whileTap={{ scale: 0.100 }}
                          className="  w-full px-4 flex  justify-center items-center p-2 gap-2 rounded-full hover:text-white bg-green-500 text-white  hover:bg-green-600 font-semibold transition"
                        >
                          <LogInIcon />  Login
                        </motion.button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>


        <Link href="/" className="">
          <img
            className="w-24 mr-7 -mt-3 mx-auto"
            src="https://i.ibb.co/RpTRch3g/Nestify.png"
            alt="logo"
          />
        </Link>


        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="flex space-x-6">
            {links.map((link) => (
              <NavigationMenuItem key={link.href}>
                <Link
                  href={link.href}
                  className={`text-[16px] font-semibold relative inline-block duration-300 before:content-[''] before:absolute before:bottom-[-4px] before:w-full before:h-[2px] before:origin-left before:bg-green-500 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 rounded ${pathname === link.href ? "" : "text-black"
                    }`}
                >
                  {link.name}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>


        <div className="flex items-center gap-4">

          <div className="hidden lg:flex items-center gap-4">
            {session ? (
              <></>
            ) : (
              <div className="flex">
                <Link href="/LoginPage" className="font-semibold">Login</Link>/
                <Link href="/RegisterPage" className="font-semibold">Register</Link>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.0, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="btn h-10 px-4 rounded-full bg-white text-black border border-gray-300 hover:text-green-500 transition"
            >
              Property
            </motion.button>
          </div>


          <div className="hidden lg:block">
            <Sheet>
              <SheetTrigger>
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mt-3 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <line x1="1" y1="7" x2="20" y2="7" />
                  <line x1="6" y1="13" x2="20" y2="13" />
                </svg>
              </SheetTrigger>
              <SheetContent side="right" className="pt-10">
                <nav className="space-y-4">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-3 py-2 rounded text-sm font-medium transition-colors hover:bg-gray-100 ${pathname === link.href
                        ? "text-green-600"
                        : "text-gray-700"
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
                        className="w-full"
                      >
                        Logout
                      </Button>
                    ) : (
                      <>
                        <Link href="/LoginPage">
                          <Button variant="ghost" className="w-full mb-2">
                            Login
                          </Button>
                        </Link>
                        <Link href="/RegisterPage">
                          <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                            Register
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
