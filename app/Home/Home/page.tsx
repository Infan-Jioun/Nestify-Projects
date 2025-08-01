"use client";

import React from 'react'
import BannerPage from '../Banner/page'
import PropertiesByCity from '../PropertiesByCity/page';
import PopularProperties from '../PopularProperties/page';
import BannerService from '../BannerServices/page';


export default function HomePage() {
  return (
    <div>

      <BannerPage />
      <PropertiesByCity />
      <PopularProperties/>
      <BannerService/>
       <br />
       <br />
    </div>
  )
}
