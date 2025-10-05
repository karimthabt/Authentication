export interface IRegister {
  userName: string;
  email: string;
  password: string;
  phone: string;
}

export interface IRegisterInput {
  name: "userName" | "email" | "phone" | "password";
  placeholder: string;
  type: string;
  autocomplete: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validate?: (value: any) => boolean | string;
  };
}