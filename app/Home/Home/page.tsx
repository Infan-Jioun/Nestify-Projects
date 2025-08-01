"use client";

import React from 'react'
import BannerPage from '../Banner/page'
import PropertiesByCity from '../PropertiesByCity/page';


export default function HomePage() {
  return (
    <div>

      <BannerPage />
      <PropertiesByCity />
    </div>
  )
}
