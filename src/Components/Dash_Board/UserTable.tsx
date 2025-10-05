"use client";
import React, { useState, useEffect } from "react";
import {
  useGetAllUserQuery,
  useUpdateRoleMutation,
} from "@/store/actions/userApi";
import { useTheme } from "@mui/material/styles";
import UserTableDesktop from "./UserTableDesktop";
import UserTableMobile from "./UserTableMobile";
import useResponsive from "@/hooks/useResponsive/useResponsive";
import EditUserModal from "@/Components/models/EditUserModal";
import ConfirmDeleteModal from "@/Components/models/ConfirmDeleteModal";
import { IUser } from "@/types/Users";

export default function UserTable() {
  const { data: allUsers, isLoading, isError } = useGetAllUserQuery();
  const [updateRole] = useUpdateRoleMutation();
  const { isMobile } = useResponsive();
  const theme = useTheme();

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(isMobile ? 5 : 10);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (allUsers?.users) {
      const filtered = allUsers.users.filter(
        (user) =>
          user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, allUsers]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateRole({ userId, userRole: newRole }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  // Loading state
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  // Error state
  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md dark:bg-red-900 dark:border-red-700 dark:text-red-100"
          role="alert"
        >
          <strong className="font-bold">خطأ!</strong>
          <span className="block sm:inline"> حدث خطأ أثناء تحميل البيانات</span>
        </div>
      </div>
    );

  // No users state
  if (!allUsers?.users || allUsers.users.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-gray-500 text-lg dark:text-gray-400">
          لا يوجد مستخدمين
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <>
        <UserTableMobile
          users={filteredUsers}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          usersPerPage={usersPerPage}
          handleRoleChange={handleRoleChange}
          setSelectedUser={setSelectedUser}
          setEditModalOpen={setEditModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
        />
        {editModalOpen && selectedUser && (
          <EditUserModal
            user={selectedUser}
            onClose={() => setEditModalOpen(false)}
            isMobile={true}
            darkMode={theme.palette.mode === "dark"}
          />
        )}
        {deleteModalOpen && selectedUser && (
          <ConfirmDeleteModal
            userId={selectedUser._id}
            onClose={() => setDeleteModalOpen(false)}
            isMobile={true}
            darkMode={theme.palette.mode === "dark"}
          />
        )}
      </>
    );
  }

  return (
    <>
      <UserTableDesktop
        users={filteredUsers}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        usersPerPage={usersPerPage}
        handleRoleChange={handleRoleChange}
        setSelectedUser={setSelectedUser}
        setEditModalOpen={setEditModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
      />
      {editModalOpen && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setEditModalOpen(false)}
          isMobile={false}
          darkMode={theme.palette.mode === "dark"}
        />
      )}
      {deleteModalOpen && selectedUser && (
        <ConfirmDeleteModal
          userId={selectedUser._id}
          onClose={() => setDeleteModalOpen(false)}
          isMobile={false}
          darkMode={theme.palette.mode === "dark"}
        />
      )}
    </>
  );
}
