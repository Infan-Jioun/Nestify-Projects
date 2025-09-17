"use client";

import React from 'react'
import Banner from '../Components/Banner/Banner'
import PropertiesByCity from '../Components/PropertiesByCity/PropertiesByCity';
import PopularProperties from '../Components/PopularProperties/PopularProperties';
import BannerService from '../Components/BannerServices/BannerService'
import ApartmentTypes from '../Components/ApartmentTypes/ApartmentTypes';
import FeaturedAgents from '../FeaturedAgents/page';
import Ratings from '../Raitngs/page';
import TrustedCompany from '../TrustedCompany/page';
import OurBlog from '../OurBlog/page';
import RegisterInfo from '../RegisterInfo/page';
import NextHead from '@/app/components/NextHead/NextHead';



export default function HomePage() {

  return (
    <div>
      <NextHead title='Nestify' />
      <Banner />
      <PropertiesByCity />
      <PopularProperties />
      <BannerService />
      <ApartmentTypes />
      <FeaturedAgents />
      <Ratings />
      <TrustedCompany />
      <OurBlog />
      <RegisterInfo />



    </div>
  )
}
