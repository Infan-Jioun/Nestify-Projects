import React from 'react'
import PropertiesTitle from './PropertiesTitle/page'

import PropertyCard from '../components/PropertyCard/page'
import NextHead from '../components/NextHead/NextHead'



export default function PropertiesPage() {
  return (
    <div className='mt-20 px-4 md:px-20 lg:px-44'>
      <NextHead title='Porperties - Nestify'></NextHead>
      <PropertiesTitle />
      <PropertyCard />

    </div>
  )
}
