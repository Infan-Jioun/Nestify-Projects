"use client"
import React, { useState, FormEvent } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

interface NewsletterState {
  email: string;
  isLoading: boolean;
  status: {
    type: 'success' | 'error' | null;
    message: string;
  };
}

export default function Footer() {
  const pathname = usePathname();
  const [newsletter, setNewsletter] = useState<NewsletterState>({
    email: '',
    isLoading: false,
    status: { type: null, message: '' }
  });

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newsletter.email) {
      setNewsletter(prev => ({
        ...prev,
        status: { type: 'error', message: 'Please enter your email address' }
      }));
      return;
    }

    setNewsletter(prev => ({ ...prev, isLoading: true, status: { type: null, message: '' } }));

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletter.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setNewsletter(prev => ({
          email: '',
          isLoading: false,
          status: { type: 'success', message: data.message }
        }));
      } else {
        setNewsletter(prev => ({
          ...prev,
          isLoading: false,
          status: { type: 'error', message: data.error }
        }));
      }
    } catch (error) {
      setNewsletter(prev => ({
        ...prev,
        isLoading: false,
        status: { type: 'error', message: 'Network error. Please try again.' }
      }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewsletter(prev => ({
      ...prev,
      email: e.target.value,
      status: { type: null, message: '' } // Clear status when user starts typing
    }));
  };

  if (pathname === "/LoginPage" || pathname === "/RegisterPage" || pathname === "/Authentication" || pathname === "/DeveloperRegister" || pathname === "verify-email" || pathname.startsWith("/ResetPassword") || pathname.startsWith("/dashboard")) {
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
            <li>Dhaka</li>
            <li>Chattogram</li>
            <li>Sylhet</li>
            <li>Rajshahi</li>
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

          {/* Status Message */}
          {newsletter.status.message && (
            <div className={`p-3 rounded-lg mb-4 text-sm ${newsletter.status.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
              {newsletter.status.message}
            </div>
          )}

          <form onSubmit={handleNewsletterSubmit} className="space-y-3">
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <Input
                type="email"
                placeholder="Your Email"
                value={newsletter.email}
                onChange={handleEmailChange}
                className="w-full px-4 py-2 text-sm outline-none border-none"
                disabled={newsletter.isLoading}
                required
              />
              <button
                type="submit"
                disabled={newsletter.isLoading}
                className="bg-green-500 text-white px-4 py-2 text-sm hover:bg-green-600 disabled:bg-gray-400 transition min-w-[60px] flex items-center justify-center"
              >
                {newsletter.isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  '➤'
                )}
              </button>
            </div>
          </form>

          <p className="text-xs text-gray-500 mt-2">
            Subscribe to get updates on new properties and exclusive offers
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t text-sm py-6 px-6 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
        <p>© Nestify 2025 – All rights reserved</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <FaFacebookF className="hover:text-blue-600 cursor-pointer w-5 h-5" />
          <FaTwitter className="hover:text-blue-400 cursor-pointer w-5 h-5" />
          <FaInstagram className="hover:text-pink-500 cursor-pointer w-5 h-5" />
          <FaLinkedinIn className="hover:text-blue-700 cursor-pointer w-5 h-5" />
        </div>
      </div>
    </footer>
  );
}