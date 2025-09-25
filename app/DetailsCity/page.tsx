"use client";
import React from 'react'
import DetailsCityProperty from '../components/DetailsCityProperty/DetailsCityProperty'

export default function DetailsCityPage({params} : {params: {city: string}}) {
  return (
    <div>
      <DetailsCityProperty city={params.city}  />
    </div>
  )
}
