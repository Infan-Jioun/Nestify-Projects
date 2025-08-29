import mongoose, { Schema, model, models } from "mongoose"

const categoryFieldSchema = new Schema({
    name: { type: String, required: true },
    value: { type: Schema.Types.Mixed, required: true }
}, { _id: true })

const categorySchema = new Schema({
    name: { type: String, required: true },
    fields: [categoryFieldSchema]
})

const propertySchema = new Schema({
    title: { type: String, required: true },
    category: categorySchema,
    price: { type: Number, required: true },
    currency: { type: String, enum: ["BDT", "USD"], default: "BDT" },
    propertySize: { type: Number, required: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    division: { type: String, required: true },
    district: { type: String, required: true },
    upazila: { type: String, default: "" },
    geoLocation: {
        lat: { type: Number },
        lng: { type: Number }
    },
    images: { type: [String], default: [] },
    videos: { type: [String], default: [] },
    ownerId: { type: String },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, enum: ["Available", "Rented", "Sold", "Pending"], default: "Available" },

    // Residential
    bedrooms: Number,
    bathrooms: Number,
    drawingRoom: Number,
    kitchen: Number,
    floor: Number,
    furnishing: { type: String, enum: ["Furnished", "Semi-furnished", "Unfurnished"] },

    // Commercial
    floorArea: Number,
    parkingSpaces: Number,
    roomsSections: Number,

    // Land
    landArea: Number,
    plotNumber: String,
    landType: String,

    // Other
    facilities: String
}, { timestamps: true })

const Property = models.Property || model("Property", propertySchema)
export default Property
