"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { IRegister } from "../../types/Types.register";
import { useUserRegisterMutation } from "@/store/actions/userApi";
import { IUserAPP } from "../../../lib/Type_LIB/Type_lib";
import { registerSchema } from "@/validation/validation_Register";

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

function useRegister() {
  const router = useRouter();
  const [userRegister, { isLoading, isError }] = useUserRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: yupResolver(registerSchema),
  });

  const registerUserClient = async (data: IRegister): Promise<IUserAPP> => {
    return await userRegister(data).unwrap();
  };

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    try {
      const response = await registerUserClient(data);

      if (response) {
        localStorage.setItem("email", data.email);
        await Swal.fire({
          icon: "success",
          title: "تم التسجيل",
          text: "تم انشاء الحساب بنجاح",
        });

        window.open(
          "https://mail.google.com/mail/u/0/#inbox",
          "_blank",
          "width=500,height=500,top=100,left=200"
        );

        router.push("/verifyCode");
      }
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
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    isError,
    onSubmit,
  };
}

export default useRegister;
