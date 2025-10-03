import mongoose, { Document, Schema, model, models } from "mongoose";
import slugify from "slugify";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string | null;
    image?: string | null;
    provider?: "credentials" | "google" | "github";
    providerId?: string | null;
    slug?: string | null;
    resetTokenHash?: string;
    resetTokenExpiry?: Date;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    image: { type: String, default: null },
    provider: { type: String, enum: ["credentials", "google", "github"], default: "credentials" },
    providerId: { type: String, default: null, index: true },
    slug: { type: String, unique: true, sparse: true },
    resetTokenHash: { type: String },
    resetTokenExpiry: { type: Date },
}, { timestamps: true });


userSchema.pre("save", async function (next) {
    try {
        if (this.slug) return next();

        const base = slugify(this.name || "user", { lower: true, strict: true }) || "user";
        let candidate = base;
        const UserModel = models.User || model<IUser>("User", userSchema);


        const exists = await UserModel.findOne({ slug: candidate });

        if (exists && exists._id.toString() !== this._id?.toString()) {

            const suffix = Date.now().toString(36).slice(-6);
            candidate = `${base}-${suffix}`;
            let tries = 0;
            while (await UserModel.findOne({ slug: candidate })) {
                tries++;
                candidate = `${base}-${Date.now().toString(36).slice(-6)}-${tries}`;
                if (tries > 5) break;
            }
        }

        this.slug = candidate;
        next();
    } catch (err) {
        next(err as unknown as Error);
    }
});

const User = models.User || model<IUser>("User", userSchema);
export default User;
