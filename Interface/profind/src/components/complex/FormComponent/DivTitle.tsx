import React from "react";
type DivTitleProp = { children?: React.ReactNode; className?: string };
export default function DivTitle({ children, className }: DivTitleProp) {
  return (
    <div
      className={`w-[50%] sm:w-[30%]   flex justify-center items-center text-lg  p-2 font-semibold   outline outline-black ${className}`}
    >
      {children}
    </div>
  );
}
