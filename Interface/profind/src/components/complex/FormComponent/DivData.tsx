import { type ReactNode } from "react";

type DivDataProp = { children?: ReactNode; className?: string };
export default function DivData({ children, className }: DivDataProp) {
  return (
    <div id="divData" className={`w-full text-center ${className}`}>
      {children}
    </div>
  );
}
