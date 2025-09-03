import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground/70 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        type === "search" &&
        "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
        type === "file" &&
        "text-muted-foreground/70 file:border-input file:text-foreground p-0 pr-3 italic file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic",
        className
      )}
      {...props}
    />
  )
}

export { Input }
// [
//   // {
//   //   "title": "Green View Apartment",
//   //   "category": {
//   //     "name": "Apartment",
//   //     "fields": [
//   //       { "name": "bedrooms", "value": 3 },
//   //       { "name": "bathrooms", "value": 2 },
//   //       { "name": "drawingRoom", "value": 1 },
//   //       { "name": "kitchen", "value": 1 },
//   //       { "name": "floor", "value": 2 },
//   //       { "name": "furnishing", "value": "Furnished" }
//   //     ]
//   //   },
//   //   "price": 1200000,
//   //   "currency": "BDT",
//   //   "propertySize": 1800,
//   //   "address": "Banani, Dhaka",
//   //   "country": "Bangladesh",
//   //   "division": "Dhaka",
//   //   "district": "Dhaka",
//   //   "upazila": "Banani",

//   //   "images": ["https://i.ibb.co.com/7fCsxbP/Image-4.webp", "https://i.ibb.co.com/fVgJsfsg/Image-1.jpg", "https://i.ibb.co.com/qLCJczX7/image-3.jpg", "https://i.ibb.co.com/cX62qVmK/image-4.jpg", "https://i.ibb.co.com/393s69mm/Image-5.jpg"],
//   //   "videos": [],
//   //   "contactNumber": "+8801712345678",
//   //   "email": "info@greenview.com",
//   //   "status": "Available",
//   //   "createdAt": "2025-09-02T12:00:00Z",
//   //   "updatedAt": "2025-09-02T12:00:00Z"
//   // },
//   // {
//   //   "title": "Downtown Office Space",
//   //   "category": {
//   //     "name": "Office Space",
//   //     "fields": [
//   //       { "name": "floorArea", "value": 2500 },
//   //       { "name": "parkingSpaces", "value": 5 },
//   //       { "name": "roomsSections", "value": 4 }
//   //     ]
//   //   },
//   //   "price": 5000000,
//   //   "currency": "BDT",
//   //   "propertySize": 2500,
//   //   "address": "Motijheel, Dhaka",
//   //   "country": "Bangladesh",
//   //   "division": "Dhaka",
//   //   "district": "Dhaka",
//   //   "upazila": "Motijheel",
//   //   "images": ["https://i.ibb.co.com/Ldy54zc4/Image-1.jpg", "https://i.ibb.co.com/twZJgQxz/Image-2.jpg", "https://i.ibb.co.com/qLvY3PKH/Image-3.jpg", "https://i.ibb.co.com/R42jvhQw/Image04.jpg", "https://i.ibb.co.com/fVDk01HT/Image-5.jpg"],
//   //   "videos": [],
//   //   "contactNumber": "+8801712345679",
//   //   "email": "contact@downtownoffice.com",
//   //   "status": "Available",
//   //   "createdAt": "2025-09-02T12:00:00Z",
//   //   "updatedAt": "2025-09-02T12:00:00Z"
//   // },

