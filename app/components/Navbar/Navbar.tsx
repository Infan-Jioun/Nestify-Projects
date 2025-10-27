"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { RxAvatar } from "react-icons/rx";
import Image from "next/image";
import { DropdownAvatar } from "./DropdownAvatar";
import RightSidebar from "./RightSidebar";
import LeftSidebar from "./LeftSidebar";
import { UserRole } from "@/app/Types/auth";
export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const userRole = session?.user?.role as UserRole
  const userId = session?.user?.id;
  const [scrolled, setScrolled] = useState(false);

  const navlinks = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/Properties" },

    ...(session && (session.user.role === UserRole.ADMIN || session.user.role === UserRole.REAL_ESTATE_DEVELOPER)
      ? [{ name: "Dashboard", href: `/dashboard/${userRole.toLowerCase()}/${userId}` }]
      : []),
    { name: "Blog", href: "/Blog" },
    { name: "About", href: "/About" },
    { name: "Contact", href: "/Contact" },
  ];
  const links = [
    { name: "Apartment", href: "/Apartment" },
    { name: "House", href: "/House" },
    { name: "Duplex", href: "/Duplex" },
    { name: "Office Space", href: "/OfficeSpace" },
    { name: "Shop", href: "/Shop" },
    { name: "Warehouse", href: "/Warehouse" },
    { name: "Hotel", href: "/Hotel" },
  ];
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/LoginPage" || pathname === "/RegisterPage" || pathname === "/Authentication" || pathname === "/DeveloperRegister" || pathname === "/verify-email" || pathname.startsWith("/ResetPassword") || pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header
      className={`bg-white transition-all duration-300 ease-in-out ${scrolled ? "fixed top-0 left-0 w-full z-50 shadow-md" : ""
        }`}
    >
      <div className="container mx-auto px-4 md:px-5 lg:px-20 py-3 flex items-center justify-between">
        <div className="lg:hidden flex items-center">
          <LeftSidebar navlinks={navlinks} />
        </div>
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
                    className={`text-[15px] font-semibold relative inline-block duration-300   before:content-[''] before:absolute before:bottom-[-4px] before:left-0 before:w-full before:h-[2px] before:bg-green-500 before:origin-left before:transform before:scale-x-0 before:transition-transform before:duration-300  hover:before:scale-x-100
                ${pathname === link.href ? "text-green-500 before:scale-x-100" : "text-black"}`}
                  >
                    {link.name}
                  </Link>

                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4">
            {session ? null : (
              <div className="flex">
                <Link href="/LoginPage" className="font-semibold">
                  Login
                </Link>
                /
                <Link href="/Authentication" className="font-semibold">
                  Register
                </Link>
              </div>
            )}



          </div>
          {/* <SearchBox /> */}
          {/* Property Button */}
          <div className="hidden sm:block">
            <Link href={"/Properties/UserBookings"}>
              <motion.button
                whileHover={{ scale: 1.0 }}
                whileTap={{ scale: 0.95 }}
                className="btn h-10 px-4 rounded-full bg-white text-black border border-gray-300 hover:text-green-500 transition"
              >
                My Bookings
              </motion.button>
            </Link>
          </div>
          {/* Right Menu */}
          <div className="hidden lg:block">
            <RightSidebar links={links} />
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