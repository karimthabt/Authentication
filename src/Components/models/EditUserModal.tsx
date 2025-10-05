// src/components/EditUserModal.tsx
"use client";
import { IUser } from "@/types/Users";
import React, { useState } from "react";

interface PEditUserModal {
  user: IUser;
  onClose: () => void;
  isMobile?: boolean;
  darkMode?: boolean;
}

export default function EditUserModal({
  user,
  onClose,
  isMobile = false,
  darkMode = false,
}: PEditUserModal) {
  const [formData, setFormData] = useState({
    username: user.userName,
    email: user.email,
    userRole: user.userRole,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // هنا تستدعي API تحديث بيانات المستخدم
    console.log("Update User Data:", formData);
    onClose();
  };

  // Dark mode classes
  const modalBg = darkMode ? "bg-gray-800" : "bg-white";
  const textColor = darkMode ? "text-white" : "text-gray-800";
  const inputBg = darkMode
    ? "bg-gray-700 text-white"
    : "bg-white text-gray-800";
  const borderColor = darkMode ? "border-gray-600" : "border-gray-300";
  const cancelBtn = darkMode
    ? "bg-gray-600 hover:bg-gray-500 text-white"
    : "bg-gray-300 hover:bg-gray-200 text-gray-800";
  const saveBtn = "bg-green-500 hover:bg-green-600 text-white";

  return (
    <div className="fixed inset-0 bg-[#000000a1] bg-opacity-40 flex justify-center items-center z-50">
      <div
        className={`rounded-lg p-6 ${
          isMobile ? "w-full mx-4" : "w-96"
        } ${modalBg} ${textColor}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">تعديل بيانات المستخدم</h2>
          <button
            onClick={onClose}
            className={`p-1 rounded-full ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">الاسم</label>
            <input
              type="text"
              placeholder="الاسم"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className={`w-full p-2 rounded border ${borderColor} ${inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label className="block mb-1">الإيميل</label>
            <input
              type="email"
              placeholder="الإيميل"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-full p-2 rounded border ${borderColor} ${inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          <div>
            <label className="block mb-1">الدور</label>
            <select
              value={formData.userRole}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  userRole: e.target.value as IUser["userRole"],
                })
              }
              className={`w-full p-2 rounded border ${borderColor} ${inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="user">مستخدم</option>
              <option value="admin">ادمن</option>
              <option value="moderator">مراقب</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded transition-colors ${cancelBtn}`}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded transition-colors ${saveBtn}`}
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
