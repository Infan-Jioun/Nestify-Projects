"use client";
import React from 'react'
import DetailsCityProperty from '../components/DetailsCityProperty/DetailsCityProperty'
interface DetailsCityPageProps {
  params : {
    city: string
  }
}
export default function DetailsCityPage({params} : DetailsCityPageProps) {
  const city = params.city
  return (
    <div>
      <DetailsCityProperty city={city}  />
    </div>
  )
}
