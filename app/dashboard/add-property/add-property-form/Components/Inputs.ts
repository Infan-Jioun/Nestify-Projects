export type Inputs = {
  title: string
  category: string
  price: number
  currency: "BDT" | "USD"
  propertySize: number
  address: string
  country: string
  division: string
  district: string
  upazila: string
  geoLocation?: { lat: number; lng: number }
  images: FileList
  videos?: string[]
  ownerId: string
  contactNumber: string
  email: string
  status: "Available" | "Rented" | "Sold" | "Pending"
  createdAt: Date
  updatedAt: Date
  name?: string
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
