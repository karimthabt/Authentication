"use client";

import React from "react";
import Link from "next/link";
import useVerifyCode from "../hooks/useVerifyCode/useVerifyCode";

function VerifyCodeEmail() {
  const { errors, handleSubmit, setValue, watch, isLoading, onSubmit } =
    useVerifyCode();
  const code = watch("code");

  const renderCodeInput = () => {
    const digits = code?.split("") ?? ["", "", "", ""];

    return (
      <div className="flex flex-col items-start gap-[10px]">
        <div
          className="flex gap-4 flex-row-reverse justify-center items-center w-full"
          dir="rtl"
        >
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-[70px] h-[70px] text-center text-black text-[28px] font-bold rounded-[12px] border border-[#162B46] focus:outline-none focus:ring-2 focus:ring-[#162B46]"
              value={digits[index]}
              onChange={(e) => {
                const value = e.target.value;
                if (!/^\d?$/.test(value)) return;

                const newDigits = [...digits];
                newDigits[index] = value;
                setValue("code", newDigits.join(""));

                if (value && index < 3) {
                  const nextInput = document.getElementById(`otp-${index + 1}`);
                  if (nextInput) nextInput.focus();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !digits[index] && index > 0) {
                  const prevInput = document.getElementById(`otp-${index - 1}`);
                  if (prevInput) prevInput.focus();
                }
              }}
              id={`otp-${index}`}
            />
          ))}
        </div>
        {errors.code && (
          <p className="text-red-500 text-sm mt-1">
            {errors.code.message || "الكود غير صالح"}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen" dir="rtl">
      {/* Left Side - Verification Form */}
      <div className="w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              تأكيد الكود
            </h1>
            <p className="text-gray-600">
              أدخل الكود المكون من 4 أرقام الذي تلقيته عبر البريد الإلكتروني
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {renderCodeInput()}

            <button
              type="submit"
              disabled={!code || code.length < 4 || isLoading}
              className={`w-full py-3 px-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
                !code || code.length < 4 || isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 shadow-md hover:shadow-lg"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
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
                    />
                  </svg>
                  جاري التحقق...
                </span>
              ) : (
                "تأكيد الكود"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Welcome Image */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-indigo-700 to-blue-800 p-12 text-white">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold mb-6">مرحباً بك في نظامنا!</h1>
          <p className="text-xl mb-8 opacity-90">
            نظام متكامل لإدارة الاختبارات والامتحانات بطريقة سهلة وآمنة
          </p>

          <div className="mt-10">
            <p className="mb-4 text-lg">هل لديك حساب بالفعل؟</p>
            <Link
              href="/login"
              className="inline-block px-8 py-3 bg-white text-indigo-700 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyCodeEmail;
