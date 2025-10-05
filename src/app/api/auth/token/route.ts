import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// 1. حدد واجهة للتوكن
interface MyToken extends JwtPayload {
  userId: string;
  userRole: string;
  // أي خصائص أخرى تضيفها في التوكن
}

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // 2. أخبر TypeScript أن الناتج من النوع MyToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as MyToken;

    return NextResponse.json({
      message: "Authenticated",
      user: {
        id: decoded.userId, // ✅ الآن يعرف النوع
        role: decoded.userRole,
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Invalid or expired token " },
      { status: 401 }
    );
  }
}
