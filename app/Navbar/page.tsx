"use client";

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MdArrowOutward } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export default function NavbarPage() {

  const navLinks = <>
    <Link href={"/"}>Home</Link>
    <Link href={"/Properties"}>Properties</Link>
    <Link href={"/AddProperty"}>AddProperty</Link>
    <Link href={"/Contact"}>Contact</Link>
    <Link href={"/About"}>About</Link>

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
      <div className={`navbar bg-white   px-2 md:px-3 lg:px-44  p-5 translation-all duration-300 ease-in-out ${scrolled ? "fixed top-0 left-0 w-full translate-y-0 " : ""} z-50`}>
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow">
              {navLinks}
            </ul>
          </div>
          <a className=""><img className='w-24 -mt-3' src="https://i.ibb.co/RpTRch3g/Nestify.png" alt="logo" /></a>

        </div>
        <div className="navbar-center  hidden lg:flex  mr-[500px]  ">
          <ul className="menu menu-horizontal font-semibold   gap-4  text-[15px]">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end font-semibold ">
          <div className='flex  justify-center items-center gap-1'>
            <p className='text-xl'><RxAvatar /></p>
            <div className='mr-10 flex'>
              <a href="/Login">Login</a>/ <a href="/Register">Register</a>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.0, rotate: 5 }}
            whileTap={{ scale: 0.2 }}
            className="btn h-12 rounded-full bg-white  text-black   flex items-center justify-center transition"
          >
            Add Property
          </motion.button>
          
        </div>
      </div>
    </div>
  )
}
