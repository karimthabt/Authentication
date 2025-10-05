import { useState } from "react";
import { signOut } from "next-auth/react";
import { IUserAPP } from "../../../lib/Type_LIB/Type_lib";
import Swal from "sweetalert2";
import {  useGetMeUserQuery } from "@/store/actions/userApi";
import { redirect } from "next/navigation";

export interface IProfileResponse {
  success: boolean;
  user: IUserAPP;
}

function useProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, refetch } = useGetMeUserQuery();

  const handleLogout = async (): Promise<void> => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      await signOut({ callbackUrl: "/login" });
      redirect("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleUpload = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/user/upload", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();

      if (!res.ok) throw new Error("Upload failed");

      const data = JSON.parse(text) as { url: string };
      return data.url;
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  };

  const handleUpdateProfile = async (
    updatedData: IUserAPP,
    imageFile?: File
  ): Promise<boolean> => {
    try {
      let imageUrl: string = updatedData.image!;

      if (imageFile) {
        const uploadedUrl = await handleUpload(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const response = await fetch("/api/user/updateDBuser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userName: updatedData.userName,
          email: updatedData.email,
          phone: updatedData.phone,
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      Swal.fire({
        icon: "success",
        title: "تم التحديث",
        text: "تم تحديث الملف الشخصي بنجاح",
      });

      await refetch();
      return true;
    } catch (error) {
      const err = error as Error;
      Swal.fire({
        icon: "error",
        title: "فشل التحديث",
        text: err.message,
      });
      return false;
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return {
    handleLogout,
    fadeIn,
    slideUp,
    data,
    isModalOpen,
    setISModalOpen: setIsModalOpen,
    handleUpdateProfile,
    isLoading,
    handleUpload,
  };
}

export default useProfile;
