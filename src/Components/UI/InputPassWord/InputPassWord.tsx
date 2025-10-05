import React, { forwardRef, useState } from "react";

type Props = {
  placeholder: string;
  error?: boolean;
  helperText?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputPassword = forwardRef<HTMLInputElement, Props>(
  ({ placeholder, error, helperText, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={`w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 transition-all ${
            error
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[27px] transform -translate-y-1/2 text-xl"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
        {error && helperText && (
          <p className="mt-1 text-sm text-red-600">{helperText}</p>
        )}
      </div>
    );
  }
);

InputPassword.displayName = "InputPassword";
export default InputPassword;
