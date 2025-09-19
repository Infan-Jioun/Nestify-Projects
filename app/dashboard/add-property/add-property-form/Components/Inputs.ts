export type Inputs = {
  title: string
  category: string
  listingStatus: "Sale" | "Rent"
  price: number
  currency: "BDT" | "USD" | "EUR"
  propertySize: number
  address: string
  geoLocation?: { lat: number; lng: number }
  images: File[],
  videos?: string[]
  searchLocation : string
  geoCountryLocation : string
  ownerId: string
  contactNumber: string
  email: string
  status: "Available" | "Rented" | "Sold" | "Pending"
  createdAt: Date
  updatedAt: Date
  name?: string
  propertyFacilities?: string[]
  // Residential
  bedrooms?: number
  bathrooms?: number
  drawingRoom?: number
  kitchen?: number
  floor?: number
  furnishing?: "Furnished" | "Semi-furnished" | "Unfurnished"

  // Commercial
  floorArea?: number
  parkingSpaces?: number
  roomsSections?: number

  // Land
  landArea?: number
  plotNumber?: string
  landType?: string

  // Other
  facilities?: string,

}
