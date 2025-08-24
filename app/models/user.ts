import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    image?: string | null;
    provider?: "credentials" | "google" | "github";
    resetTokenHash: string;
    resetTokenExpiry?: Date;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    image: { type: String, default: null },
    provider: {
        type: String,
        enum: ["credentials", "google", "github"],
        default: "credentials"
    },
    resetTokenHash: { type: String },
    resetTokenExpiry: { type: Date }
},
    { timestamps: true }
);


const User = models.User || model<IUser>("User", userSchema);

export default User;
