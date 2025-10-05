import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("ادخل بريدك الإلكتروني.")
    .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "البريد الإلكتروني غير صالح."),
  password: yup
    .string()
    .required("كلمة المرور مطلوبة.")
    .test(
      "password-strength",
      "كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، رقم، ورمز خاص",
      (value) =>
        value
          ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(value)
          : false
    ),
});
