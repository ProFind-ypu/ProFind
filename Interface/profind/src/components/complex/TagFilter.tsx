// src/components/TagFilter.tsx

import React, { useEffect, useRef, useState } from "react";
import { addTag, removeTag } from "../../helpers/_TagFilterUtils";
interface TagFilterProps {
   availableTags: string[];
   selectedTags: string[];
   onTagsChange: (tags: string[]) => void;
   placeholder?: string;
}

const TagFilter: React.FC<TagFilterProps> = ({
   availableTags,
   selectedTags,
   onTagsChange,
   placeholder = "Filter by tags",
}) => {
   const dropdownRef = useRef<HTMLDivElement>(null); // <-- Ref to track dropdown container

   const [isExpanded, setIsExpanded] = useState(false);

   const handleTagClick = (tag: string) => {
      const isSelected = selectedTags.includes(tag);
      const updatedTags = isSelected
         ? removeTag(selectedTags, tag)
         : addTag(selectedTags, tag);

      onTagsChange(updatedTags);
   };
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
         ">
            {/* Compact Header - Always Visible */}
            <div
               className="flex flex-row max-w-full  items-center cursor-pointer"
               onClick={() => setIsExpanded((prev) => !prev)}>
               {/* Left Side: Selected Tags or Placeholder */}
               {selectedTags.length > 0 ? (
                  <div className="flex flex-row  flex-wrap max-w-full gap-2 ">
                     {selectedTags.map((tag) => (
                        <div
                           key={tag}
                           className=" px-2 py-1  bg-white/20  text-white flex text-sm rounded-full gap-2  border border-transparent hover:bg-white/30 transition-colors"
                           onClick={(e) => {
                              e.stopPropagation();
                              onTagsChange(removeTag(selectedTags, tag));
                           }}>
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
                    ${isExpanded ? "rotate-180" : "rotate-90"}`}>
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
                origin-top absolute z-20
                ${
                   isExpanded
                      ? " opacity-100"
                      : "  scale-0 opacity-0 pointer-events-none "
                }
                `}>
               {availableTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                     <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
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
                `}>
                        {tag}
                     </button>
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export default TagFilter;
