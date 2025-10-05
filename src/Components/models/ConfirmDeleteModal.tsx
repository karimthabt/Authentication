// src/components/ConfirmDeleteModal.tsx
"use client";
import React from "react";

interface ConfirmDeleteModalProps {
  userId: string;
  onClose: () => void;
  isMobile?: boolean;
  darkMode?: boolean;
}

export default function ConfirmDeleteModal({
  userId,
  onClose,
  isMobile = false,
  darkMode = false,
}: ConfirmDeleteModalProps) {
  const handleDelete = async () => {
    console.log("Delete User with ID:", userId);
    // هنا تستدعي API حذف المستخدم
    onClose();
  };

  // Dark mode classes
  const modalBg = darkMode ? "bg-gray-800" : "bg-white";
  const textColor = darkMode ? "text-gray-100" : "text-gray-800";
  const cancelBtn = darkMode
    ? "bg-gray-600 hover:bg-gray-500 text-white"
    : "bg-gray-200 hover:bg-gray-300 text-gray-800";
  const deleteBtn = "bg-red-500 hover:bg-red-600 text-white";
  const backdrop = darkMode ? "bg-black/50" : "bg-black/40";

  return (
    <div
      className={`fixed inset-0 ${backdrop} flex justify-center items-center z-50`}
    >
      <div
        className={`rounded-lg p-6 ${
          isMobile ? "w-5/6" : "w-80"
        } ${modalBg} ${textColor} shadow-xl`}
      >
        <div className="flex flex-col items-center">
          {/* Warning icon */}
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h3 className="text-lg font-medium mb-2">تأكيد الحذف</h3>
          <p className="mb-6 text-center">
            هل أنت متأكد من حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء.
          </p>

          <div className="flex justify-center gap-3 w-full">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-md transition-colors ${cancelBtn} flex-1`}
            >
              إلغاء
            </button>
            <button
              onClick={handleDelete}
              className={`px-4 py-2 rounded-md transition-colors ${deleteBtn} flex-1`}
            >
              حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
