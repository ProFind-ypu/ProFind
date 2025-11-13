interface InputFormProp {
  id: string;
  name: string;
  _value?: string;
  className?: string;
  maxLength?: number;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function InputForm({
  id,
  name,
  _value,
  className,
  maxLength,
  onchange = () => {},
}: InputFormProp) {
  return (
    <input
      id={id}
      name={name}
      type={"text"}
      onChange={onchange}
      value={_value}
      required
      maxLength={maxLength}
      className={`transparentInput  ${className}`}
    />
  );
}
