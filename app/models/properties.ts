import { Schema, model, models } from "mongoose";

// Category Field Schema
const categoryFieldSchema = new Schema(
    {
        name: { type: String, required: true },
        value: { type: Schema.Types.Mixed, required: true },
    },
    { _id: true }
);

// Category Schema
const categorySchema = new Schema({
    name: { type: String, required: true },
    fields: [categoryFieldSchema],
});

// Property Schema
const propertySchema = new Schema(
    {
        title: { type: String, required: true },
        category: categorySchema,
        price: { type: Number, required: true },
        currency: { type: String, required: true },
        propertySize: { type: Number, required: true },
        address: { type: String, required: true },
        country: { type: String, required: true },
        division: { type: String, required: true },
        district: { type: String, required: true },
        upazila: { type: String, default: "" },
        geoLocation: {
            lat: { type: Number },
            lng: { type: Number },
        },
        images: { type: [String], default: [] },
        videos: { type: [String], default: [] },
        ownerId: { type: String },
        contactNumber: { type: String, required: true },
        email: { type: String, required: true },
        status: {
            type: String,
            enum: ["Available", "Rented", "Sold", "Pending"],
            default: "Available",
        },
        bedrooms: { type: Number },
        bathrooms: { type: Number },
        drawingRoom: { type: Number },
        kitchen: { type: Number },
        floor: { type: Number },
        furnishing: { type: String },
        floorArea: { type: Number },
        parkingSpaces: { type: Number },
        roomsSections: { type: Number },
        landArea: { type: Number },
        plotNumber: { type: String },
        landType: { type: String },
        facilities: { type: String },
    },
    { timestamps: true }
);

const Property = models.Property || model("Property", propertySchema);
export default Property;

// 👉 Type ইনফার করার জন্য schema export করলাম
export type PropertySchemaType = typeof propertySchema;
