import React from "react";

function LoaderText() {
  return (
    <span className="flex items-center justify-center gap-2 text-white">
      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      جاري التحقق...
    </span>
  );
}

export default LoaderText;
