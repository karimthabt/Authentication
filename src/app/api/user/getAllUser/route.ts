import { NextRequest } from "next/server";
import { connectDB } from "../../../../../lib/config/mongodb";
import jwt from "jsonwebtoken";
import { User } from "../../../../../lib/models/user";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("JWT_SECRET غير معرف في البيئة");

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return new Response(
        JSON.stringify({ error: "لم يتم العثور على التوكن" }),
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
    };

    if (!decoded.userId) {
      return new Response(JSON.stringify({ error: "غير مصرح لك بالوصول" }), {
        status: 403,
      });
    }

    const users = await User.find();
    return new Response(JSON.stringify({ users }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "حدث خطاء" }), { status: 500 });
  }
}
