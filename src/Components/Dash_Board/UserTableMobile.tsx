"use client";
import React, { useState } from "react";
import UserTablePagination from "./UserTablePagination";
import UserTableSearch from "./UserTableSearch";
import UserListView from "./UserListView";
import UserGridView from "./UserGridView";
import { BiGridAlt } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { useTheme } from "@mui/material/styles";
import { IUser } from "@/types/Users";
import { UserTableProps } from "./UserTableProps";

export default function UserTableMobile({
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
  const [mobileView, setMobileView] = useState<"list" | "grid">("list");
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const backgroundColor = isDarkMode ? "#1a2434" : "#ffffff";
  const textColor = isDarkMode ? "#ffffff" : "#1a1a1a";
  const cardBgColor = isDarkMode ? "#253348" : "#ffffff";
  const borderColor = isDarkMode ? "#333333" : "#e5e7eb";

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
      className="flex flex-col items-center min-h-screen py-4 px-2"
      style={{ backgroundColor, color: textColor }}
    >
      <div
        className="w-full max-w-md rounded-lg "
        style={{ backgroundColor: cardBgColor, borderColor, borderWidth: 1 , boxShadow: "0px 0px 5px 1px rgba(194, 194, 194, 0.747)"  }}
      >
        <div className="px-4 py-3 border-b" style={{ borderColor  }}>
          <div className="flex justify-between items-center">
            <div>
              <h2
                className="text-lg font-semibold"
                style={{ color: textColor }}
              >
                إدارة المستخدمين
              </h2>
              <p
                className="text-sm"
                style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}
              >
                المستخدمون المسجلون: {users.length}
              </p>
            </div>
            <button
              onClick={() =>
                setMobileView(mobileView === "list" ? "grid" : "list")
              }
              className={`p-2 rounded-full ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              aria-label="Toggle view"
              style={{ color: textColor }}
            >
              {mobileView === "list" ? <BiGridAlt /> : <FiMenu />}
            </button>
          </div>

          <UserTableSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isDarkMode={isDarkMode}
          />
        </div>

        {users.length === 0 ? (
          <div
            className="p-4 text-center"
            style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" ,  }}
          >
            لا توجد نتائج مطابقة للبحث
          </div>
        ) : mobileView === "list" ? (
          <>
            <UserListView
              users={users}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRoleChange={handleRoleChange}
              isDarkMode={isDarkMode}
            />
            <UserTablePagination
              currentPage={currentPage}
              totalPages={Math.ceil(users.length / usersPerPage)}
              onPageChange={setCurrentPage}
              isDarkMode={isDarkMode}
              isMobile={true}
            />
          </>
        ) : (
          <>
            <UserGridView
              users={users}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRoleChange={handleRoleChange}
              isDarkMode={isDarkMode}
            />
            <UserTablePagination
              currentPage={currentPage}
              totalPages={Math.ceil(users.length / usersPerPage)}
              onPageChange={setCurrentPage}
              isDarkMode={isDarkMode}
              isMobile={true}
            />
          </>
        )}
      </div>
    </div>
  );
}
