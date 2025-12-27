import { useState } from "react";
import InputForm from "./InputForm";

interface StudentFieldProps {
  id: number;
  name?: string;
  hidden?: boolean;
  std_name?: string;
  std_unidi?: string;
  onChange: (v: string[], index: number) => void;
}
export default function StudentField({
  id,
  name,
  hidden = true,
  std_name,
  std_unidi,
  onChange: onchange,
}: StudentFieldProps) {
  const [studentInfo, setStudentInfo] = useState<string[]>([
    std_name || "",
    std_unidi || "",
  ]);
  const handleChange = (name?: string, unid?: string) => {
    const newValues = [...studentInfo];
    if (name) {
      newValues[0] = name;
    }
    if (unid) {
      newValues[1] = unid;
    }
    setStudentInfo(newValues);
    onchange(newValues, id);
  };
  return (
    <>
      <div
        id={"studentfield" + id.toString()}
        className="grid grid-cols-2 sm:grid-cols-4 studentField"
        hidden={hidden}
      >
        <p>اسم الطالب</p>

        <p>الرقم الجامعي</p>

        <p className="hidden sm:block ">التوقيع</p>

        <p className="hidden sm:block">التاريخ</p>
        <InputForm
          id=""
          name={`name${name}`}
          _value={std_name}
          maxLength={30}
          onchange={(v) => handleChange(v, undefined)}
        />

        <InputForm
          id=""
          name={`idnumber${name}`}
          _value={std_unidi}
          maxLength={10}
          onchange={(v) => handleChange(undefined, v)}
        />
        <InputForm id="" name="" maxLength={10} className="hidden sm:block" />
        <InputForm id="" name="" maxLength={10} className="hidden sm:block" />
      </div>
    </>
  );
}
