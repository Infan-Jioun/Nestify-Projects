import { model, models, Schema } from "mongoose";

const propertySchema = new Schema({
    title: { type: String, required: true },
    propertySize: { type: Number, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    address: { type: String, required: true },
    division: { type: String, required: true },
    district: { type: String, required: true },
    upazila: { type: String, required: true },
    contactNumber: { type: Number, required: true },
    email: { type: String, required: true },
    category: {
        name: { type: String, required: true },
        fields: [
            {
                name: { type: String, required: true },
                value: { type: Schema.Types.Mixed, required: true }
            }
        ]
    }

}, {
    timestamps: true
})
const Property = models?.Property || model("Property", propertySchema)
export default Property;