export const LOGIN_FORM = [
  {
    name: "email",
    type: "email",
    placeholder: "ادخل بريدك الالكتروني",
    validation: {
      required: "البريد الإلكتروني مطلوب",
      pattern: {
        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
        message: "البريد الإلكتروني غير صالح",
      },
    },
  },
  {
    name: "password",
    type: "password",
    placeholder: "ادخل كلمة المرور",
    validation: {
      required: "كلمة المرور مطلوبة.",
      minLength: {
        value: 6,
        message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
        message: "كلمة المرور يجب أن تحتوي على حروف وأرقام ورموز",
      },
    },
  },
];
