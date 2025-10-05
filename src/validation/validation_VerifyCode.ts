import * as yup from "yup";

export const verifyCodeSchema = yup
  .object()
  .shape({
    code: yup
      .string()
      .required("الكود مطلوب")
      .length(4, "الكود يجب أن يكون 4 أرقام"),
  })
  .required();
