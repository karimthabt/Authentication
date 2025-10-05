"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface ErrorDetails {
  message: string;
  code?: string;
}

export default function ErrorAuth() {
  const searchParams = useSearchParams();
  const [errorDetails, setErrorDetails] = useState<ErrorDetails>({
    message: "تم اكتشاف مشكلة في النظام",
  });

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      try {
        const parsedError = JSON.parse(
          decodeURIComponent(errorParam)
        ) as ErrorDetails;
        setErrorDetails({
          message: parsedError.message || "حدث خطأ غير متوقع",
          code: parsedError.code,
        });
      } catch (error) {
        console.error("Error parsing error details:", error);
        setErrorDetails({
          message: decodeURIComponent(errorParam),
        });
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-12">
      {/* Police Lights Animation */}
      <div className="relative mb-16 w-full max-w-md h-40 overflow-hidden">
        {/* Light Bars */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-black rounded-lg flex justify-center items-center">
          {/* Center Light Bar */}
          <div className="relative w-3/4 h-8 bg-gray-800 rounded-full">
            {/* Red/Blue Lights */}
            <div className="absolute -top-1 left-1/4 w-8 h-10 bg-red-600 rounded-full animate-light-sweep-red"></div>
            <div className="absolute -top-1 right-1/4 w-8 h-10 bg-blue-500 rounded-full animate-light-sweep-blue"></div>

            {/* Flashing Lights */}
            <div className="absolute top-0 left-0 w-full h-full flex justify-around px-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="relative">
                  <div
                    className={`absolute -top-2 w-4 h-4 rounded-full ${
                      i % 2 === 0
                        ? "bg-red-600 animate-light-flash-red"
                        : "bg-blue-500 animate-light-flash-blue"
                    }`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Light Rays Effect */}
        <div className="absolute top-12 left-0 right-0 h-28 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-1/3 h-full bg-red-600 opacity-20 animate-light-ray-red"></div>
          <div className="absolute top-0 right-1/4 w-1/3 h-full bg-blue-500 opacity-20 animate-light-ray-blue"></div>
        </div>
      </div>

      {/* Error Card */}
      <div className="relative z-10 bg-gray-800 bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-md w-full text-center border-t-4 border-red-500 backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-white mb-4">
          <span className="text-red-500">تحذير!</span> اكتشاف خلل
        </h1>

        {errorDetails.code && (
          <div className="mb-2">
            <span className="bg-red-900 text-red-200 text-xs px-2 py-1 rounded">
              كود الخطأ: {errorDetails.code}
            </span>
          </div>
        )}

        <p className="text-gray-300 mb-6 leading-relaxed">
          {errorDetails.message}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all hover:brightness-110"
          >
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            العودة لصفحة تسجيل الدخول
          </Link>
        </div>
      </div>

      {/* Ambient Light Effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-red-500 opacity-5 animate-ambient-light-red"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-blue-500 opacity-5 animate-ambient-light-blue"></div>
      </div>
    </div>
  );
}
