// Types.verifyCode.ts
export interface IVerifyCode {
  code: string;
}

export interface IverifyCodeInput {
  name: string;
  placeholder: string;
  type: string;
  validation?: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}