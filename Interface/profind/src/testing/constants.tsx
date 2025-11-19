import { getRandomSublist } from "../helpers/_getrandomTag";

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
  status: boolean;
  tags: Set<string>;
  requirements: string[];
  suggestedStudentCount: number;
  supervisor: string;
  creation_time: Date;
};
export const randTags = [
  "Artificial Intelligence",
  "Linux",
  "BSD",
  "Flutter",
  "React",
  "Laravel",
  "Backend",
  "Frontend",
  "Desgin",
  "Cybersecurity",
  "Database",
  "System Design",
  "Mobile",
  "Web",
  "Desktop",
  "Jave",
  "Python",
  "Networking",
  "CellPhone Networks",
  "Robotics",
];
export const MOCK_supervisor: User[] = [
  {
    id: 1,
    name: "Alice",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    tags: getRandomSublist(Math.floor(Math.random() * 5) + 3),
    email: "ProfessorEmail@gmail.com",
  },
  {
    id: 2,
    name: "Bob",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    tags: getRandomSublist(Math.floor(Math.random() * 5) + 3),
    email: "ProfessorEmail@gmail.com",
  },
  {
    id: 3,
    name: "Charlie",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    tags: getRandomSublist(Math.floor(Math.random() * 5) + 3),
    email: "ProfessorEmail@gmail.com",
  },
  {
    id: 4,
    name: "Diana",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    tags: getRandomSublist(Math.floor(Math.random() * 5) + 3),
    email: "ProfessorEmail@gmail.com",
  },
  {
    id: 5,
    name: "Eve",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    tags: getRandomSublist(Math.floor(Math.random() * 5) + 3),
    email: "ProfessorEmail@gmail.com",
  },
  {
    id: 6,
    name: "Frank",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    tags: getRandomSublist(Math.floor(Math.random() * 5) + 3),
    email: "ProfessorEmail@gmail.com",
  },
  {
    id: 7,
    name: "Eve",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    tags: getRandomSublist(Math.floor(Math.random() * 5) + 3),
    email: "ProfessorEmail@gmail.com",
  },
  {
    id: 8,
    name: "Frank",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    tags: getRandomSublist(Math.floor(Math.random() * 5) + 3),
    email: "ProfessorEmail@gmail.com",
  },
  {
    id: 9,
    name: "Eve",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    tags: getRandomSublist(Math.floor(Math.random() * 5) + 3),
    email: "ProfessorEmail@gmail.com",
  },
  {
    id: 10,
    name: "Frank",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    tags: getRandomSublist(Math.floor(Math.random() * 5) + 3),
    email: "ProfessorEmail@gmail.com",
  },
  {
    id: 11,
    name: "Eve",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    tags: getRandomSublist(Math.floor(Math.random() * 5) + 3),
    email: "ProfessorEmail@gmail.com",
  },
  {
    id: 12,
    name: "Frank",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    tags: getRandomSublist(Math.floor(Math.random() * 5) + 3),
    email: "ProfessorEmail@gmail.com",
  },
  {
    id: 13,
    name: "Eve",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    tags: getRandomSublist(Math.floor(Math.random() * 5) + 3),
    email: "ProfessorEmail@gmail.com",
  },
  {
    id: 14,
    name: "Frank",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    tags: getRandomSublist(Math.floor(Math.random() * 5) + 3),
    email: "ProfessorEmail@gmail.com",
  },
];

// Sample item data
export const MOCK_projectinfo: ProjectInfo[] = [
  {
    id: 1,
    title: "Beautiful Landscape",
    description: "A stunning view of mountains and lakes under the sunset.",
    tags: new Set<string>(["React", "AI", "Database"]),
    requirements: [
      "Strong knowledge of TypeScript or Python",
      "Experience with React or similar frontend frameworks",
      "Familiarity with machine learning concepts (preferred)",
      "Good communication skills and teamwork",
    ],
    suggestedStudentCount: 3,
    status: true,
    supervisor: "Dr,Mazen",
    creation_time: new Date(),
  },
  {
    id: 2,
    title: "Modern Architecture",
    description:
      " Innovative building design blending nature and technology.Innovative building design blending nature and technology Innovative building design blending nature and technology.Innovative building design blending nature and technology",
    tags: new Set<string>(["Programming", "AI", "HTML"]),
    requirements: [
      "Strong knowledge of TypeScript or Python",
      "Experience with React or similar frontend frameworks",
      "Familiarity with machine learning concepts (preferred)",
      "Good communication skills and teamwork",
    ],
    suggestedStudentCount: 3,
    status: false,
    supervisor: "Dr,Heam",
    creation_time: new Date(),
  },
  {
    id: 3,
    title: "Cozy Coffee Shop",
    description: "Warm ambiance with great coffee and books.",
    tags: new Set<string>(["CSS", "AI", "Tailwind"]),
    requirements: [
      "Strong knowledge of TypeScript or Python",
      "Experience with React or similar frontend frameworks",
      "Familiarity with machine learning concepts (preferred)",
      "Good communication skills and teamwork",
    ],
    suggestedStudentCount: 3,
    status: false,
    supervisor: "Dr,Anas",
    creation_time: new Date(),
  },
  {
    id: 4,
    title: "Adventure Hiking",
    description: "Trail through forest leading to a breathtaking waterfall.",
    tags: new Set<string>(["Programming", "AI", "Database"]),
    requirements: [
      "Strong knowledge of TypeScript or Python",
      "Experience with React or similar frontend frameworks",
      "Familiarity with machine learning concepts (preferred)",
      "Good communication skills and teamwork",
    ],
    suggestedStudentCount: 3,
    status: true,
    supervisor: "Dr,Shrodinger",
    creation_time: new Date(),
  },
  {
    id: 4,
    title: "Adventure Hiking",
    description: "Trail through forest leading to a breathtaking waterfall.",
    tags: new Set<string>(["Programming", "AI", "Database"]),
    requirements: [
      "Strong knowledge of TypeScript or Python",
      "Experience with React or similar frontend frameworks",
      "Familiarity with machine learning concepts (preferred)",
      "Good communication skills and teamwork",
    ],
    suggestedStudentCount: 3,
    status: true,
    supervisor: "Dr,Shrodinger",
    creation_time: new Date(),
  },
  {
    id: 4,
    title: "Adventure Hiking",
    description: "Trail through forest leading to a breathtaking waterfall.",
    tags: new Set<string>(["Programming", "AI", "Database"]),
    requirements: [
      "Strong knowledge of TypeScript or Python",
      "Experience with React or similar frontend frameworks",
      "Familiarity with machine learning concepts (preferred)",
      "Good communication skills and teamwork",
    ],
    suggestedStudentCount: 3,
    status: true,
    supervisor: "Dr,Shrodinger",
    creation_time: new Date(),
  },
];
// filters options
export const SortOptions = [
  { label: "Title", value: "title" },
  { label: "Creation Time", value: "time_of_creation" },
];
// export const handleFilterSelect = (value: string) => {
//   console.log("Selected filter:", value);
//   // Apply filtering logic here
// };
//search bar layout
// export const [SearchedProducts, setSearchedProducts] = useState<Item[]>(MOCK_projectinfo);
//discard empty search input , set the SearchedProducts variable
// export const handleSearch = (term: string) =>
//    term != "" ? setSearchedProducts(filterItems(MOCK_projectinfo, term, [])) : null;
//tags Filter
export const SortTags = new Set<string>([
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
