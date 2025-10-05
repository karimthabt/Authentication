import React from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isDarkMode?: boolean;
}

export default function UserTableSearch({
  searchTerm,
  setSearchTerm,
  isDarkMode = false,
}: SearchBarProps) {
  return (
    <div className="relative mx-4 my-3">
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <FiSearch className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="ابحث عن مستخدم..."
        className={`w-full pr-10 pl-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300 text-gray-900"
        }`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
