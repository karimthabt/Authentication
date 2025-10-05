import { NextRequest, NextResponse } from "next/server";
import { MiddlewareHandler } from "./middleware/MiddlewareHandler";

// 👇 هنا بقى بنصدره لـ Next.js
export async function middleware(request: NextRequest) {
  const handler = new MiddlewareHandler(request);
  return handler.run();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/admin/:path*",
    "/dashboard/:path*",
    "/login",
    "/register",
    "/api/:path*",
    "/error",
  ],
};
