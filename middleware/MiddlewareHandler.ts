import { NextRequest, NextResponse } from "next/server";
import { RateLimiter } from "./rateLimiter";
import { AuthGuard } from "./authGuard";

const rateLimiter = new RateLimiter(3, 60 * 1000); // 3 طلبات / دقيقة

export class MiddlewareHandler {
  constructor(private request: NextRequest) {}

  async run() {
    const { pathname } = this.request.nextUrl;
    const auth = new AuthGuard(this.request);

    // 📌 1) Rate Limit
    const key = await auth.getEmail();
    const rateResult = rateLimiter.check(key);

    if (!rateResult.allowed) {
      return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
    }

    // 📌 2) Auth Checks
    const { token, userRole, isAdminRoute, isErrorPage, isProtectedRoute } =
      await auth.checkAccess(pathname);

    const isAuth = !!token;

    // ✅ صفحات الأخطاء مفتوحة
    if (isErrorPage) return NextResponse.next();

    // ✅ لو عامل تسجيل دخول بالفعل → مايرجعش للـ login/register
    if (isAuth && ["/login", "/register"].some((r) => pathname.startsWith(r))) {
      return NextResponse.redirect(new URL("/profile", this.request.url));
    }

    // ✅ لو مش عامل login وعايز يفتح صفحة محمية → يروح login
    if (!isAuth && isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", this.request.url));
    }

    // ✅ حماية صفحات admin/dashboard
    if (isAdminRoute && userRole !== "Owner" && userRole !== "ادمن") {
      return NextResponse.redirect(new URL("/error", this.request.url));
    }

    // ✅ الافتراضي: السماح
    return NextResponse.next();
  }
}
