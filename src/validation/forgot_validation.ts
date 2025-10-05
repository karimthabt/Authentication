import * as yup from "yup";

export const forgotSchema = yup
  .object({
    email: yup
      .string()
      .required("ادخل البريد الالكتروني")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "البريد الالكتروني غير صالح"),
  })
  .required();
