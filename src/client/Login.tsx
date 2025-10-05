"use client";
export const dynamic = "force-dynamic";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { CgFacebook } from "react-icons/cg";
import { TbBrandGithubFilled } from "react-icons/tb";
import useLogin from "../hooks/useLogin/useLogin";
import { LOGIN_FORM } from "../types/LOGIN_FORM";
import { ILogin } from "../types/Types.login";
import InputPassword from "@/Components/UI/InputPassWord/InputPassWord";
import LoaderText from "@/Components/UI/LoaderText/LoaderText";
import ButtonComponent from "@/Components/UI/Button/ButtonComponent";
import InputNormal from "@/Components/UI/InputNormal/InputNormal";
// import ImgProps from "@/Components/UI/ImgProps/ImgProps";

const Login = () => {
  const { errors, register, handleSubmit, loading, onSubmit } = useLogin();

  const renderLoginForm = LOGIN_FORM.map(
    ({ name, type, validation, placeholder }, idx) => (
      <div key={idx} className="mb-6">
        {name === "password" ? (
          <InputPassword
            placeholder={placeholder}
            {...register("password", validation)}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        ) : (
          <>
            <InputNormal
              type={type}
              {...register(name as keyof ILogin, validation)}
              placeholder={placeholder}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            {errors[name as keyof ILogin] && (
              <p className="mt-1 text-sm text-red-600">
                {errors[name as keyof ILogin]?.message}
              </p>
            )}
          </>
        )}
      </div>
    )
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center p-8 text-white">
        <div className="max-w-md text-center">
          {/* <ImgProps src=""  /> */}
          <h1 className="text-4xl font-bold mb-4">مرحباً بعودتك!</h1>
          <p className="text-xl mb-8">
            سجل الدخول للوصول إلى حسابك والاستفادة من جميع الميزات
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-3 bg-white text-blue-600 text-xl font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
          >
            إنشاء حساب جديد
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            تسجيل الدخول
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {renderLoginForm}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xl transition-colors ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <LoaderText />
                </span>
              ) : (
                "تسجيل الدخول"
              )}
            </button>

            <div className="flex justify-center">
              <Link href={"/forgotcode"} className="text-sm font-bold text-blue-600 text-center">
                هل نسيت كلمة المرور؟
              </Link>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-gray-500 text-sm">
                  أو سجل الدخول باستخدام
                </span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex justify-center gap-4">
              {["google", "facebook", "github"].map((provider) => (
                <ButtonComponent
                  key={provider}
                  onClick={() => signIn(provider)}
                  width="80px"
                >
                  {provider === "google" && <FcGoogle size={40} />}
                  {provider === "facebook" && <CgFacebook size={40} />}
                  {provider === "github" && <TbBrandGithubFilled size={40} />}
                </ButtonComponent>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
