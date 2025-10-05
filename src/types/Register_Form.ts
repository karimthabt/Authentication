import { IRegisterInput } from "./Types.register";

export const REGISTER_FORM: IRegisterInput[] = [
  {
    name: "userName",
    placeholder: "الاســــم",
    type: "text",
    autocomplete: "username",
    validation: {
      required: true,
      minLength: 5,
    },
  },
  {
    name: "email",
    placeholder: "البريد الالكتروني",
    type: "email",
    autocomplete: "email",
    validation: {
      required: true,
      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    },
  },
  {
    name: "phone",
    placeholder: "رقم الهاتف",
    type: "tel", // Changed from "number" to "tel" for better mobile support
    autocomplete: "tel",
    validation: {
      required: true,
      minLength: 11,
    },
  },
  {
    name: "password",
    placeholder: "كلمه السر",
    type: "password",
    autocomplete: "new-password", // Changed for better security
    validation: {
      required: true,
      minLength: 6,
    },
  },

];