'use client';
import React from 'react';
import Marquee from 'react-fast-marquee';

export default function TrustedCompany() {
    const logos = [
        "https://i.ibb.co/1tmG71wP/1.webp",
        "https://i.ibb.co/L3wT8KM/2.webp",
        "https://i.ibb.co/14w74sB/3.webp",
        " https://i.ibb.co/Z6kkh7kd/4.webp",
        "https://i.ibb.co/gZfD5JQN/5.webp",
        "https://i.ibb.co/xPMrFHc/6.webp",
    ];
    return (
        <div className='mt-20 px-4 lg:px-44 '>
            {/* Title */}
            <div>
                <p className='text-center font-bold text-xl mb-6'>
                    Trusted by the world’s best
                </p>
            </div>

            {/* Marquee: Only visible on small screens */}
            <div className="block md:hidden">
                <Marquee speed={50} gradient={false} pauseOnHover={true}>
                    {logos.map((logo, index) => (
                        <img
                            key={index}
                            src={logo}
                            alt={`Trusted logo ${index + 1}`}
                            className="w-20 text-xl mx-8"
                        />
                    ))}
                </Marquee>
            </div>

            {/* Optional: Static display for large screens */}
            <div className="hidden md:flex justify-center gap-12 flex-wrap items-center">
                {logos.map((logo, index) => (
                    <img
                        key={index}
                        src={logo}
                        alt={`Trusted logo static ${index + 1}`}
                        className="mt-3 w-20"
                    />
                ))}
            </div>
        </div>
    );
}
