import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/utils/encryption";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../../../lib/config/mongodb";
import { User } from "../../../../../lib/models/user";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("JWT_SECRET غير معرف في البيئة");

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { code, email } = body;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "لا يوجد بريد إلكتروني" },
        { status: 400 }
      );
    }

    const decryptedCode = decrypt(user.code!);

    if (code !== decryptedCode) {
      return NextResponse.json({ error: "الكود غير صحيح" }, { status: 401 });
    }

    user.isVerified = true;
    user.code = null;
    await user.save();

    const token = jwt.sign(
      { userId: user._id, userRole: user.userRole },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });
    return response;
  } catch (error) {
    console.error("❌ خطأ في السيرفر:", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
