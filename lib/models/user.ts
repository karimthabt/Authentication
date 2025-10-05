import { Schema, model, models, Model, Document, Types } from "mongoose";

export interface IUserMODB {
  _id: Types.ObjectId;
  ip: string;
  userName: string;
  email: string;
  password: string;
  code?: string | null;
  phone: string;
  image?: string | null;
  userRole: "ادمن" | "مستخدم" | "Owner";
  isVerified: boolean; // ✅ أضفها هنا
  createdAt?: Date;
}

export type UserDocument = IUserMODB & Document;

const UserSchema: Schema<IUserMODB> = new Schema(
  {
    userName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    code: { type: String, required: false, default: null },
    phone: { type: String, required: true },
    image: { type: String, required: false, default: null },
    userRole: {
      type: String,
      enum: ["ادمن", "مستخدم", "Owner"],
      default: "مستخدم",
    },
    ip: { type: String, required: false, default: null },
    isVerified: { type: Boolean, default: false }, // ✅ دي أهم نقطة
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

console.log("✅ user.ts تم تنفيذه وتسجيل موديل User");

export const User: Model<IUserMODB> =
  models.User || model<IUserMODB>("User", UserSchema);
