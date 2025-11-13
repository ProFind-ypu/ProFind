type CheckBoxProps = {
  title: string;
  className?: string;
  onClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CheckBox({ title, className, onClick }: CheckBoxProps) {
  return (
    <div
      className={`flex justify-center p-2 gap-1 flex-col md:flex-row ${className}`}
    >
      <label htmlFor={title + "id"}>{title}</label>
      <input id={title + "id"} type="checkbox" onChange={onClick} />
    </div>
  );
}
