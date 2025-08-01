"use client";

import React from 'react'
import BannerPage from '../Banner/page'
import PropertiesByCity from '../PropertiesByCity/page';
import PopularProperties from '../PopularProperties/page';


export default function HomePage() {
  return (
    <div>

      <BannerPage />
      <PropertiesByCity />
      <PopularProperties/>
       
    </div>
  )
}
