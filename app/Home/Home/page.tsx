"use client";

import React from 'react'
import Banner from '../Components/Banner/Banner'
import PopularProperties from '../Components/PopularProperties/PopularProperties';
import BannerService from '../Components/BannerServices/BannerService'
import ApartmentTypes from '../Components/ApartmentTypes/ApartmentTypes';
import FeaturedAgents from '../Components/FeaturedAgents/FeaturedAgents';
import Ratings from '../Components/Raitngs/Raitngs';
import TrustedCompany from '../Components/TrustedCompany/TrustedCompany';
import OurBlog from '../Components/OurBlog/OurBlog';
import RegisterInfo from '../Components/RegisterInfo/RegisterInfo'
import NextHead from '@/app/components/NextHead/NextHead';
import PropertiesByDistrict from '../Components/PropertiesByDistrict/PropertiesByDistrict';



export default function HomePage() {

  return (
    <div>
      <NextHead title='Nestify' />
      <Banner />
      <PropertiesByDistrict />
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
