import TagWrapper from "../components/complex/TagWrapper";
import ProjectPreviewCard from "../components/Primary/ProjectCard";
import { MOCK_projectinfo } from "../testing/constants";

interface Professor {
  id: number;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  office: string;
  bio: string;
  researchInterests: string[];
  publications: string[];
  officeHours: string;
  avatarUrl: string;
}

// Mock data
const professorData: Professor = {
  id: 1,
  name: "Dr,Mazen",
  title: "Associate Professor of Computer Science",
  department: "Department of Computer Science",
  email: "e.reed@university.edu",
  phone: "+1 (555) 234-5678",
  office: "Science Building, Room 405",
  bio: "Dr. Eleanor Reed specializes in artificial intelligence, machine learning, and ethical computing. She leads the AI Ethics Lab and has published over 40 peer-reviewed papers. Her work focuses on fairness in algorithmic decision-making.",
  researchInterests: [
    "Artificial Intelligence",
    "Machine Learning",
    "Ethics in AI",
    "Natural Language Processing",
    "Human-Computer Interaction",
  ],
  publications: [
    "Reed, E. et al. (2024). Fairness-aware ML Models in Healthcare. *Journal of AI Research*",
    "Reed, E. (2023). Bias Detection in NLP Systems. *Proceedings of ACL*",
    "Reed, E., & Kim, T. (2022). Explainable AI for Policy Makers. *AI & Society*",
  ],
  officeHours: "Mon & Wed, 2:00 PM – 4:00 PM (or by appointment)",
  avatarUrl: "https://randomuser.me/api/portraits/women/45.jpg",
};

export default function Profile() {
  const {
    name,
    title,
    department,
    email,
    phone,
    office,
    bio,
    researchInterests,
    // publications,
    officeHours,
    avatarUrl,
  } = professorData;

  return (
    <main className="min-h-screen  text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header: Profile Info */}
        <header className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-10">
          {/* Avatar */}
          <div className="shrink-0 flex justify-center">
            <img
              src={avatarUrl}
              alt={`${name} - ${title}`}
              className="h-32 w-32 md:h-40 md:w-40 rounded-full object-cover border-2 border-white shadow-lg"
            />
          </div>

          {/* Text Content */}
          <div className="text-center sm:text-left space-y-3 w-full">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
              {name}
            </h1>
            <p className="text-lg md:text-xl text-indigo-300 font-medium">
              {title}
            </p>
            <p className="text-gray-300">{department}</p>

            {/* Contact Details */}
            <div className="mt-5 space-y-2 text-sm sm:text-base">
              <p className="flex flex-wrap gap-x-2">
                <span className="text-gray-400 min-w-max">Email:</span>
                <a
                  href={`mailto:${email}`}
                  className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors duration-200 truncate"
                >
                  {email}
                </a>
              </p>
              <p className="flex flex-wrap gap-x-2">
                <span className="text-gray-400 min-w-max">Phone:</span>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors duration-200"
                >
                  {phone}
                </a>
              </p>
              <p className="flex flex-wrap gap-x-2">
                <span className="text-gray-400 min-w-max">Office:</span>
                <span className="text-gray-200">{office}</span>
              </p>
              <p className="flex flex-wrap gap-x-2">
                <span className="text-gray-400 min-w-max">Office Hours:</span>
                <span className="text-green-300 font-medium">
                  {officeHours}
                </span>
              </p>
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:gap-8 md:grid-cols-2">
          {/* About Section */}
          <section className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-indigo-400 border-b border-white/30 pb-2 mb-5 flex items-center justify-center sm:justify-start gap-2">
              🧑‍🏫 About
            </h2>
            <p className="text-gray-300 leading-relaxed">{bio}</p>
          </section>

          {/* Research Interests */}
          <section className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-indigo-400 border-b border-white/30 pb-2 mb-5 flex items-center justify-center sm:justify-start gap-2">
              🔬 Projects Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {researchInterests.map((interest) => (
                <TagWrapper
                  key={interest}
                  title={interest}
                  classname="hover:bg-white/20 transition-colors duration-200 cursor-default"
                />
              ))}
            </div>
          </section>

          {/* Publications */}
          <section className="md:col-span-2">
            <h2 className="text-2xl font-bold text-indigo-400 border-b border-white/30 pb-2 mb-5 flex items-center justify-center sm:justify-start gap-2">
              📚 Selected Projects
            </h2>
            <ul className="space-y-4">
              {/*{publications.map((pub, index) => (
                <li
                  key={index}
                  className="text-gray-200 leading-relaxed pl-5 border-l-4 border-indigo-600 hover:border-indigo-400 group transition-all duration-200 relative"
                >
                  <span className="block italic group-hover:text-white">
                    {pub}
                  </span>
                </li>
              ))}*/}
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {MOCK_projectinfo.map((item) => {
                  if (item.supervisor === professorData.name)
                    return <ProjectPreviewCard project_info={item} />;
                })}
              </div>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
