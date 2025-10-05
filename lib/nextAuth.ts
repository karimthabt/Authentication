import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import { AuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { connectDB } from "./config/mongodb";
import { User } from "../lib/models/user";
import { generatePassword } from "@/utils/generatePassword";
import { encrypt } from "@/utils/encryption";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

// نعدل النوعين في نفس الملف
interface CustomJWT extends JWT {
  userId?: string;
  role?: string;
}

interface CustomSession extends Session {
  user?: {
    _id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}



export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET!,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      try {
        await connectDB();

        let dbUser = await User.findOne({ email: user.email });

        if (!dbUser) {
          const createPassword = generatePassword();
          const hashedPassword = await encrypt(createPassword);

          const isAdminToEmail = [
            "karimthabt168@gmail.com",
            "mahmoudsakhyanwer@gmail.com",
          ];

          dbUser = await User.create({
            userName: user.name || "بدون اسم",
            email: user.email,
            password: hashedPassword,
            code: null,
            isVerified: true,
            phone: "0000000000",
            image: user.image,
            userRole: isAdminToEmail.includes(user.email ?? "")
              ? "ادمن"
              : "مستخدم",
          });
        }

        // توليد توكن مخصص
        const customToken = jwt.sign(
          { userId: dbUser._id, role: dbUser.userRole },
          JWT_SECRET,
          { expiresIn: "7d" }
        );

        // تخزين التوكن في الكوكيز
        (await cookies()).set("token", customToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });

        return true;
      } catch (error) {
        console.error("signIn error:", error);
        return `/auth/error?message=${encodeURIComponent(
          error instanceof Error ? error.message : "خطأ غير معروف"
        )}&code=AUTH_ERROR`;
      }
    },

    async jwt({ token, user }) {
      const customToken = token as CustomJWT;

      if (user) {
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
          customToken.userId = dbUser._id.toString();
          customToken.role = dbUser.userRole;
        }
      }
      return customToken;
    },

    async session({ session, token }) {
      const customSession = session as CustomSession;
      const customToken = token as CustomJWT;

      if (customSession.user) {
        customSession.user._id = customToken.userId;
      }
      return customSession;
    },
  },

  pages: {
    signIn: "/login",
    error: "/auth/error",
    signOut: "/login",
  },
};
