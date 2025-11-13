import { useEffect, useRef, useState } from "react";

interface TagFilterProps {
  availableTags: Set<string>;
  tagFilterFunc: (tags: Set<string>) => void;
  placeholder?: string;
}
function TagFilter({
  availableTags,
  tagFilterFunc,
  placeholder = "Filter by tags",
}: TagFilterProps) {
  const dropdownRef = useRef<HTMLDivElement>(null); // <-- Ref to track dropdown container
  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    new Set<string>(),
  );
  const [isExpanded, setIsExpanded] = useState(false);
  //remove Tag if exsist and add Tag if it dosent exsist
  function toggleTag(tag: string) {
    const tmp = new Set(selectedTags);
    if (selectedTags.has(tag)) {
      tmp.delete(tag);
      setSelectedTags(tmp);
    } else {
      tmp.add(tag);
      setSelectedTags(tmp);
    }
    tagFilterFunc(tmp);
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={dropdownRef}>
      <div
        className="px-4 py-2 w-fit backdrop-blur-lg  bg-transparent border border-white/30  rounded-md  shadow-lg   text-nowrap transition-all duration-300
         "
      >
        {/* Compact Header - Always Visible */}
        <div
          className="flex flex-row max-w-full  items-center cursor-pointer"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {/* Left Side: Selected Tags or Placeholder */}
          {selectedTags.size > 0 ? (
            <div className="flex flex-row  flex-wrap max-w-full gap-2 ">
              {[...selectedTags].map((tag) => (
                <div
                  key={tag}
                  className=" px-2 py-1  bg-white/20  text-white flex text-sm rounded-full gap-2  border border-transparent hover:bg-white/30 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTag(tag);
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          ) : (
            <span className="text-white ">{placeholder}</span>
          )}

          {/* Right Arrow Icon */}
          <span
            className={`ml-2 text-gray-300 h-fit transform transition-transform duration-300
                    ${isExpanded ? "rotate-180" : "rotate-90"}`}
          >
            ➜
          </span>
        </div>
      </div>
      {/* Expandable Menu */}
      <div className=" ">
        <div
          className={`
                mt-2 px-2 py-3
                bg-black/50 backdrop-blur-md rounded-md
                grid grid-cols-2 gap-3
                transition-all duration-300 ease-in-out
                origin-top absolute z-10
                ${
                  isExpanded
                    ? " opacity-100"
                    : "  scale-0 opacity-0 pointer-events-none "
                }
                `}
        >
          {[...availableTags].map((tag) => {
            const isSelected = selectedTags.has(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`
                px-3 py-1
                text-sm
                rounded-full
                transition-all
                duration-200
                ${
                  isSelected
                    ? "bg-blue-600/80 text-white ring-1 ring-blue-500/80"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }
                hover:scale-105
                `}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TagFilter;
