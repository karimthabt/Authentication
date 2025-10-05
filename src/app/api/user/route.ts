import { connectDB } from "../../../../lib/config/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from "../../../../lib/models/user";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("JWT_SECRET غير معرف في البيئة");

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    let userId: string | null = null;

    const sessionToken = await getToken({ req, secret: JWT_SECRET });
    if (sessionToken?.sub) {
      userId = sessionToken.sub;
    } else {

      const token = (await cookies()).get("token")?.value;
      if (!token) {
        return NextResponse.json(
          { message: "غير مصرح", success: false },
          { status: 401 }
        );
      }

      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      userId = decoded.userId;
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json({
        message: "المستخدم غير موجود",
        success: false,
      });
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "حدث خطأ";
    return NextResponse.json(
      { message: errorMessage, success: false },
      { status: 500 }
    );
  }
}
