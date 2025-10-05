import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../../../lib/config/mongodb";
import { User } from "../../../../../lib/models/user";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("JWT_SECRET غير معرف في البيئة");

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "لم يتم العثور على التوكن" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    if (!decoded.userId) {
      return NextResponse.json(
        { error: "غير مصرح لك بالوصول" },
        { status: 403 }
      );
    }

    const user = await User.findById(decoded.userId).select("-password");

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "حدث خطأ في السيرفر" }, { status: 500 });
  }
}
