import React from "react";
import { IUser } from "@/types/Users";
import { CustomSelect } from "@/Components/UI/CustomSelect/CustomSelect";
import { FiEdit, FiTrash2, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import ImgProps from "@/Components/UI/ImgProps/ImgProps";
import { roles } from "./constants";

interface UserListViewProps {
  users: IUser[];
  onEdit: (user: IUser) => void;
  onDelete: (user: IUser) => void;
  onRoleChange: (userId: string, newRole: string) => Promise<void>;
  isDarkMode?: boolean;
}



export default function UserListView({
  users,
  onEdit,
  onDelete,
  onRoleChange,
  isDarkMode = false,
}: UserListViewProps) {
  return (
    <div
      className="divide-y"
      style={{ borderColor: isDarkMode ? "#333333" : "#e5e7eb" }}
    >
      {users.map((user) => (
        <motion.div
          key={user._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`p-3 ${
            isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse gap-4">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center ${
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
              <div>
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {user.userName}
                </p>
                <p
                  className={`text-xs truncate max-w-[120px] ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {user.email}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
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
            <div className="mt-2 flex justify-center">
              <CustomSelect
                options={roles}
                value={user.userRole}
                onChange={(newRole) => onRoleChange(user._id ?? "", newRole)}
                className="w-full text-sm"
                darkMode={isDarkMode}
              />
            </div>
        </motion.div>
      ))}
    </div>
  );
}
