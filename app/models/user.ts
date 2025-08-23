import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    image?: string | null;
    resetTokenHash: string;
    resetTokenExpiry?: Date;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // role : {type: String, default : "user"},
    image: { type: String, default: null },
    resetTokenHash: { type: String },
    resetTokenExpiry: { type: Date }
},
{ timestamps: true }
);


const User = models.User || model<IUser>("User", userSchema);

export default User;
