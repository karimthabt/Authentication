// app/api/user/updateDBuser/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/config/mongodb";
import { User } from "../../../../../lib/models/user";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("JWT_SECRET غير معرف في البيئة");

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "غير مصرح به - لا يوجد توكن" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const userId = decoded.userId;

    const body = await request.json();
    const { userName, email, phone, image } = body;

    // ✅ جلب المستخدم
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "المستخدم غير موجود" },
        { status: 404 }
      );
    }

    // ✅ التحقق من الحقول (اختياري للتحديث)
    const errors: Record<string, string> = {};

    if (userName && userName.trim().length < 3) {
      errors.userName = "اسم المستخدم يجب أن يكون 3 أحرف على الأقل";
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "البريد الإلكتروني غير صحيح";
    }

  

    if (phone && !/^\+?\d{10,15}$/.test(phone)) {
      errors.phone = "رقم الهاتف غير صالح";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, error: "البيانات غير صحيحة", details: errors },
        { status: 400 }
      );
    }

    // ✅ تحديث البيانات (فقط الحقول المقدمة)
    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (image) user.image = image;

    await user.save();

    return NextResponse.json({ 
      success: true,
      message: "تم تحديث المستخدم بنجاح",
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        image: user.image,
        userRole: user.userRole,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    const err = error as Error;
    console.error("❌ خطأ في تحديث البيانات:", err);

    if (err.name === "JsonWebTokenError") {
      return NextResponse.json({ success: false, error: "توكن غير صالح" }, { status: 401 });
    }

    if (err.name === "TokenExpiredError") {
      return NextResponse.json(
        { success: false, error: "انتهت صلاحية التوكن" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        success: false,
        error: "حدث خطأ أثناء تحديث البيانات",
        details: err.message 
      },
      { status: 500 }
    );
  }
}