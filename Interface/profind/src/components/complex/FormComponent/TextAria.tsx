import { useEffect, useRef, useState } from "react";
interface inputvalue {
  value: string | undefined;
  onchange: (value: string) => void;
}
export default function TextAria({ value, onchange }: inputvalue) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState(value || "");
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [text]);
  return (
    <textarea
      ref={textareaRef}
      onChange={(e) => {
        setText(e.target.value);
        onchange(e.target.value);
      }}
      value={text}
      className="w-full min-h-full text-center p-1 resize-y overflow-hidden"
    />
  );
}
