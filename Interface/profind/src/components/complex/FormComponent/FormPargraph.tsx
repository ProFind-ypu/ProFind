import * as React from "react";

interface FormPargraphProps {
  text: string;
  outline?: boolean;
  className?: string;
}

const FormPargraph: React.FC<FormPargraphProps> = ({
  text,
  outline = true,
  className,
}) => {
  return (
    <p
      className={`${!outline ? "outline-0!" : ""} white-space: whitespace-pre-wrap ${className}`}
    >
      {text}
    </p>
  );
};

export default FormPargraph;
