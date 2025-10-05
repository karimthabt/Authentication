import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/utils/encryption";
import { connectDB } from "../../../../../lib/config/mongodb";
import { User } from "../../../../../lib/models/user";
import { ILogin } from "../../../../types/Types.login";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("JWT_SECRET غير معرف في البيئة");
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const { email, password }: ILogin = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "الرجاء إدخال البريد الإلكتروني وكلمة المرور" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }); // 👈 استخدام الموديل مباشرة

    if (!user) {
      return NextResponse.json(
        { error: "المستخدم غير موجود" },
        { status: 404 }
      );
    }

    const decryptedPassword = await decrypt(user.password);

    if (decryptedPassword !== password) {
      return NextResponse.json(
        { error: "كلمة المرور غير صحيحة" },
        { status: 401 }
      );
    }
    const token = jwt.sign(
      { userId: user._id, userRole: user.userRole },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const response = NextResponse.json({
      success: true,
      message: "تم إرسال كلمة المرور إلى بريدك الإلكتروني",
    });

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // يوم واحد بس يا جدع
    });

    return response;
  } catch (error) {
    const err = error as Error;
    console.error("Login Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
