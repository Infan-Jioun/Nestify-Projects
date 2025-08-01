"use client";

import React from 'react'
import BannerPage from '../Banner/page'
import PropertiesByCity from '../PropertiesByCity/page';
import PopularProperties from '../PopularProperties/page';
import BannerService from '../BannerServices/page';
import ApartmentTypes from '../ApartmentTypes/page';
import FeaturedAgents from '../FeaturedAgents/page';
import Ratings from '../Raitngs/page';
import TrustedCompany from '../TrustedCompany/page';
import OurBlog from '../OurBlog/page';
import RegisterInfo from '../RegisterInfo/page';


export default function HomePage() {
  return (
    <div>

      <BannerPage />
      <PropertiesByCity />
      <PopularProperties />
      <BannerService />
      <ApartmentTypes />
      <FeaturedAgents/>
      <Ratings/>
      <TrustedCompany/>
      <OurBlog/>
      <RegisterInfo/>
  


    </div>
  )
}
