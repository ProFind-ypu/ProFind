import InputForm from "./InputForm";

interface StudentFieldProps {
  id: string;
  name?: string;
  hidden?: boolean;
}
export default function StudentField({
  id,
  name,
  hidden = true,
}: StudentFieldProps) {
  return (
    <>
      <div
        id={id}
        className="grid grid-cols-2 sm:grid-cols-4 studentField"
        hidden={hidden}
      >
        <p>اسم الطالب</p>

        <p>الرقم الجامعي</p>

        <p className="hidden sm:block ">التوقيع</p>

        <p className="hidden sm:block">التاريخ</p>
        <InputForm id="" name={`name${name}`} maxLength={30} />

        <InputForm id="" name={`idnumber${name}`} maxLength={10} />
        <InputForm id="" name="" maxLength={10} className="hidden sm:block" />
        <InputForm id="" name="" maxLength={10} className="hidden sm:block" />
      </div>
    </>
  );
}
