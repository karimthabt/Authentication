import * as yup from "yup";



export const forgotSchema = yup
  .object({
    email: yup
      .string()
      .required("  ادحل بريدك الالكتروني.")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "البريد الإلكتروني غير صالح."),
  })
  .required();
