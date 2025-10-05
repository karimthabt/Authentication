import React from "react";

type InputNormalProps = {
  placeholder: string;
  type?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function InputNormal({
  placeholder,
  type = "text",
  className = "",
  ...props
}: InputNormalProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      {...props}
    />
  );
}

export default InputNormal;
