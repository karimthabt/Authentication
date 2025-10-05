import * as yup from "yup";

export const ubdateSchema = yup
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
      .min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف")
      .required("كلمة المرور مطلوبة"),

    phone: yup
      .string()
      .matches(/^\+?\d{10,15}$/, "رقم الهاتف غير صالح")
      .required("رقم الهاتف مطلوب"),
  })
  .required();
