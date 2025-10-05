import { NextRequest, NextResponse } from "next/server";
import { sendTOCode } from "@/utils/sendEmail";
import { connectDB } from "../../../../../lib/config/mongodb";
import { User } from "../../../../../lib/models/user";
import { generateFourDigitCode } from "../../../../utils/codeGenerator";
import { encrypt } from "@/utils/encryption";
import { isAdmin } from "@/enum";

interface IUserRegisterTemp {
  email: string;
  password: string;
  userName: string;
  phone: string;
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email, password, phone, userName }: IUserRegisterTemp =
      await request.json();

    if (!email || !password || !phone || !userName) {
      return NextResponse.json(
        { error: "الرجاء إدخال جميع البيانات المطلوبة" },
        { status: 400 }
      );
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return NextResponse.json(
        { error: "هذا البريد مسجل بالفعل" },
        { status: 400 }
      );
    }

    // 📌 جلب الـ IP
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip =
      forwardedFor?.split(",")[0].trim() ||
      realIp ||
      "127.0.0.1";

    const code = generateFourDigitCode();
    const hashedCode = encrypt(code);

    const hashedPassword = await encrypt(password);

    await sendTOCode(email, `مرحبًا ${userName}`, `كود التحقق هو: ${code}`);

    const isAdminToEmail = [isAdmin.karim, isAdmin.mahmoud];

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      phone,
      code: hashedCode,
      ip, // ✅ هنا بنخزن الـ IP
      userRole: isAdminToEmail.some((adminEmail) => adminEmail === email)
        ? "ادمن"
        : "مستخدم",
      isVerified: false,
    });

    await newUser.save();

    return NextResponse.json({
      success: true,
      message: "تم إرسال كود التحقق إلى بريدك الإلكتروني",
    });
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إنشاء الحساب" },
      { status: 500 }
    );
  }
}
