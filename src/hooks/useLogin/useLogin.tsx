"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { ILogin } from "../../types/Types.login";
import { loginSchema } from "../../validation/validation_Login";
import { useState } from "react";
import { useUserLoginMutation } from "@/store/actions/userApi";

interface IApiError {
  status?: number;
  data?: {
    error?: string;
    message?: string;
  };
}

const isApiError = (error: unknown): error is IApiError => {
  return typeof error === "object" && error !== null && "data" in error;
};

function useLogin() {
  const [userLogin, { isLoading: isLoginLoading, isError }] =
    useUserLoginMutation();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    setLoading(true);

    try {
      const bodydata: ILogin = {
        email: data.email.trim(),
        password: data.password.trim(),
      };

      await userLogin(bodydata).unwrap();

      Swal.fire({
        icon: "success",
        title: "تم تسجيل الدخول بنجاح",
      });

      router.push("/profile");
      router.refresh();
    } catch (error: unknown) {
      let message = "حدث خطأ أثناء التسجيل";
      if (isApiError(error)) {
        message = error.data?.error || error.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      await Swal.fire({
        icon: "error",
        title: "فشل في التسجيل",
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    loading: loading || isLoginLoading,
    isError,
  };
}

export default useLogin;
