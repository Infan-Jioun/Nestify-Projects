import React from 'react'
import CityBanner from './components/CityBanner'
import AddCityForm from './components/AddCityForm/AddCityForm'

export default function AddCity() {
    return (
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 md:py-10 bg-gray-50 dark:bg-gray-900 min-h-screen">

            {/* Banner Section */}
            <div className="max-w-7xl mx-auto">
                <CityBanner />
            </div>

            {/* Form Section */}
            <div className=" mx-auto mt-8 md:mt-12">
                <AddCityForm />
            </div>
        </div>
    )
}
