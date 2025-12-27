import { useState } from "react";

interface InputFormProp {
  id: string;
  name: string;
  _value?: string;
  className?: string;
  maxLength?: number;
  onchange?: (newvalue: string) => void;
}
export default function InputForm({
  id,
  name,
  _value,
  className,
  maxLength,
  onchange = () => {},
}: InputFormProp) {
  const [inputValue, setInputValue] = useState(_value || "");
  return (
    <input
      id={id}
      name={name}
      type={"text"}
      value={inputValue} // ← controlled value
      onChange={(e) => {
        setInputValue(e.target.value);
        onchange(e.target.value);
      }}
      required
      maxLength={maxLength}
      className={`transparentInput  ${className}`}
    />
  );
}
