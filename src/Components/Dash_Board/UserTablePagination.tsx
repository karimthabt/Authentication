import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { PaginationProps } from "./UserTableProps";

export default function UserTablePagination({
  currentPage,
  totalPages,
  onPageChange,
  isDarkMode = false,
  isMobile = false,
}: PaginationProps) {
  const pageNumbers = [];
  const maxVisiblePages = isMobile ? 3 : 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-4 pb-4">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 mx-1 rounded border flex items-center disabled:opacity-50 ${
          isDarkMode
            ? "border-gray-600 hover:bg-gray-700"
            : "border-gray-300 hover:bg-gray-100"
        }`}
      >
        <FiChevronLeft className="ml-1" /> السابق
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className={`px-3 py-1 mx-1 rounded ${
              1 === currentPage
                ? "bg-blue-500 text-white border-blue-500"
                : isDarkMode
                ? "border-gray-600 hover:bg-gray-700"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            1
          </button>
          {startPage > 2 && <span className="mx-1">...</span>}
        </>
      )}

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 mx-1 rounded ${
            number === currentPage
              ? "bg-blue-500 text-white border-blue-500"
              : isDarkMode
              ? "border-gray-600 hover:bg-gray-700"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        >
          {number}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="mx-1">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className={`px-3 py-1 mx-1 rounded ${
              totalPages === currentPage
                ? "bg-blue-500 text-white border-blue-500"
                : isDarkMode
                ? "border-gray-600 hover:bg-gray-700"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 mx-1 rounded border flex items-center disabled:opacity-50 ${
          isDarkMode
            ? "border-gray-600 hover:bg-gray-700"
            : "border-gray-300 hover:bg-gray-100"
        }`}
      >
        التالي <FiChevronRight className="mr-1" />
      </button>
    </div>
  );
}
