// src/hooks/useForgotcode.ts
import { useSendCodeMutation } from "@/store/actions/ForgotcodeAPI";
import { IForgotCode } from "@/types/Forgotcode";
import { forgotSchema } from "@/validation/validation_ForgotCode";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function useForgotcode() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForgotCode>({
    resolver: yupResolver(forgotSchema),
  });

  const [sendCode, { isLoading }] = useSendCodeMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<IForgotCode> = async (data) => {
    try {
      const res = await sendCode({ email: data.email }).unwrap();
      toast.success(`✅ ${res.message}`);

      // فتح نافذة جديدة لصندوق البريد
      window.open(
        "https://mail.google.com/mail/u/0/#inbox",
        "_blank",
        "noopener,noreferrer"
      );

      router.push("/login");
      reset();
    } catch (error) {
      toast.error("❌ فشل إرسال الكود، يرجى المحاولة مرة أخرى");
      console.error("Error sending code:", error);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
  };
}
