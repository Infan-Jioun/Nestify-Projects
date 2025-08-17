"use client"
import React from "react";
import NextHead from "../components/NextHead/NextHead";
import { motion } from "framer-motion";
import { Building2, Users, Star, MapPin, ShieldCheck, Home, TrendingUp, Handshake, Heart, Phone, Globe, Briefcase, Layers, Smile, Award, DollarSign, Rocket, Key, BarChart, Coffee } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-green-100 text-gray-900">
      <NextHead title="About - Nestify Real Estate" />

      {/* 1️⃣ Hero Section */}
      <section className="relative bg-green-100 text-gray-900 py-20 px-6 text-center">
        <motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} className="text-5xl font-bold">About Nestify</motion.h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">Transforming real estate with technology, trust, and transparency.</p>
      </section>

      {/* 2️⃣ Mission */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10 bg-green-100">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-700">To make property buying, selling, and renting easier with innovation and customer-first service.</p>
        </div>
        <img src="https://images.unsplash.com/photo-1582407947304-5a9e59bcd1d3" alt="Mission" className="rounded-2xl shadow-lg"/>
      </section>

      {/* 3️⃣ Vision */}
      <section className="bg-green-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
        <p className="max-w-2xl mx-auto text-gray-600">We aim to be the most trusted real estate platform worldwide, connecting people with their dream homes.</p>
      </section>

      {/* 4️⃣ Stats */}
      <section className="bg-green-100 py-16 px-6 grid md:grid-cols-4 gap-8 text-center">
        {[
          {icon:Users,label:"Happy Clients",value:"25K+"},
          {icon:Building2,label:"Properties Sold",value:"12K+"},
          {icon:Star,label:"Years Experience",value:"15+"},
          {icon:MapPin,label:"Cities Covered",value:"50+"},
        ].map((s,i)=>(
          <div key={i} className="p-6 rounded-xl bg-white">
            {React.createElement(s.icon,{className:"w-10 h-10 mx-auto mb-3 text-green-600"})}
            <h3 className="text-2xl font-bold">{s.value}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      {/* 5️⃣ Why Choose Us */}
      <section className="max-w-6xl mx-auto py-16 px-6 bg-green-100">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Nestify?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[{icon:ShieldCheck,text:"Trusted & Secure"},{icon:TrendingUp,text:"Best Market Deals"},{icon:Handshake,text:"Strong Partnerships"}].map((f,i)=>(
            <div key={i} className="p-6 bg-white shadow-md rounded-xl text-center">
              {React.createElement(f.icon,{className:"w-12 h-12 mx-auto text-green-600 mb-4"})}
              <h3 className="font-semibold">{f.text}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 6️⃣ Timeline */}
      <section className="bg-green-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Our Story</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {["Founded in 2010 with a small team.","Expanded to 20+ cities in 2015.","Launched AI-based property search in 2019.","Crossed 25K+ happy clients in 2023."].map((step,i)=>(
            <div key={i} className="flex items-start space-x-4">
              <div className="w-6 h-6 rounded-full bg-green-600 mt-1"></div>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7️⃣ Team Members */}
      <section className="max-w-6xl mx-auto py-16 px-6 bg-green-100">
        <h2 className="text-3xl font-bold text-center mb-10">Meet Our Team</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {["Alice","Bob","Charlie","Diana"].map((n,i)=>(
            <div key={i} className="bg-white p-6 rounded-xl shadow-md text-center">
              <img src={`https://i.pravatar.cc/150?img=${i+5}`} alt={n} className="w-24 h-24 mx-auto rounded-full mb-4"/>
              <h3 className="font-semibold">{n}</h3>
              <p className="text-sm text-gray-500">Real Estate Expert</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8️⃣ Client Testimonials */}
      <section className="bg-green-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">What Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {["Nestify helped me find my dream home.","The process was super smooth.","Best property deals in town!"].map((t,i)=>(
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg">
              <p className="italic">"{t}"</p>
              <span className="block mt-3 font-semibold">— Client {i+1}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 9️⃣ Values */}
      <section className="py-16 px-6 max-w-6xl mx-auto bg-green-100">
        <h2 className="text-3xl font-bold text-center mb-10">Our Core Values</h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[Heart,Home,Award,Smile].map((Icon,i)=>(
            <div key={i} className="p-6 bg-white rounded-xl shadow">
              <Icon className="w-10 h-10 mx-auto text-green-600 mb-3"/>
              <p className="font-semibold">Value {i+1}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10️⃣ Partners */}
      <section className="bg-green-100 py-12 px-6">
        <h2 className="text-center text-xl font-semibold mb-6">Our Trusted Partners</h2>
        <div className="flex flex-wrap justify-center gap-8 opacity-70">
          {["Airbnb","Zillow","Booking","Expedia"].map((p,i)=>(
            <span key={i} className="text-2xl font-bold">{p}</span>
          ))}
        </div>
      </section>

      {/* 11️⃣ Footer */}
      <footer className="bg-green-100 text-gray-900 py-10 text-center">
        <p>© 2025 Nestify Real Estate. All Rights Reserved.</p>
      </footer>
    </div>
  )
}
