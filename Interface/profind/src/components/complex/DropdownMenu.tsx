import { useState, useRef, useEffect } from "react";
import { HiMiniChevronDown } from "react-icons/hi2";
import type { IconType } from "react-icons/lib";

interface FilterOption {
  label: string;
  value: string;
  icon?: IconType;
}

interface DropdownMenuProps {
  options: FilterOption[];
  onSelect: (value: string) => void;
  placeholder?: string;
  backgroundClass?: string;
  textClass?: string;
}

export default function DropdownMenu({
  options,
  onSelect,
  placeholder = "Filter",
  backgroundClass,
  textClass,
}: DropdownMenuProps) {
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
    <div
      className={`flex flex-col justify-center text-left ${backgroundClass}`}
      ref={dropdownRef}
    >
      {/* Dropdown Button */}
      <button
        type="button"
        // onClick={toggleDropdown}
        onMouseDown={toggleDropdown}
        className={
          "inline-flex text-nowrap justify-between gap-1 items-center w-full px-4 py-2 text-sm font-medium text-white backdrop-blur-md rounded-md focus:outline-none focus:ring-1 focus:ring-white/40 transition-all duration-200 " +
          textClass
        }
      >
        {selected ? selected.label : placeholder}
        <HiMiniChevronDown size={20} />
      </button>

      {/* Dropdown Menu */}
      <div className="flex justify-center">
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
                className={`flex flex-row items-center font-bold gap-2 w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900 hover:font-bold transition duration-100 ${textClass}`}
              >
                {option.icon ? <option.icon size={22} /> : ""}
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
