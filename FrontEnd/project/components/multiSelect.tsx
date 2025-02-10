"use client"; // ✅ Ensure it's a Client Component in Next.js

import { useState, useEffect, useRef } from "react";

// Define props type
interface MultiSelectDropdownProps {
  options: string[]; // ✅ Explicitly set options as an array of strings
  placeholder?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options, placeholder = "Select options..." }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // ✅ Explicitly define as boolean
  const [selectedOption, setSelectedOption] = useState<string>(""); // ✅ Define as string
  const dropdownRef = useRef<HTMLDivElement | null>(null); // ✅ Define the ref type

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false); // ✅ Close dropdown when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle selection
  const handleSelect = (option: string) => {
    setSelectedOption(option); // ✅ Set the selected option
    setIsOpen(false); // ✅ Close the dropdown
  };

  return (
    <div className="relative w-full text-gray-400" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-gray-300 bg-white rounded-lg px-4 py-2 text-left focus:outline-none hover:border-gray-400 overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {selectedOption || placeholder}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
          {options.length > 0 ? (
            options.map((option: string) => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 overflow-hidden text-ellipsis whitespace-nowrap"
                title={option} // Tooltip for full text
              >
                {option}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-400">No Options Available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;