import React from "react";
import { IUser } from "@/types/Users";
import { CustomSelect } from "@/Components/UI/CustomSelect/CustomSelect";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import ImgProps from "@/Components/UI/ImgProps/ImgProps";
import { FiUser } from "react-icons/fi";
import { roles } from "./constants";
import { isAdmin } from "@/enum";

interface UserTableRowProps {
  user: IUser;
  onEdit: (user: IUser) => void;
  onDelete: (user: IUser) => void;
  onRoleChange: (userId: string, newRole: string) => Promise<void>;
  isDarkMode?: boolean;
}



export default function UserTableRow({
  user,
  onEdit,
  onDelete,
  onRoleChange,
  isDarkMode = false,
}: UserTableRowProps) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
       {user.ip || "N/A"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center justify-center gap-2">
          <div
            className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
              isDarkMode ? "bg-blue-900" : "bg-blue-100"
            }`}
          >
            {user.image ? (
              <ImgProps
                src={user.image}
                alt={`صورة ${user.userName}`}
                className="h-8 w-8 rounded-full object-cover"
                fallback={
                  <FiUser
                    className={`h-4 w-4 ${
                      isDarkMode ? "text-blue-300" : "text-blue-500"
                    }`}
                  />
                }
              />
            ) : (
              <FiUser
                className={`h-4 w-4 ${
                  isDarkMode ? "text-blue-300" : "text-blue-500"
                }`}
              />
            )}
          </div>
          <div
            className={`text-sm font-medium ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {user.userName}
          </div>
        </div>
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-sm text-center ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {user.email}
      </td>
      {!(user.email === isAdmin.karim || user.email === isAdmin.mahmoud)? (
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex justify-center">
            <CustomSelect
              options={roles}
              value={user.userRole}
              onChange={(newRole) => onRoleChange(user._id ?? "", newRole)}
              className="w-40"
              darkMode={isDarkMode}
            />
          </div>
        </td>
      ) : (
        <td
          className={`px-6 py-4 whitespace-nowrap text-sm text-center ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {user.userRole}
        </td>
      )}

      {!(user.email === isAdmin.karim || user.email === isAdmin.mahmoud)? (
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => onEdit(user)}
              className={`p-1 rounded-full ${
                isDarkMode
                  ? "text-blue-400 hover:text-blue-300 hover:bg-blue-900/30"
                  : "text-blue-600 hover:text-blue-900 hover:bg-blue-50"
              }`}
              title="تعديل"
              aria-label="Edit user"
            >
              <FiEdit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(user)}
              className={`p-1 rounded-full ${
                isDarkMode
                  ? "text-red-400 hover:text-red-300 hover:bg-red-900/30"
                  : "text-red-600 hover:text-red-900 hover:bg-red-50"
              }`}
              title="حذف"
              aria-label="Delete user"
            >
              <FiTrash2 className="h-4 w-4" />
            </button>
          </div>
        </td>
      ) : (
        <td
          className={`px-6 py-4 whitespace-nowrap text-sm text-center ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {user.userRole}
        </td>
      )}
    </motion.tr>
  );
}
