"use client";
import { CurrencyDollarIcon } from '@heroicons/react/16/solid';
import React from 'react'
import { GoArrowUpRight, GoHome, GoChecklist } from 'react-icons/go'
import { PiCurrencyDollar } from 'react-icons/pi';
import CountUp from './CountUp';

export default function BannerService() {
    return (
        <div className='px-4 lg:px-20 mt-16'>
            <div className="bg-gray-100 rounded-xl lg:rounded-3xl shadow-lg px-10 p-4 py-3 lg:p-10">
                <div className='flex flex-col lg:flex-row justify-between items-center h-[600px] lg:h-[700px] gap-10'>

                    {/* Left Content */}
                    <div className='flex-1 space-y-6'>
                        <h2 className='text-2xl lg:text-4xl font-semibold text-gray-800'>
                            Let’s find the right
                            selling option for you
                        </h2>

                        {/* Service Card 1 */}
                        <div className='flex items-start gap-4 bg-white p-4 rounded-xl shadow'>
                            <div className="text-green-600 mt-1">
                                <GoHome size={28} />
                            </div>
                            <div>
                                <h4 className='font-semibold text-lg'>Mortgage Services</h4>
                                <p className='text-gray-600 text-sm'>
                                    Nullam sollicitudin blandit eros eu pretium. <br />
                                    Nullam maximus ultricies auctor.
                                </p>
                            </div>
                        </div>

                        {/* Service Card 2 */}
                        <div className='flex items-start gap-4 bg-white p-4 rounded-xl shadow'>
                            <div className="text-green-600 mt-1">
                                <GoChecklist size={28} />
                            </div>
                            <div>
                                <h4 className='font-semibold text-lg'>Property Listing</h4>
                                <p className='text-gray-600 text-sm'>
                                    Nullam sollicitudin blandit eros eu pretium. <br />
                                    Nullam maximus ultricies auctor.
                                </p>
                            </div>
                        </div>
                        {/* Service Card 3 */}
                        <div className='flex items-start gap-4 bg-white p-4 rounded-xl shadow'>
                            <div className="text-green-600 mt-1">
                                <PiCurrencyDollar size={28} />
                            </div>
                            <div>
                                <h4 className='font-semibold text-lg'>
                                    Currency Services</h4>
                                <p className='text-gray-600 text-sm'>
                                    Nullam sollicitudin blandit eros eu pretium. <br />
                                    Nullam maximus ultricies auctor.
                                </p>
                            </div>
                        </div>

                        {/* Button */}
                        <button className='mt-4 inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition'>
                            Learn More <GoArrowUpRight size={16} />
                        </button>
                    </div>

                    {/* Right Image */}
                    <div className='md:block hidden'>
                        <img
                            className=' w-[500px] mx-auto h-[400px] lg:h-[777px]  rounded-xl'
                            src="https://i.ibb.co/2YZJYYy0/man-holding-little-house.png"
                            alt="manImage"
                        />
                    </div>
                </div>
            </div>
            <div className='md:block hidden'>
            <div className='flex justify-around items-center mt-16 mb-4 px-44 '>
                <div className='text-center '>
                    <CountUp
                        from={0}
                        to={400}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text  text-2xl font-bold"
                    />
                    <p>Stores around the world</p>
                </div>
                <div className=''>
                <div className='flex justify-center items-center '>
                <CountUp
                        from={0}
                        to={200}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text text-2xl font-bold"
                    /> <p className= ' text-2xl font-bold'>+</p>
                </div>
                    <p>Stores around the world</p>
                </div>
                <div className=''>
                <div className='flex justify-center items-center'>
                <CountUp
                        from={0}
                        to={1}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text text-2xl font-bold"
                    /> <p className= ' text-2xl font-bold'>K</p>
                </div>
                    <p>Stores around the world</p>
                </div>
            </div>
            <hr />
            <br />
            </div>
        </div>
    )
}
