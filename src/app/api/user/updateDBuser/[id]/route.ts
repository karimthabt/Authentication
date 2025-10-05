import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../../../../lib/config/mongodb";
import { User } from "../../../../../../lib/models/user";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await connectDB();
    const body = await req.json();
    const token = req.cookies.get("token")?.value;

    if (!token)
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });

    const decoded = jwt.verify(token, JWT_SECRET) as { userRole: string };
    if (decoded.userRole !== "admin") {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
      });
    }

    const user = await User.findByIdAndUpdate(
      params.userId,
      { userRole: body.userRole },
      { new: true }
    );

    if (!user)
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
