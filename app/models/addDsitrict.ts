import { model, models, Schema } from "mongoose";

const addDistrictSchema = new Schema({
    districtImage: { type: String, required: true },
    districtName: { type: String, required: true },

})
const AddDistrict = models.AddDistrict || model("AddDistrict", addDistrictSchema);
export default AddDistrict;
