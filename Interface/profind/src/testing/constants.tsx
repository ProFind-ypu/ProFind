// import { useState } from "react";
// import { filterItems } from "../helpers/_SearchHelpers";

export type User = {
  id: number;
  name: string;
  avatarUrl: string;
  tags: string[];
  email: string;
};

export type ProjectInfo = {
  id: number;
  title: string;
  description: string;
  taken: boolean;
  tags: Set<string>;
  supervisor: string;
  creation_time: Date;
};
export const MOCK_supervisor: User[] = [
  {
    id: 1,
    name: "Alice",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    tags: ["hallow", "frendly", "idk", "hallow", "frendly", "idk"],
    email: "imAProfessor@mail.what",
  },
  {
    id: 2,
    name: "Bob",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    tags: ["hallow", "frendly", "idk"],
    email: "imAProfessor@mail.what",
  },
  {
    id: 3,
    name: "Charlie",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    tags: ["hallow", "frendly", "idk"],
    email: "imAProfessor@mail.what",
  },
  {
    id: 4,
    name: "Diana",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    tags: ["hallow", "frendly", "idk"],
    email: "imAProfessor@mail.what",
  },
  {
    id: 5,
    name: "Eve",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    tags: ["hallow", "frendly", "idk"],
    email: "imAProfessor@mail.what",
  },
  {
    id: 6,
    name: "Frank",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    tags: ["hallow", "frendly", "idk"],
    email: "imAProfessor@mail.what",
  },
  {
    id: 5,
    name: "Eve",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    tags: ["hallow", "frendly", "idk"],
    email: "imAProfessor@mail.what",
  },
  {
    id: 6,
    name: "Frank",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    tags: ["hallow", "frendly", "idk"],
    email: "imAProfessor@mail.what",
  },
  {
    id: 5,
    name: "Eve",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    tags: ["hallow", "frendly", "idk"],
    email: "imAProfessor@mail.what",
  },
  {
    id: 6,
    name: "Frank",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    tags: ["hallow", "frendly", "idk"],
    email: "imAProfessor@mail.what",
  },
  {
    id: 5,
    name: "Eve",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    tags: ["hallow", "frendly", "idk"],
    email: "imAProfessor@mail.what",
  },
  {
    id: 6,
    name: "Frank",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    tags: ["hallow", "frendly", "idk"],
    email: "imAProfessor@mail.what",
  },
  {
    id: 5,
    name: "Eve",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    tags: ["hallow", "frendly", "idk"],
    email: "imAProfessor@mail.what",
  },
  {
    id: 6,
    name: "Frank",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    tags: ["hallow", "frendly", "idk"],
    email: "imAProfessor@mail.what",
  },
];

// Sample item data
export const MOCK_projectinfo: ProjectInfo[] = [
  {
    id: 1,
    title: "Beautiful Landscape",
    description: "A stunning view of mountains and lakes under the sunset.",
    tags: new Set<string>(["React", "AI", "Database"]),
    taken: true,
    supervisor: "Dr,Mazen",
    creation_time: new Date(),
  },
  {
    id: 2,
    title: "Modern Architecture",
    description:
      " Innovative building design blending nature and technology.Innovative building design blending nature and technology Innovative building design blending nature and technology.Innovative building design blending nature and technology",
    tags: new Set<string>(["Programming", "AI", "HTML"]),
    taken: false,
    supervisor: "Dr,Heam",
    creation_time: new Date(),
  },
  {
    id: 3,
    title: "Cozy Coffee Shop",
    description: "Warm ambiance with great coffee and books.",
    tags: new Set<string>(["CSS", "AI", "Tailwind"]),
    taken: false,
    supervisor: "Dr,Anas",
    creation_time: new Date(),
  },
  {
    id: 4,
    title: "Adventure Hiking",
    description: "Trail through forest leading to a breathtaking waterfall.",
    tags: new Set<string>(["Programming", "AI", "Database"]),
    taken: true,
    supervisor: "Dr,Shrodinger",
    creation_time: new Date(),
  },
  {
    id: 4,
    title: "Adventure Hiking",
    description: "Trail through forest leading to a breathtaking waterfall.",
    tags: new Set<string>(["Programming", "AI", "Database"]),
    taken: true,
    supervisor: "Dr,Shrodinger",
    creation_time: new Date(),
  },
  {
    id: 4,
    title: "Adventure Hiking",
    description: "Trail through forest leading to a breathtaking waterfall.",
    tags: new Set<string>(["Programming", "AI", "Database"]),
    taken: true,
    supervisor: "Dr,Shrodinger",
    creation_time: new Date(),
  },
];
// filters options
export const SortOptions = [
  { label: "Title", value: "title" },
  { label: "Creation Time", value: "time_of_creation" },
  { label: "Books", value: "books" },
];
export const handleFilterSelect = (value: string) => {
  console.log("Selected filter:", value);
  // Apply filtering logic here
};
//search bar layout
// export const [SearchedProducts, setSearchedProducts] = useState<Item[]>(MOCK_projectinfo);
//discard empty search input , set the SearchedProducts variable
// export const handleSearch = (term: string) =>
//    term != "" ? setSearchedProducts(filterItems(MOCK_projectinfo, term, [])) : null;
//tags Filter
export const allTags = new Set<string>([
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Tailwind",
  "CSS",
  "HTML",
  "Next.js",
]);
// export const [selectedTags, setSelectedTags] = useState<string[]>([]);
