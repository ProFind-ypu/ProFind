import React from "react";

type DivRowprop = {
  children?: React.ReactNode;
  className?: string;
};
export default function DivRow({ children, className }: DivRowprop) {
  return (
    <div
      className={`flex flex-row w-full ${className}`}
      dir="rtl"
      children={children}
    />
  );
}
