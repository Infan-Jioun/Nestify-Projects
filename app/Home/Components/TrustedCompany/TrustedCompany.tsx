'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useSelector, useDispatch } from 'react-redux';
import { setSkletonLoader } from '@/app/features/loader/loaderSlice';
import { RootState } from '@/lib/store';

export default function TrustedCompany() {
  const dispatch = useDispatch();
  const skletonLoader = useSelector((state: RootState) => state.loader.skletonLoader);
  const [loading, setLoading] = useState(true);
  
  const logos = [
    "https://i.ibb.co/1tmG71wP/1.webp",
    "https://i.ibb.co/L3wT8KM/2.webp",
    "https://i.ibb.co/14w74sB/3.webp",
    "https://i.ibb.co/Z6kkh7kd/4.webp",
    "https://i.ibb.co/gZfD5JQN/5.webp",
    "https://i.ibb.co/xPMrFHc/6.webp",
  ];

  useEffect(() => {
    dispatch(setSkletonLoader(true));
    setLoading(true);
    
    const timer = setTimeout(() => {
      setLoading(false);
      dispatch(setSkletonLoader(false));
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [dispatch]);


  const LogoSkeleton = () => (
    <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse mx-8"></div>
  );

  return (
    <div className='mt-20 mb-20 px-4 lg:px-44 '>
      {/* Title */}
      <div>
        {loading || skletonLoader ? (
          <div className="h-7 bg-gray-200 rounded animate-pulse w-64 mx-auto mb-6"></div>
        ) : (
          <p className='text-center font-bold text-xl mb-6'>
            Trusted by the world s best
          </p>
        )}
      </div>

    
      <div className="block md:hidden">
        {loading || skletonLoader ? (
          <Marquee speed={50} gradient={false} pauseOnHover={true}>
            {Array.from({ length: 6 }).map((_, index) => (
              <LogoSkeleton key={index} />
            ))}
          </Marquee>
        ) : (
          <Marquee speed={50} gradient={false} pauseOnHover={true}>
            {logos.map((logo, index) => (
              <Image
                key={index}
                src={logo}
                width={80}
                height={80}
                alt={`Trusted logo ${index + 1}`}
                className="text-xl mx-8"
              />
            ))}
          </Marquee>
        )}
      </div>


      <div className="hidden md:flex justify-center gap-12 flex-wrap items-center">
        {loading || skletonLoader ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
          ))
        ) : (
          logos.map((logo, index) => (
            <Image
              key={index}
              src={logo}
              width={80}
              height={80}
              alt={`Trusted logo static ${index + 1}`}
              className="mt-3"
            />
          ))
        )}
      </div>
    </div>
  );
}