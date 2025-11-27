"use client"
import React, { useState, FormEvent } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

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
      status: { type: null, message: '' }
    }));
  };

  if (pathname === "/LoginPage" || pathname === "/RegisterPage" || pathname === "/Authentication" || pathname === "/DeveloperRegister" || pathname.startsWith("/verify-email") || pathname.startsWith("/ResetPassword") || pathname.startsWith("/dashboard")) {
    return null;
  }

  const districts = [
    { name: "Dhaka", href: "/DetailsDistrict/Dhaka" },
    { name: "Chattogram", href: "/DetailsDistrict/Chattogram" },
    { name: "Sylhet", href: "/DetailsDistrict/Sylhet" },
    { name: "Rajshahi", href: "/DetailsDistrict/Rajshahi" },
    { name: "Khulna", href: "/DetailsDistrict/Khulna" },
    { name: "Barishal", href: "/DetailsDistrict/Barishal" },
    { name: "Rangpur", href: "/DetailsDistrict/Rangpur" },
    { name: "Mymensingh", href: "/DetailsDistrict/Mymensingh" },
  ];

  const quickLinks = [
    { name: "About Us", href: "/About" },
    { name: "Properties", href: "/Properties" },
    { name: "Blog", href: "/Blog" },
    { name: "Contact", href: "/Contact" }
  ];

  const popularSearches = [
    { name: "Apartment", href: "/category/Apartment" },
    { name: "House", href: "/category/House" },
    { name: "Warehouse", href: "/category/Warehouse" },
    { name: "Shop", href: "/category/Shop" },
  ];

  const legalLinks = [
    { name: "Terms of Use", href: "/" },
    { name: "Privacy Policy", href: "/" },
    { name: "Cookie Policy", href: "/" },
    { name: "Disclaimer", href: "/" }
  ];

  return (
    <footer className="bg-white text-gray-800 border-t">
      {/* Main Footer Content */}
      <div className="px-4 md:px-5 lg:px-44 py-16">
        {/* Top Section - Company Info & Links */}
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="https://i.ibb.co/RpTRch3g/Nestify.png"
                width={120}
                height={45}
                alt="Nestify Logo"
                className=""
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <FaMapMarkerAlt className="w-4 h-4 text-green-500" />
                <span className="text-sm">Panchlish, Chattogram, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaPhone className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">+8801610240096</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaEnvelope className="w-4 h-4 text-green-500" />
                <span className="text-sm">info@nestify.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-green-500 transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <FaArrowRight className="w-3 h-3 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Searches */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-900">Popular Searches</h3>
            <ul className="space-y-3">
              {popularSearches.map((search) => (
                <li key={search.name}>
                  <Link
                    href={search.href}
                    className="text-gray-600 hover:text-green-500 transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <FaArrowRight className="w-3 h-3 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {search.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-gray-900">Stay Updated</h3>
            <p className="text-gray-600 text-sm mb-6">
              Subscribe to get updates on new properties and exclusive offers
            </p>

            {newsletter.status.message && (
              <div className={`p-3 rounded-lg mb-4 text-sm ${newsletter.status.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                {newsletter.status.message}
              </div>
            )}

            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletter.email}
                  onChange={handleEmailChange}
                  className="flex-1 px-4 py-3 text-sm bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  disabled={newsletter.isLoading}
                  required
                />
                <button
                  type="submit"
                  disabled={newsletter.isLoading}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed min-w-[120px] flex items-center justify-center shadow-sm hover:shadow-md"
                >
                  {newsletter.isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8">
              <h4 className="font-semibold mb-4 text-gray-900">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="bg-gray-100 hover:bg-green-500 hover:text-white p-3 rounded-lg transition-all duration-200 text-gray-600 hover:scale-105">
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a href="#" className="bg-gray-100 hover:bg-green-500 hover:text-white p-3 rounded-lg transition-all duration-200 text-gray-600 hover:scale-105">
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a href="#" className="bg-gray-100 hover:bg-green-500 hover:text-white p-3 rounded-lg transition-all duration-200 text-gray-600 hover:scale-105">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="https://www.linkedin.com/in/infan-jioun-rahman" className="bg-gray-100 hover:bg-green-500 hover:text-white p-3 rounded-lg transition-all duration-200 text-gray-600 hover:scale-105">
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Districts Section */}
        <div className="border-t border-gray-200 pt-12 mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {districts.map((district) => (
              <Link
                key={district.name}
                href={district.href}
                className="bg-gray-50 hover:bg-green-500 hover:text-white text-gray-800 px-4 py-3 rounded-lg text-center transition-all duration-200 cursor-pointer font-medium text-sm hover:scale-105 hover:shadow-lg border border-gray-200 hover:border-green-500"
              >
                {district.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 mb-4 lg:mb-0">
              <p className="text-gray-500 text-sm">© 2025 Nestify. All rights reserved.</p>
              <div className="flex items-center gap-8">
                {legalLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-gray-500 hover:text-green-500 text-sm transition-colors duration-200 hover:underline"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>Proudly serving</span>
              <span className="text-green-500 font-semibold">Bangladesh</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}