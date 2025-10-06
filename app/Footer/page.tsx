"use client"
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/LoginPage" || pathname === "/RegisterPage" || pathname === "/Authentication" || pathname === "/DeveloperRegister" || pathname.startsWith("/ResetPassword") || pathname.startsWith("/dashboard")) {
    return null;
  }
  return (
    <footer className="bg-white text-gray-700 border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Column 1: Address and Contact */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image src="https://i.ibb.co/RpTRch3g/Nestify.png" width={80} height={80} alt="logo" />

          </div>
          <p className="text-sm font-semibold">
            329 Queensberry Street, North Melbourne VIC 3051, Australia.
          </p>
          <p className="mt-4 text-sm">Total Free Customer Care</p>
          <p className="font-semibold text-sm">+(0) 123 050 945 02</p>
          <p className="mt-4 text-sm">Need Live Support?</p>
          <p className="text-sm font-medium text-blue-500">hi@Nestify.com</p>
        </div>

        {/* Column 2: Popular Search + Discover */}
        <div>
          <h3 className="font-semibold mb-3">Popular Search</h3>
          <ul className="space-y-2 text-sm">
            <li>Apartment for Rent</li>
            <li>Apartment Low to Hide</li>
            <li>Offices for Buy</li>
            <li>Offices for Rent</li>
          </ul>
          <h3 className="font-semibold mt-6 mb-3">Discover</h3>
          <ul className="space-y-2 text-sm">
            <li>Miami</li>
            <li>Los Angeles</li>
            <li>Chicago</li>
            <li>New York</li>
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>Pricing Plans</li>
            <li>Our Services</li>
            <li>Contact Support</li>
            <li>Careers</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Column 4: Newsletter + App Buttons */}
        <div>
          <h3 className="font-semibold mb-3">Keep Yourself Up to Date</h3>
          <div className="flex items-center border border-gray-300 rounded overflow-hidden">
            <Input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 text-sm outline-none"
            />
            <button className="bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 transition">
              ➤
            </button>
          </div>
          <h3 className="font-semibold mt-6 mb-3">Apps</h3>
          <div className="space-y-3">
            <button className="bg-black text-white w-full flex items-center justify-center py-2 rounded hover:bg-gray-800 transition">
              <span className="mr-2"></span> Apple Store
            </button>
            <button className="bg-black text-white w-full flex items-center justify-center py-2 rounded hover:bg-gray-800 transition">
              <span className="mr-2">▶</span> Google Play
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t text-sm py-6 px-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <p>© Nestify 2025  – All rights reserved</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
          <FaTwitter className="hover:text-blue-400 cursor-pointer" />
          <FaInstagram className="hover:text-pink-500 cursor-pointer" />
          <FaLinkedinIn className="hover:text-blue-700 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}
