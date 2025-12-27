import React, { useState } from "react";
import StudentField from "./StudentField";

interface Student {
  name: string;
  uni_id: string;
}
interface StudentGroupFieldsProp {
  values: Student[];
  onchange: (stds: Student[]) => void;
}
const StudentGroupFields: React.FC<StudentGroupFieldsProp> = ({
  values,
  onchange,
}: StudentGroupFieldsProp) => {
  const [studentCount, setStudentCount] = useState(values ? values.length : 1);
  const [students, setStudents] = useState<Student[]>(
    values ? values : [{ name: "", uni_id: "" }],
  );
  const handleStudentCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.min(Math.max(1, parseInt(e.target.value) || 1), 4);
    setStudentCount(count);
    // Update students array based on count
    const newStudents = Array.from({ length: count }, (_, i) => ({
      id: `studentfield${i === 0 ? "" : i + 1}`,
      name: students[i]?.name || "",
      uni_id: students[i]?.uni_id || "",
    }));
    setStudents(newStudents);
  };
  const handleStudentfieldChange = (newV: string[], index: number) => {
    students[index] = { name: newV[0], uni_id: newV[1] };
    setStudents(students);
    onchange(students);
  };

  return (
    <div>
      <div className="flex flex-row w-full items-center">
        <span className="text-nowrap pr-4">عدد الطلاب :</span>
        <input
          type="number"
          id="studentAmount"
          max={4}
          min={1}
          defaultValue={values.length}
          className="max-w-8 pr-1 border-0 focus:outline-0"
          onChange={handleStudentCountChange}
        />
      </div>
      {students.map((student, index) => (
        <StudentField
          key={index}
          id={index}
          std_name={student.name}
          std_unidi={student.uni_id}
          hidden={index >= studentCount}
          onChange={handleStudentfieldChange}
        />
      ))}
    </div>
  );
};

export default StudentGroupFields;
