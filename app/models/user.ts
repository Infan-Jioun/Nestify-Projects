import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    image?: string | null; // ← এখানে image ফিল্ড যোগ করো
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: null }, // ← এখানে schema তেও যোগ করো
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
