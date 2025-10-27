"use client";
import React, { useState, useEffect } from "react";
import NextHead from "../components/NextHead/NextHead";
import HeroSection from "./Components/HeroSection";
import MissionVision from "./Components/MissionVision";
import ValuesSection from "./Components/ValuesSection";
import LoadingSkeleton from "./Components/LoadingSkeleton";
import PropertySellerSection from "./Components/PropertySellerSection";
import SellerDemoSection from "./Components/SellerDemoSection";
import DeveloperSection from "./Components/DeveloperSection";
// import CallToAction from "./Components/CallToAction";


export default function AboutPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <NextHead title="About - Nestify" />

      <HeroSection />
      <MissionVision />
      <ValuesSection />
      {/* <CallToAction /> */}
      <PropertySellerSection />
      <SellerDemoSection />
      <DeveloperSection />
    </div>
  );
}