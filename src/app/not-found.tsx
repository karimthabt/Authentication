export const runtime = "edge";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold text-black mb-8">404</h1>
      <h2 className="text-2xl mb-4 text-black">الصفحة غير موجودة</h2>
      <p className="text-gray-600 mb-8">
        عذراً، الصفحة التي تبحث عنها غير موجودة.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        العودة للصفحة الرئيسية
      </Link>
    </div>
  );
}
