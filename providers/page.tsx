"use client";
import React, { ReactNode } from 'react'
import { HelmetProvider } from 'react-helmet-async';


export default function HelmetWrapper({ children }: { children: ReactNode }) {
  return <HelmetProvider>{children}</HelmetProvider>
}
