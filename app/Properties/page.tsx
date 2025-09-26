"use client"
import React from 'react'
import PropertiesHeadPage from './Components/PropertiesHeadPage'
import { connection } from 'next/server'

  
export default async function  PropertiesPageRoute() {
 await connection()
  return (
    <div><PropertiesHeadPage/></div>
  )
}
