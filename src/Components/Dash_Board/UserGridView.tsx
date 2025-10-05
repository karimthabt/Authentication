import React from "react";
import { IUser } from "@/types/Users";
import { CustomSelect } from "@/Components/UI/CustomSelect/CustomSelect";
import { FiEdit, FiTrash2, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import ImgProps from "@/Components/UI/ImgProps/ImgProps";
import { roles } from "./constants";

interface UserGridViewProps {
  users: IUser[];
  onEdit: (user: IUser) => void;
  onDelete: (user: IUser) => void;
  onRoleChange: (userId: string, newRole: string) => Promise<void>;
  isDarkMode?: boolean;
}

export default function UserGridView({
  users,
  onEdit,
  onDelete,
  onRoleChange,
  isDarkMode = false,
}: UserGridViewProps) {
  return (
    <div className="grid grid-cols-2 gap-2 p-2" > 
      {users.map((user) => (
        <motion.div
          key={user._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`border rounded-lg p-2 ${
            isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
          }`}
          style={{ borderColor: isDarkMode ? "#333333" : "#e5e7eb" ,  boxShadow: "0px 0px 5px 1px rgba(194, 194, 194, 0.747)"  }}
        >
          <div className="flex flex-col items-center">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${
                isDarkMode ? "bg-blue-900" : "bg-blue-100"
              }`}
            >
              {user.image ? (
                <ImgProps
                  src={user.image}
                  alt={`صورة ${user.userName}`}
                  className="h-10 w-10 rounded-full object-cover"
                  fallback={
                    <FiUser
                      className={`h-5 w-5 ${
                        isDarkMode ? "text-blue-300" : "text-blue-500"
                      }`}
                    />
                  }
                />
              ) : (
                <FiUser
                  className={`h-5 w-5 ${
                    isDarkMode ? "text-blue-300" : "text-blue-500"
                  }`}
                />
              )}
            </div>
            <p
              className={`text-sm font-medium text-center ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {user.userName}
            </p>
            <p
              className={`text-xs text-center truncate w-full ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {user.email}
            </p>
            <div className="mt-2 w-full">
              <CustomSelect
                options={roles}
                value={user.userRole}
                onChange={(newRole) => onRoleChange(user._id ?? "", newRole)}
                className="w-full text-xs"
                darkMode={isDarkMode}
              />
            </div>
            <div className="flex justify-center space-x-2 mt-2">
              <button
                onClick={() => onEdit(user)}
                className={`p-1 ${
                  isDarkMode ? "text-blue-400" : "text-blue-500"
                }`}
                aria-label="Edit user"
              >
                <FiEdit className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(user)}
                className={`p-1 ${
                  isDarkMode ? "text-red-400" : "text-red-500"
                }`}
                aria-label="Delete user"
              >
                <FiTrash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
