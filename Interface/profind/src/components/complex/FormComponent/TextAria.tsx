import { useEffect, useRef, useState } from "react";

export default function TextAria() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
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
      onChange={(e) => setText(e.target.value)}
      className="w-full min-h-full text-center p-1 resize-y overflow-hidden"
    />
  );
}
