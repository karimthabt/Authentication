"use client";
import React from "react";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";
import UserTablePagination from "./UserTablePagination";
import UserTableSearch from "./UserTableSearch";
import { useTheme } from "@mui/material/styles";
import { IUser } from "@/types/Users";
import { UserTableProps } from "./UserTableProps";

export default function UserTableDesktop({
  users,
  searchTerm,
  setSearchTerm,
  currentPage,
  setCurrentPage,
  usersPerPage,
  handleRoleChange,
  setSelectedUser,
  setEditModalOpen,
  setDeleteModalOpen,
}: UserTableProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const backgroundColor = isDarkMode ? "#1a2434" : "#ffffff";
  const textColor = isDarkMode ? "#ffffff" : "#1a1a1a";
  const cardBgColor = isDarkMode ? "#253348" : "#ffffff";
  const borderColor = isDarkMode ? "#333333" : "#e5e7eb";
  const headerBgColor = isDarkMode ? "#1e293b" : "#f9fafb";

  const handleEdit = (user: IUser) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleDelete = (user: IUser) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen py-8 px-4"
      style={{ backgroundColor, color: textColor }}
    >
      <div
        className="w-full max-w-6xl rounded-lg  border"
        style={{ backgroundColor: cardBgColor, borderColor ,boxShadow: "0px 0px 5px 1px rgba(194, 194, 194, 0.747)" }}
      >
        <div
          className="px-6 py-4 border-b"
          style={{ borderColor, backgroundColor: headerBgColor }}
        >
          <div className="flex justify-between items-center">
            <div className="text-center">
              <h2
                className="text-xl font-semibold"
                style={{ color: textColor }}
              >
                إدارة المستخدمين
              </h2>
              <p style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}>
                عدد المستخدمين: {users.length}
              </p>
            </div>
            <div className="w-64">
              <UserTableSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </div>

        {users.length === 0 ? (
          <div
            className="p-8 text-center"
            style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}
          >
            لا توجد نتائج مطابقة للبحث
          </div>
        ) : (
          <>
            <table
              className="w-full divide-y"
              style={{ backgroundColor: cardBgColor, borderColor }}
            >
              <UserTableHeader />
              <tbody className="divide-y" style={{ borderColor }}>
                {users.map((user) => (
                  <UserTableRow
                    key={user._id}
                    user={user}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onRoleChange={handleRoleChange}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </tbody>
            </table>
            <UserTablePagination
              currentPage={currentPage}
              totalPages={Math.ceil(users.length / usersPerPage)}
              onPageChange={setCurrentPage}
              isDarkMode={isDarkMode}
            />
          </>
        )}
      </div>
    </div>
  );
}
