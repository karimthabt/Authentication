"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { IVerifyCode } from "../../types/Types.verifyCode";
import { verifyCodeSchema } from "../../validation/validation_VerifyCode";
import { useUserVerifyCodeMutation } from "@/store/actions/userApi";

interface IApiError {
  status?: number;
  data?: {
    error?: string;
    message?: string;
  };
}

function isApiError(error: unknown): error is IApiError {
  return typeof error === "object" && error !== null && "data" in error;
}

function useVerifyCode() {
  const router = useRouter();
  const [verifyCode, { isLoading, isError }] = useUserVerifyCodeMutation();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IVerifyCode>({
    resolver: yupResolver(verifyCodeSchema),
  });

  const onSubmit: SubmitHandler<IVerifyCode> = async ({ code }) => {
    try {
      const email = localStorage.getItem("email");
      if (!email) throw new Error("البريد الإلكتروني غير موجود في التخزين");

      await verifyCode({ code, email }).unwrap();

      localStorage.removeItem("email");
      await Swal.fire({
        icon: "success",
        title: "تم التحقق بنجاح",
        text: "تم التحقق من الحساب بنجاح، يمكنك الآن التصفح",
      });

      router.push("/profile");
      router.refresh();
    } 
    catch (error: unknown) {
      let message = "حدث خطأ أثناء التحقق";
      if (isApiError(error)) {
        message = error.data?.error || error.data?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      await Swal.fire({
        icon: "error",
        title: "فشل التحقق",
        text: message,
      });
    }
  };

  return {
    handleSubmit,
    onSubmit,
    setValue,
    watch,
    errors,
    isLoading,
    isError,
  };
}

export default useVerifyCode;