//   // {
//   //   "title": "Green Acres Residential Land",
//   //   "category": {
//   //     "name": "Residential Land",
//   //     "fields": [
//   //       { "name": "landArea", "value": 5000 },
//   //       { "name": "plotNumber", "value": "A12" },
//   //       { "name": "landType", "value": "Residential" }
//   //     ]
//   //   },
//   //   "price": 2000000,
//   //   "currency": "BDT",
//   //   "address": "Savar, Dhaka",
//   //   "country": "Bangladesh",
//   //   "division": "Dhaka",
//   //   "district": "Dhaka",
//   //   "upazila": "Savar",
//   //   "images": ["https://i.ibb.co.com/ZRjP0NgR/land-1.jpg", "https://i.ibb.co.com/qFYKGDMH/Land-2.jpg", "https://i.ibb.co.com/ZzBXtmRS/Land-3.jpg", "https://i.ibb.co.com/5gM6H4sv/Land-4.jpg"],
//   //   "videos": [],
//   //   "contactNumber": "+8801712345680",
//   //   "email": "sales@greenacres.com",
//   //   "status": "Available",
//   //   "createdAt": "2025-09-02T12:00:00Z",
//   //   "updatedAt": "2025-09-02T12:00:00Z"
//   // },
//   // {
//   //   "title": "Luxury Duplex Villa",
//   //   "category": {
//   //     "name": "Duplex",
//   //     "fields": [
//   //       { "name": "bedrooms", "value": 4 },
//   //       { "name": "bathrooms", "value": 3 },
//   //       { "name": "drawingRoom", "value": 2 },
//   //       { "name": "kitchen", "value": 1 },
//   //       { "name": "floor", "value": 2 },
//   //       { "name": "furnishing", "value": "Semi-Furnished" }
//   //     ]
//   //   },
//   //   "price": 3500000,
//   //   "currency": "BDT",
//   //   "propertySize": 2800,
//   //   "address": "Gulshan, Dhaka",
//   //   "country": "Bangladesh",
//   //   "division": "Dhaka",
//   //   "district": "Dhaka",
//   //   "upazila": "Gulshan",
//   //   "images": ["https://i.ibb.co.com/35wDqs5F/Image-1.jpg", "https://i.ibb.co.com/HLTZTx86/Image-2.jpg", "https://i.ibb.co.com/YBsNNFZD/Image-3.jpg", "https://i.ibb.co.com/zHDVhdDq/Image-4.jpg"],
//   //   "videos": ["villa_tour.mp4"],
//   //   "contactNumber": "+8801712345681",
//   //   "email": "info@luxuryvillas.com",
//   //   "status": "Available",
//   //   "createdAt": "2025-09-02T12:00:00Z",
//   //   "updatedAt": "2025-09-02T12:00:00Z"
//   // },
//   // {
//   //   "title": "Commercial Shop Space",
//   //   "category": {
//   //     "name": "Shop",
//   //     "fields": [
//   //       { "name": "shopArea", "value": 800 },
//   //       { "name": "floorLevel", "value": "Ground Floor" },
//   //       { "name": "storageRoom", "value": "Yes" }
//   //     ]
//   //   },
//   //   "price": 1800000,
//   //   "currency": "BDT",
//   //   "propertySize": 800,
//   //   "address": "Dhanmondi, Dhaka",
//   //   "country": "Bangladesh",
//   //   "division": "Dhaka",
//   //   "district": "Dhaka",
//   //   "upazila": "Dhanmondi",
//   //   "images": ["https://i.ibb.co.com/6RWnk7XL/Image-2.jpg", "https://i.ibb.co.com/XZJpDFbw/image-1.jpg", "https://i.ibb.co.com/1YLQvLtq/Image-3.jpg"],
//   //   "videos": [],
//   //   "contactNumber": "+8801712345682",
//   //   "email": "rent@dhanmondishop.com",
//   //   "status": "Available",
//   //   "createdAt": "2025-09-02T12:00:00Z",
//   //   "updatedAt": "2025-09-02T12:00:00Z"
//   // },
//   // {
//   //   "title": "Premium Warehouse Facility",
//   //   "category": {
//   //     "name": "Warehouse",
//   //     "fields": [
//   //       { "name": "storageCapacity", "value": 10000 },
//   //       { "name": "loadingDocks", "value": 3 },
//   //       { "name": "ceilingHeight", "value": "20ft" }
//   //     ]
//   //   },
//   //   "price": 7500000,
//   //   "currency": "BDT",
//   //   "propertySize": 10000,
//   //   "address": "Uttara, Dhaka",
//   //   "country": "Bangladesh",
//   //   "division": "Dhaka",
//   //   "district": "Dhaka",
//   //   "upazila": "Uttara",
//   //   "images": ["https://i.ibb.co.com/zTfmzWhS/Image-2.jpg", "https://i.ibb.co.com/mrprnyPN/image-1.jpg"],
//   //   "videos": [],
//   //   "contactNumber": "+8801712345683",
//   //   "email": "storage@premiumwarehouse.com",
//   //   "status": "Available",
//   //   "createdAt": "2025-09-02T12:00:00Z",
//   //   "updatedAt": "2025-09-02T12:00:00Z"
//   // },
//   // {
//   //   "title": "Fine Dining Restaurant Space",
//   //   "category": {
//   //     "name": "Restaurant",
//   //     "fields": [
//   //       { "name": "diningCapacity", "value": 80 },
//   //       { "name": "kitchenArea", "value": 600 },
//   //       { "name": "parkingAvailable", "value": "Yes" }
//   //     ]
//   //   },
//   //   "price": 4200000,
//   //   "currency": "BDT",
//   //   "propertySize": 2500,
//   //   "address": "Bashundhara R/A, Dhaka",
//   //   "country": "Bangladesh",
//   //   "division": "Dhaka",
//   //   "district": "Dhaka",
//   //   "upazila": "Bashundhara",
//   //   "images": ["restaurant1.jpg", "restaurant2.jpg"],
//   //   "videos": [],
//   //   "contactNumber": "+8801712345684",
//   //   "email": "lease@restaurantspace.com",
//   //   "status": "Available",
//   //   "createdAt": "2025-09-02T12:00:00Z",
//   //   "updatedAt": "2025-09-02T12:00:00Z"
//   // },
//   // {
//   //   "title": "Commercial Plot for Development",
//   //   "category": {
//   //     "name": "Commercial Land",
//   //     "fields": [
//   //       { "name": "landArea", "value": 8000 },
//   //       { "name": "plotNumber", "value": "C-5" },
//   //       { "name": "landType", "value": "Commercial" }
//   //     ]
//   //   },
//   //   "price": 12000000,
//   //   "currency": "BDT",
//   //   "address": "Purbachal, Dhaka",
//   //   "country": "Bangladesh",
//   //   "division": "Dhaka",
//   //   "district": "Dhaka",
//   //   "upazila": "Purbachal",
//   //   "images": ["comland1.jpg", "comland2.jpg"],
//   //   "videos": [],
//   //   "contactNumber": "+8801712345685",
//   //   "email": "land@commercialplots.com",
//   //   "status": "Available",
//   //   "createdAt": "2025-09-02T12:00:00Z",
//   //   "updatedAt": "2025-09-02T12:00:00Z"
//   // },
//   // {
//   //   "title": "Boutique Hotel Building",
//   //   "category": {
//   //     "name": "Hotel",
//   //     "fields": [
//   //       { "name": "numberOfRooms", "value": 20 },
//   //       { "name": "receptionArea", "value": "Yes" },
//   //       { "name": "restaurantSpace", "value": "Yes" }
//   //     ]
//   //   },
//   //   "price": 15000000,
//   //   "currency": "BDT",
//   //   "propertySize": 10000,
//   //   "address": "Cox's Bazar",
//   //   "country": "Bangladesh",
//   //   "division": "Chittagong",
//   //   "district": "Cox's Bazar",
//   //   "upazila": "Cox's Bazar Sadar",
//   //   "images": ["hotel1.jpg", "hotel2.jpg", "hotel3.jpg"],
//   //   "videos": ["hotel_tour.mp4"],
//   //   "contactNumber": "+8801712345686",
//   //   "email": "info@boutiquehotel.com",
//   //   "status": "Available",
//   //   "createdAt": "2025-09-02T12:00:00Z",
//   //   "updatedAt": "2025-09-02T12:00:00Z"
//   // },
//   // {
//   //   "title": "Modern Office Connecting Space",
//   //   "category": {
//   //     "name": "Connecting Space",
//   //     "fields": [
//   //       { "name": "totalArea", "value": 3000 },
//   //       { "name": "numberOfUnits", "value": 4 },
//   //       { "name": "commonFacilities", "value": "Conference Room, Pantry" }
//   //     ]
//   //   },
//   //   "price": 6800000,
//   //   "currency": "BDT",
//   //   "propertySize": 3000,
//   //   "address": "Baridhara, Dhaka",
//   //   "country": "Bangladesh",
//   //   "division": "Dhaka",
//   //   "district": "Dhaka",
//   //   "upazila": "Baridhara",
//   //   "images": ["officeconn1.jpg", "officeconn2.jpg"],
//   //   "videos": [],
//   //   "contactNumber": "+8801712345687",
//   //   "email": "office@connectingspace.com",
//   //   "status": "Available",
//   //   "createdAt": "2025-09-02T12:00:00Z",
//   //   "updatedAt": "2025-09-02T12:00:00Z"
//   // },
//   // {
//   //   "title": "Secure Parking Garage",
//   //   "category": {
//   //     "name": "Garage",
//   //     "fields": [
//   //       { "name": "parkingCapacity", "value": 10 },
//   //       { "name": "securitySystem", "value": "24/7 CCTV" },
//   //       { "name": "vehicleTypes", "value": "Cars only" }
//   //     ]
//   //   },
//   //   "price": 950000,
//   //   "currency": "BDT",
//   //   "propertySize": 2000,
//   //   "address": "Mirpur, Dhaka",
//   //   "country": "Bangladesh",
//   //   "division": "Dhaka",
//   //   "district": "Dhaka",
//   //   "upazila": "Mirpur",
//   //   "images": ["garage1.jpg", "garage2.jpg"],
//   //   "videos": [],
//   //   "contactNumber": "+8801712345688",
//   //   "email": "parking@securegarage.com",
//   //   "status": "Available",
//   //   "createdAt": "2025-09-02T12:00:00Z",
//   //   "updatedAt": "2025-09-02T12:00:00Z"
//   // },
//   // {
//   //   "title": "Agricultural Farm Land",
//   //   "category": {
//   //     "name": "Agricultural Land",
//   //     "fields": [
//   //       { "name": "landArea", "value": 15000 },
//   //       { "name": "soilType", "value": "Fertile" },
//   //       { "name": "waterSource", "value": "Irrigation" }
//   //     ]
//   //   },
//   //   "price": 3500000,
//   //   "currency": "BDT",
//   //   "address": "Gazipur",
//   //   "country": "Bangladesh",
//   //   "division": "Dhaka",
//   //   "district": "Gazipur",
//   //   "upazila": "Kaliganj",
//   //   "images": ["agriland1.jpg", "agriland2.jpg"],
//   //   "videos": [],
//   //   "contactNumber": "+8801712345689",
//   //   "email": "farm@agriculturalland.com",
//   //   "status": "Available",
//   //   "createdAt": "2025-09-02T12:00:00Z",
//   //   "updatedAt": "2025-09-02T12:00:00Z"
//   // },
//   // {
//   //   "title": "Industrial Zone Plot",
//   //   "category": {
//   //     "name": "Industrial Land",
//   //     "fields": [
//   //       { "name": "landArea", "value": 20000 },
//   //       { "name": "zoneType", "value": "Heavy Industry" },
//   //       { "name": "utilities", "value": "Gas, Electricity, Water" }
//   //     ]
//   //   },
//   //   "price": 25000000,
//   //   "currency": "BDT",
//   //   "address": "Adamjee EPZ, Narayanganj",
//   //   "country": "Bangladesh",
//   //   "division": "Dhaka",
//   //   "district": "Narayanganj",
//   //   "upazila": "Siddhirganj",
//   //   "images": ["industland1.jpg", "industland2.jpg"],
//   //   "videos": [],
//   //   "contactNumber": "+8801712345690",
//   //   "email": "industrial@zoneproperties.com",
//   //   "status": "Available",
//   //   "createdAt": "2025-09-02T12:00:00Z",
//   //   "updatedAt": "2025-09-02T12:00:00Z"
//   // }
// ]

