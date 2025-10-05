import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/provider";
import { cookies } from "next/headers";
import { ToastContainer } from "react-toastify";
import { ColorModeProvider } from "@/context/ColorModeContext";
import { NavBar } from "@/Components/NavBar/NavBar";

const ibmPlexSans = IBM_Plex_Sans_Arabic({
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "نظام التوثيق - تسجيل دخول وتسجيل حساب آمن للمستخدمين",
  description:
    "نظام توثيق آمن وسهل الاستخدام يوفر إمكانيات تسجيل الدخول، إنشاء حساب، وإدارة بيانات المستخدمين باستخدام تقنيات حديثة.",
  keywords: [
    "تسجيل دخول",
    "تسجيل حساب",
    "نظام توثيق",
    "Authentication",
    "Login",
    "Sign Up",
    "نظام دخول آمن",
    "JWT",
    "توثيق المستخدمين",
    "React",
    "Next.js",
  ],
  authors: [
    { name: "Karim Thabt", url: "https://github.com/KarimThabt" },
    { name: "محمود سخي", url: "https://github.com/MahmoudSakhi" },
  ],
  openGraph: {
    title: "نظام توثيق | Login & Register System",
    description:
      "واجهة حديثة وآمنة لتسجيل الدخول وإنشاء حساب للمستخدمين، مصممة باستخدام Next.js وReact مع حماية JWT.",
    url: "https://authentication-system.vercel.app/",
    siteName: "نظام التوثيق",
    type: "website",
    locale: "ar_EG",
    images: [
      {
        url: "https://authentication-system.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "نظام التوثيق - تسجيل دخول وتسجيل حساب",
        type: "image/png",
      },
    ],
  },
  alternates: {
    canonical: "https://authentication-system.vercel.app/",
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return (
    <html lang="ar">
      <body className={ibmPlexSans.className} >
        <Providers>
          <ToastContainer />
          <div className="h-screen ">
            <ColorModeProvider>
              {token && <NavBar />}
              {children}
            </ColorModeProvider>
          </div>
        </Providers>
      </body>
    </html>
  );
}
