import { useState, useRef, useEffect } from "react";
interface FilterOption {
  label: string;
  value: string;
}

interface SortDropdownMenuProps {
  options: FilterOption[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

export default function SortDropdownMenu({
  options,
  onSelect,
  placeholder = "Filter",
}: SortDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<FilterOption | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null); // <-- Ref to track dropdown container

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: FilterOption) => {
    setSelected(option);
    onSelect(option.value);
    setIsOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        // onClick={toggleDropdown}
        onMouseDown={toggleDropdown}
        className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-white backdrop-blur-md rounded-md focus:outline-none focus:ring-1 focus:ring-white/40 transition-all duration-200"
      >
        {selected ? selected.label : placeholder}
        <svg
          className={`w-5 h-5 ml-2 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}

      <div
        className={`absolute  mt-2 w-40 backdrop-blur-lg transition-all duration-300
         bg-black/50 z-10 rounded-md shadow-lg  focus:outline-none
                  ${
                    isOpen
                      ? "max-h-40 opacity-100"
                      : "max-h-0  scale-0 opacity-0 pointer-events-none after:w-0"
                  }
                      `}
      >
        <div className="py-1">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900 hover:font-bold transition duration-100"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
