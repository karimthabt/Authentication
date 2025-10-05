// src/hooks/useNavBar.ts
"use client";
import { useState } from "react";
import {  useGetMeUserQuery, useGetTokenQuery } from "@/store/actions/userApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function useNavBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { data, isLoading, isError } = useGetMeUserQuery();
  const router = useRouter();


  const { data: token } = useGetTokenQuery();

  const isAuth = Boolean(data || token);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        toast.success("تم تسجيل الخروج بنجاح");
        router.push("/login");
        router.refresh();
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء تسجيل الخروج");
      console.error("Logout error:", error);
    }
  };

  const commonPages = [{ name: "الرئيسية", path: "/" }];

  const authPages = [
    ...commonPages,
    { name: "لوحة التحكم", path: "/dashboard" },
  ];


  const isAdmin = data?.userRole === "ادمن";

  let pages = commonPages;

  if (isAuth) {
    if (isAdmin) {
      pages = authPages;
    } else {
      pages = commonPages ;
    }
  }


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const go = (path: string) => {
    handleCloseNavMenu();
    router.push(path);
  };

  return {
    anchorElNav,
    anchorElUser,
    handleOpenNavMenu,
    handleOpenUserMenu,
    handleCloseNavMenu,
    handleCloseUserMenu,
    go,
    pages,
    isAuth,
    data,
    handleLogout,
    isLoading,
    isError,
  };
}

export default useNavBar;
