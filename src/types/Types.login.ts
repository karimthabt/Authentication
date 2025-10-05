export interface ILogin {
  email: string;
  password: string;
}
export interface ILoginInput {
  name: "email" | "password";
  placeholder: string;
  type: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}