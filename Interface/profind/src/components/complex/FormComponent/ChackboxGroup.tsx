import { useState } from "react";
import CheckBox from "./CheckBox";

interface ChackBoxGroupProps {
  titles: string[];
  name: string;
}

export default function ChackBoxGroup({ titles, name }: ChackBoxGroupProps) {
  const [selected, setSelected] = useState<string | null>();

  const handleCheckboxClick = (title: string) => {
    // If already selected, unselect it (like radio toggle-off behavior)
    const newSelected = selected === title ? null : title;
    setSelected(newSelected);
  };
  return titles.map((title) => (
    <CheckBox
      key={title}
      name={name}
      title={title}
      Checked={selected === title}
      onClick={() => handleCheckboxClick(title)}
    />
  ));
}
