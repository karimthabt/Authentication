// constants.ts أو أي ملف فيه الفورم

import { IverifyCodeInput } from "./Types.verifyCode";

export const VERIFYCODE_FORM: IverifyCodeInput[] = [
  {
    name: "code",
    placeholder: "كود التحقق",
    type: "text",
    validation: {
      required: true,
      minLength: 4,
      pattern: /^[0-9]+$/, // يتحقق إن الكود كله أرقام فقط
    },
  },
];
