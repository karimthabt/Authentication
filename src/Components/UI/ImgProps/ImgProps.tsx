import Image from "next/image";
import React, { useState } from "react";
import { FiUser } from "react-icons/fi";

interface ImgProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}

const ImgProps = ({ src, alt, className, fallback }: ImgProps) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      fallback || (
        <div
          className={`bg-gray-100 rounded-full flex items-center justify-center ${className}`}
        >
          <FiUser className="h-4 w-4 text-gray-500" />
        </div>
      )
    );
  }

  return (
    <Image
      width={100}
      height={100}
      src={src}
      alt={alt}
      className={`rounded-full object-cover ${className}`}
      onError={() => setError(true)}
    />
  );
};


export default ImgProps