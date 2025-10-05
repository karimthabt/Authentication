// src/types/Forgotcode.ts
export interface IForgotCode {
  email: string;
}

export const ForgotCode = [
  {
    name: "email" as const,
    type: "email",
    placeholder: "البريد الإلكتروني",
    validation: {
      required: "البريد الإلكتروني مطلوب",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "بريد إلكتروني غير صالح",
      },
    },
  },
];