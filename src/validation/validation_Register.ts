import * as yup from "yup";

export const registerSchema = yup
  .object({
    userName: yup
      .string()
      .required("اسم المستخدم مطلوب")
      .min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل"),

    email: yup
      .string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),

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
      )
      .min(6, "كلمة المرور يجب ان تكون 6 حروف على الاقل"),

    phone: yup
      .string()
      .matches(/^\+?\d{10,15}$/, "رقم الهاتف غير صالح")
      .required("رقم الهاتف مطلوب"),
  })
  .required();
