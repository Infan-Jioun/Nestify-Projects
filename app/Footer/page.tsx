"use client"
import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { setSkletonLoader } from '@/app/features/loader/loaderSlice';
import { RootState } from '@/lib/store';

export default function Footer() {
  const dispatch = useDispatch();
  const skletonLoader = useSelector((state: RootState) => state.loader.skletonLoader);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  
  // Simulate data loading
  useEffect(() => {
    dispatch(setSkletonLoader(true));
    setLoading(true);
    
    const timer = setTimeout(() => {
      setLoading(false);
      dispatch(setSkletonLoader(false));
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (pathname === "/LoginPage" || pathname === "/RegisterPage" || pathname === "/ResetPassword" || pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="bg-white text-gray-700 border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Column 1: Address and Contact */}
        <div>
          {loading || skletonLoader ? (
            <>
              <div className="w-20 h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Column 2: Popular Search + Discover */}
        <div>
          {loading || skletonLoader ? (
            <>
              <div className="h-5 bg-gray-200 rounded animate-pulse w-32 mb-3"></div>
              <ul className="space-y-2 mb-6">
                {[1, 2, 3, 4].map((item) => (
                  <li key={item} className="h-4 bg-gray-200 rounded animate-pulse w-40"></li>
                ))}
              </ul>
              <div className="h-5 bg-gray-200 rounded animate-pulse w-32 mb-3"></div>
              <ul className="space-y-2">
                {[1, 2, 3, 4].map((item) => (
                  <li key={item} className="h-4 bg-gray-200 rounded animate-pulse w-32"></li>
                ))}
              </ul>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Column 3: Quick Links */}
        <div>
          {loading || skletonLoader ? (
            <>
              <div className="h-5 bg-gray-200 rounded animate-pulse w-32 mb-3"></div>
              <ul className="space-y-2">
                {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                  <li key={item} className="h-4 bg-gray-200 rounded animate-pulse w-40"></li>
                ))}
              </ul>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Column 4: Newsletter + App Buttons */}
        <div>
          {loading || skletonLoader ? (
            <>
              <div className="h-5 bg-gray-200 rounded animate-pulse w-48 mb-3"></div>
              <div className="flex items-center border border-gray-300 rounded overflow-hidden mb-6">
                <div className="w-full h-10 bg-gray-200 animate-pulse"></div>
                <div className="w-12 h-10 bg-gray-300 animate-pulse"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded animate-pulse w-20 mb-3"></div>
              <div className="space-y-3">
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </>
          ) : (
            <>
              <h3 className="font-semibold mb-3">Keep Yourself Up to Date</h3>
              <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                <input
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
            </>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t text-sm py-6 px-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        {loading || skletonLoader ? (
          <>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
              ))}
            </div>
          </>
        ) : (
          <>
            <p>© Nestify 2025 – All rights reserved</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
              <FaTwitter className="hover:text-blue-400 cursor-pointer" />
              <FaInstagram className="hover:text-pink-500 cursor-pointer" />
              <FaLinkedinIn className="hover:text-blue-700 cursor-pointer" />
            </div>
          </>
        )}
      </div>
    </footer>
  );
}