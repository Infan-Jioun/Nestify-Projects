import { model, models, Schema } from "mongoose";

const addCitySchema = new Schema({
    CityImage: { type: String, required: true },
    cityName: { type: String, required: true },

})
const AddCity = models.AddCity || model("AddCity", addCitySchema);
export default AddCity;
