export interface Field {
    name: string
    label: string
    type?: string
}

export const propertyCategoryData: Record<string, Field[]> = {
    "Apartment": [
        { name: "bedrooms", label: "Bedrooms", type: "number" },
        { name: "bathrooms", label: "Bathrooms", type: "number" },
        { name: "drawingRoom", label: "Drawing / Living Room", type: "number" },
        { name: "kitchen", label: "Kitchen", type: "number" },
        { name: "floor", label: "Floor", type: "number" },
        { name: "furnishing", label: "Furnishing" },
    ],
    "House": [
        { name: "bedrooms", label: "Bedrooms", type: "number" },
        { name: "bathrooms", label: "Bathrooms", type: "number" },
        { name: "drawingRoom", label: "Drawing / Living Rexport oom", type: "number" },
        { name: "kitchen", label: "Kitchen", type: "number" },
        { name: "floor", label: "Floor", type: "number" },
        { name: "furnishing", label: "Furnishing" },
    ],
    "Duplex": [
        { name: "bedrooms", label: "Bedrooms", type: "number" },
        { name: "bathrooms", label: "Bathrooms", type: "number" },
        { name: "drawingRoom", label: "Drawing / Living Room", type: "number" },
        { name: "kitchen", label: "Kitchen", type: "number" },
        { name: "floor", label: "Floor", type: "number" },
        { name: "furnishing", label: "Furnishing" },
    ],
    "Office Space": [
        { name: "floorArea", label: "Floor Area", type: "number" },
        { name: "parkingSpaces", label: "Parking Spaces", type: "number" },
        { name: "roomsSections", label: "Number of Rooms / Sections", type: "number" },
    ],
    "Shop ": [
        { name: "floorArea", label: "Floor Area", type: "number" },
        { name: "parkingSpaces", label: "Parking Spaces", type: "number" },
        { name: "roomsSections", label: "Number of Rooms / Sections", type: "number" },
    ],
    "Warehouse": [
        { name: "floorArea", label: "Floor Area", type: "number" },
        { name: "parkingSpaces", label: "Parking Spaces", type: "number" },
        { name: "roomsSections", label: "Number of Rooms / Sections", type: "number" },
    ],
    "Restaurant": [
        { name: "floorArea", label: "Floor Area", type: "number" },
        { name: "parkingSpaces", label: "Parking Spaces", type: "number" },
        { name: "roomsSections", label: "Number of Rooms / Sections", type: "number" },
    ],
    "Residential Land": [
        { name: "landArea", label: "Land Area", type: "number" },
        { name: "plotNumber", label: "Plot Number" },
    ],
    "Commercial Land": [
        { name: "landArea", label: "Land Area", type: "number" },
        { name: "plotNumber", label: "Plot Number" },
    ],
    "Agricultural Land": [
        { name: "landArea", label: "Land Area", type: "number" },
        { name: "plotNumber", label: "Plot Number" },
    ],
    "Industrial Land": [
        { name: "landArea", label: "Land Area", type: "number" },
        { name: "plotNumber", label: "Plot Number" },
    ],
    "Hotel": [
        { name: "floor", label: "Total Floors", type: "number" },
        { name: "roomsSections", label: "Rooms / Units", type: "number" },
        { name: "parkingSpaces", label: "Parking", type: "number" },
        { name: "facilities", label: "Facilities" },
    ],
    "Co-working Space": [
        { name: "floor", label: "Total Floors", type: "number" },
        { name: "roomsSections", label: "Rooms / Units", type: "number" },
        { name: "parkingSpaces", label: "Parking", type: "number" },
        { name: "facilities", label: "Facilities" },
    ],
    "Garage ": [
        { name: "floor", label: "Total Floors", type: "number" },
        { name: "roomsSections", label: "Rooms / Units", type: "number" },
        { name: "parkingSpaces", label: "Parking", type: "number" },
        { name: "facilities", label: "Facilities" },
    ],
}
