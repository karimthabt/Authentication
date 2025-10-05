"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { CgFacebook } from "react-icons/cg";
import { TbBrandGithubFilled } from "react-icons/tb";
import useRegister from "../hooks/useRegister/useRegister";
import { REGISTER_FORM } from "../types/Register_Form";

const Register = () => {
  const { errors, onSubmit, handleSubmit, register, isLoading } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const renderRegisterForm = REGISTER_FORM.map(
    ({ name, type, placeholder }, idx) => (
      <div key={idx} className="relative mb-6">
        <div className="relative">
          <input
            type={
              name === "password" ? (showPassword ? "text" : "password") : type
            }
            {...register(name)}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-12"
            placeholder={placeholder}
          />
          {name === "password" && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-800"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
              }
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
        {errors[name] && (
          <p className="mt-1 text-sm text-red-600">{errors[name]?.message}</p>
        )}
      </div>
    )
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Side - Welcome Section */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center p-8 text-white">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-4">انضم إلينا اليوم!</h1>
          <p className="text-xl mb-8">
            سجل معنا للاستفادة من جميع ميزات المنصة
          </p>

          <Link
            href="/login"
            className="inline-block px-8 py-3 bg-white text-blue-600 text-xl font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
          >
            لديك حساب؟ سجل الدخول
          </Link>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            إنشاء حساب جديد
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {renderRegisterForm}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xl transition-colors ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  جاري التسجيل...
                </span>
              ) : (
                "تسجيل الحساب"
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-gray-500 text-sm">
                  أو سجل باستخدام
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => signIn("google")}
                className="flex items-center justify-center p-3 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                title="جوجل"
              >
                <FcGoogle size={24} />
              </button>

              <button
                type="button"
                onClick={() => signIn("facebook")}
                className="flex items-center justify-center p-3 rounded-lg bg-[#1877F2] text-white hover:bg-[#166FE5] transition-colors"
                title="فيسبوك"
              >
                <CgFacebook size={24} />
              </button>

              <button
                type="button"
                onClick={() => signIn("github")}
                className="flex items-center justify-center p-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                title="جيت هاب"
              >
                <TbBrandGithubFilled size={24} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
