"use client";

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { RxAvatar } from 'react-icons/rx';
import { motion } from "framer-motion";
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';


export default function NavbarPage() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = (): void => {
      // console.log( "postion", window.scrollY);
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  if (pathname === "/LoginPage" || pathname === "/RegisterPage") {
    return null
  }
  // SignOut
  const handleSignOut = async () => {
    await signOut()
  }
  const navLinks = <>
    <Link
      href="/"
      className="font-semibold relative inline-block  duration-300 
             before:content-[''] before:absolute before:bottom-[-4px] 
             before:w-full   before:h-[2px] before:origin-left before:bg-green-500
             before:scale-x-0
             before:transition-transform before:duration-300 hover:before:scale-x-100 rounded "
    >
      Home
    </Link>

    <Link href="/Properties" className="   font-semibold relative inline-block  duration-300 
             before:content-[''] before:absolute before:bottom-[-4px] 
             before:w-full   before:h-[2px] before:origin-left before:bg-green-500
             before:scale-x-0
             before:transition-transform before:duration-300 hover:before:scale-x-100 rounded ">Properties</Link>
    <Link href="/AddProperty" className="  font-semibold relative inline-block  duration-300 
             before:content-[''] before:absolute before:bottom-[-4px] 
             before:w-full   before:h-[2px] before:origin-left before:bg-green-500
             before:scale-x-0
             before:transition-transform before:duration-300 hover:before:scale-x-100 rounded ">AddProperty</Link>
    <Link href="/Contact" className="      font-semibold relative inline-block  duration-300 
             before:content-[''] before:absolute before:bottom-[-4px] 
             before:w-full   before:h-[2px] before:origin-left before:bg-green-500
             before:scale-x-0
             before:transition-transform before:duration-300 hover:before:scale-x-100 rounded ">Contact</Link>
    <Link href="/About" className="        font-semibold relative inline-block  duration-300 
             before:content-[''] before:absolute before:bottom-[-4px] 
             before:w-full   before:h-[2px] before:origin-left before:bg-green-500
             before:scale-x-0
             before:transition-transform before:duration-300 hover:before:scale-x-100 rounded ">About</Link>

  </>

  return (
    <div className=' '>
      <div className={`navbar bg-white   px-8 md:px-7 lg:px-44  p-3 lg:p-5 translation-all duration-300 ease-in-out ${scrolled ? "fixed top-0 left-0 w-full translate-y-0  " : "before:transition-transform before:duration-75 hover:before:scale-x-100"} z-50`}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className=" lg:hidden">
              <img className='w-5 h-5 ' src="https://i.ibb.co/cSZyRY8N/menu-navigation-grid-1528-svgrepo-com.png" alt="" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content   z-1 mt-3 w-52 p-2 shadow">
              {navLinks}
            </ul>
          </div>
          {/* Logo */}
          <div className=' lg:block hidden'>
            <a className=""><img className='w-24  -mt-3' src="https://i.ibb.co/RpTRch3g/Nestify.png" alt="logo" /></a>
          </div>

        </div>
        <div className="navbar-center   ">
          {/* Logo */}
          <div className='block  lg:hidden'>
            <a className=""><img className='w-24  -mt-3' src="https://i.ibb.co/RpTRch3g/Nestify.png" alt="logo" /></a>
          </div>

          <div className=' hidden lg:flex  mr-[550px]'>
            <ul className="menu menu-horizontal font-semibold   gap-5  text-[15px]">
              {navLinks}
            </ul>
          </div>
        </div>
        <div className='navbar-end font-semibold'>
          {
            session ? (

              <div className=''>
                <p className=''>{session?.user?.name}</p>
                <button onClick={handleSignOut}>Logout</button>
              </div>

            ) : (
              <div className=" ">
                <div className='flex  justify-center items-center gap-1'>
                  <Link href={"/LoginPage"} className='text-xl h-5 w-5 mr-2'><RxAvatar /></Link>
                  <div className='mr-10 hidden lg:flex'>
                    <Link href="/LoginPage" className="not-odd:text-[16px] font-semibold relative inline-block  duration-300 
             before:content-[''] before:absolute before:bottom-[-4px] 
             before:w-full   before:h-[2px] before:origin-left before:bg-green-500
             before:scale-x-0
             before:transition-transform before:duration-300 hover:before:scale-x-100 rounded">Login</Link>/ <Link href="/RegisterPage" className="text-[16px]font-semibold relative inline-block  duration-300 
             before:content-[''] before:absolute before:bottom-[-4px] 
             before:w-full   before:h-[2px] before:origin-left before:bg-green-500
             before:scale-x-0
             before:transition-transform before:duration-300 hover:before:scale-x-100 rounded ">Register</Link>
                  </div>
                </div>


              </div>

            )
          }
        </div>
        <div className='hidden md:block'>
          <motion.button
            whileHover={{ scale: 1.0, rotate: 5 }}
            whileTap={{ scale: 0.2 }}
            className="btn h-12 rounded-full bg-white  text-black hover:text-green-500  flex items-center justify-center transition"
          >
            Property
          </motion.button>
        </div>
      </div>
    </div>
  )
}
