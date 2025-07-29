"use client";

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MdArrowOutward } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export default function NavbarPage() {

  const navLinks = <>
    <Link
      href="/"
      className="font-semibold relative inline-block transition-colors duration-300 
             before:content-[''] before:absolute before:bottom-[-2px] 
             before:w-full   before:h-[2px] before:bg-green-500
             before:scale-0 
             before:transition-transform before:duration-300 hover:before:scale-100 rounded"
    >
      Home
    </Link>

    <Link href="/Properties" className="   font-semibold relative inline-block transition-colors duration-300 
             before:content-[''] before:absolute before:bottom-[-2px] 
             before:w-full   before:h-[2px] before:bg-green-500
             before:scale-0 
             before:transition-transform before:duration-300 hover:before:scale-100 rounded transition">Properties</Link>
    <Link href="/AddProperty" className="  font-semibold relative inline-block transition-colors duration-300 
             before:content-[''] before:absolute before:bottom-[-2px] 
             before:w-full   before:h-[2px] before:bg-green-500
             before:scale-0 
             before:transition-transform before:duration-300 hover:before:scale-100 rounded transition">AddProperty</Link>
    <Link href="/Contact" className="      font-semibold relative inline-block transition-colors duration-300 
             before:content-[''] before:absolute before:bottom-[-2px] 
             before:w-full   before:h-[2px] before:bg-green-500
             before:scale-0 
             before:transition-transform before:duration-300 hover:before:scale-100 rounded transition">Contact</Link>
    <Link href="/About" className="        font-semibold relative inline-block transition-colors duration-300 
             before:content-[''] before:absolute before:bottom-[-2px] 
             before:w-full   before:h-[2px] before:bg-green-500
             before:scale-0 
             before:transition-transform before:duration-300 hover:before:scale-100 rounded transition">About</Link>

  </>
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
  return (
    <div className=' '>
      <div className={`navbar bg-white   px-3 md:px-3 lg:px-44  p-3 lg:p-5 translation-all duration-300 ease-in-out ${scrolled ? "fixed top-0 left-0 w-full translate-y-0 " : ""} z-50`}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <img className='w-5 h-5 ' src="https://i.ibb.co/cSZyRY8N/menu-navigation-grid-1528-svgrepo-com.png" alt="" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow">
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

          <div className=' hidden lg:flex  mr-[400px]'>
            <ul className="menu menu-horizontal font-semibold   gap-6  text-[16px]">
              {navLinks}
            </ul>
          </div>
        </div>
        <div className="navbar-end font-semibold ">
          <div className='flex  justify-center items-center gap-1'>
            <Link href={"/Login"} className='text-xl h-5 w-5 mr-2'><RxAvatar /></Link>
            <div className='mr-10 hidden lg:flex'>
              <a href="/Login" className='text-[16px]'>Login</a>/ <a href="/Register" className='text-[16px]'>Register</a>
            </div>
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
    </div>
  )
}
