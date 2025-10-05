import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  width?: string; // جعلتها اختيارية بإضافة ?
  height?: string; // جعلتها اختيارية بإضافة ?
  className?: string; // إضافة خاصية className للسماح بتخصيص إضافي
};

function ButtonComponent({
  children,
  onClick,
  type = "button",
  width = "auto", // قيمة افتراضية
  height = "auto", // قيمة افتراضية
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${className}`}
      style={{
        width: width,
        height: height,
      }}
    >
      {children}
    </button>
  );
}

export default ButtonComponent;
