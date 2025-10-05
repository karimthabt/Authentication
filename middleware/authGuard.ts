import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

interface AuthToken {
  name?: string;
  email?: string;
  sub?: string;
  userId?: string;
  userRole?: string;
  iat?: number;
  exp?: number;
}

export class AuthGuard {
  constructor(private request: NextRequest) {}

  // 🟢 جلب التوكن سواء NextAuth أو العادي
  async getToken(): Promise<AuthToken | null> {
    // جرّب الأول تجيب من next-auth
    const nextAuthToken = (await getToken({
      req: this.request,
    })) as AuthToken | null;
    if (nextAuthToken) return nextAuthToken;

    // لو مش موجود → جرّب تجيب من الكوكيز العادي
    const rawToken = this.request.cookies.get("token")?.value;
    if (!rawToken) return null;

    try {
      const decoded = jwt.verify(
        rawToken,
        process.env.JWT_SECRET!
      ) as AuthToken;
      return decoded;
    } catch (err) {
      console.error("Invalid custom JWT", err);
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }

  async getEmail(): Promise<string> {
    const token = await this.getToken();
    return token?.email || "guest";
  }

  async getUserRole(): Promise<string> {
    const token = await this.getToken();
    return token?.userRole || "guest";
  }

  async checkAccess(pathname: string) {
    const token = await this.getToken();
    const userRole = token?.userRole || "guest";

    const isAdminRoute =
      pathname.startsWith("/admin") || pathname.startsWith("/dashboard");

    const isErrorPage = pathname.startsWith("/error");

    const protectedRoutes = ["/profile", "/admin", "/dashboard"];
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );

    return { token, userRole, isAdminRoute, isErrorPage, isProtectedRoute };
  }
}
