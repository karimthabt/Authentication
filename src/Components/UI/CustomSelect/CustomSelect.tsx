// src/components/ui/CustomSelect.tsx
import { useState, useEffect, useRef } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  darkMode?: boolean;
}

export const CustomSelect = ({
  options,
  value,
  onChange,
  className = "",
  darkMode = false,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  // Dark mode classes
  const selectButtonClasses = darkMode
    ? "bg-gray-700 hover:bg-gray-600 text-white"
    : "bg-gray-100 hover:bg-gray-200 text-gray-800";

  const dropdownClasses = darkMode
    ? "bg-gray-800 border-gray-700 text-white"
    : "bg-white border-gray-200 text-gray-800";

  const optionClasses = (isSelected: boolean) =>
    darkMode
      ? isSelected
        ? "bg-blue-900 hover:bg-blue-800"
        : "hover:bg-gray-700"
      : isSelected
      ? "bg-blue-100 hover:bg-blue-50"
      : "hover:bg-blue-50";

  const checkIconColor = darkMode ? "text-blue-300" : "text-blue-500";

  return (
    <div
      ref={selectRef}
      className={`relative ${className}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${selectButtonClasses}`}
      >
        <div className="flex items-center">
          {selectedOption.icon && (
            <span className="ml-2">{selectedOption.icon}</span>
          )}
          <span>{selectedOption.label}</span>
        </div>
        <FiChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""} ${
            darkMode ? "text-gray-300" : "text-gray-500"
          }`}
        />
      </div>

      {isOpen && (
        <div
          className={`absolute z-10 w-full mt-1 border rounded-md shadow-lg ${dropdownClasses}`}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`flex items-center px-3 py-2 cursor-pointer ${optionClasses(
                option.value === value
              )}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.icon && <span className="ml-2">{option.icon}</span>}
              <span className="flex-grow">{option.label}</span>
              {option.value === value && <FiCheck className={checkIconColor} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
