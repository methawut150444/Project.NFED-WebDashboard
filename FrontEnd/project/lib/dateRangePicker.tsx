"use client"; // ✅ Required for Next.js Client Components

import { useState, useRef, useEffect } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

// Define type for the date range
interface CustomRange {
  startDate: Date;
  endDate: Date;
  key: string;
}

const DateRangePicker: React.FC = () => {
  const [state, setState] = useState<CustomRange[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle date selection
  const handleSelect = (ranges: RangeKeyDict) => {
    setState([
      {
        startDate: ranges.selection.startDate ?? new Date(), // ✅ Ensure fallback value
        endDate: ranges.selection.endDate ?? new Date(), // ✅ Ensure fallback value
        key: "selection",
      },
    ]);
  };

  // Format date range
  const formattedRange = `${format(state[0].startDate, "dd/MM/yyyy")} - ${format(
    state[0].endDate, "dd/MM/yyyy"
  )}`;

  return (
    <div className="relative">
      {/* Button to toggle the date picker */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-1 gap-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-100 focus:ring focus:ring-gray-300"
      >
        <span role="img" aria-label="calendar" className="text-base"> 
          🗓️
        </span>
        <span className="font-poppins text-sm text-CU_Gray">{formattedRange}</span>
      </button>

      {/* Calendar dropdown */}
      {isOpen && (
        <div
          ref={calendarRef}
          className="absolute z-50 mt-2 p-2 bg-white rounded-lg shadow-lg"
        >
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;