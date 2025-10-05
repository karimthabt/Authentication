import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/config/mongodb";
import { User } from "../../../../../lib/models/user";
import { decrypt } from "@/utils/encryption";
import { sendTOCode } from "@/utils/sendEmail";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "الرجاء ادخال البريد الالكتروني" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "هذا البريد غير مسجل" },
        { status: 404 }
      );
    }

    const sendedPassword = await decrypt(user.password);

    if (!sendedPassword) {
      return NextResponse.json(
        { error: "هذا البريد غير مسجل" },
        { status: 404 }
      );
    }

    await sendTOCode(
      email,
      `كلمة مرور جديدة`,
      `كلمة المرور الخاصة بك هي:\n${sendedPassword}`
    );
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إعادة تعيين كلمة المرور" },
      { status: 500 }
    );
  }
}
