import { useEffect, useState } from "react";
import CheckBox from "./CheckBox";

interface CheckBoxGroupProps {
  titles: string[];
  name: string;
  singleSelect?: boolean;
  value?: number[];
  onChange?: (selectedIndices: number[]) => void;
}

export default function CheckBoxGroup({
  titles,
  name,
  singleSelect = false,
  value,
  onChange,
}: CheckBoxGroupProps) {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  // Sync with parent-controlled value
  useEffect(() => {
    if (value !== undefined) {
      setSelectedIndices(value);
    }
  }, [value]);

  const handleCheckboxClick = (index: number) => {
    let newSelected: number[];

    if (singleSelect) {
      newSelected = [index];
    } else {
      const isSelected = selectedIndices.includes(index);
      newSelected = isSelected
        ? selectedIndices.filter((i) => i !== index)
        : [...selectedIndices, index];
    }

    setSelectedIndices(newSelected);
    onChange?.(newSelected);
  };

  return titles.map((title, index) => (
    <CheckBox
      key={index}
      name={name}
      title={title}
      Checked={selectedIndices.includes(index)}
      onClick={() => handleCheckboxClick(index)}
    />
  ));
}
