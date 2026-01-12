import { useNavigate, useSearchParams } from "react-router-dom";
import type { Professor } from "../class/Professor";
import TagWrapper from "../components/complex/TagWrapper";
import { useEffect, useState } from "react";
import ProfessorsService from "../class/Services/ProfessorsService";
import ProjectService from "../class/Services/projectService";
import type { ProjectInfo } from "../class/ProjectInfo";
import ProjectPreviewCard from "../components/Primary/ProjectPreviewCard";
import BackButton from "../components/Primary/BackButton";
// import { MOCK_projectinfo } from "../testing/constants";

// const professorData: Professor = {
//   id: 1,
//   fullName: "Dr,Mazen",
//   title: "Associate Professor of Computer Science",
//   department: "Department of Computer Science",
//   altemail: "e.reed@university.edu",
//   phonenumber: "+1 (555) 234-5678",
//   office: "Science Building, Room 405",
//   bio: "Dr. Eleanor Reed specializes in artificial intelligence, machine learning, and ethical computing. She leads the AI Ethics Lab and has published over 40 peer-reviewed papers. Her work focuses on fairness in algorithmic decision-making.",
//   skills: [
//     "Artificial Intelligence",
//     "Machine Learning",
//     "Ethics in AI",
//     "Natural Language Processing",
//     "Human-Computer Interaction",
//   ],
//   publications: [
//     "Reed, E. et al. (2024). Fairness-aware ML Models in Healthcare. *Journal of AI Research*",
//     "Reed, E. (2023). Bias Detection in NLP Systems. *Proceedings of ACL*",
//     "Reed, E., & Kim, T. (2022). Explainable AI for Policy Makers. *AI & Society*",
//   ],
//   officeHours: "Mon & Wed, 2:00 PM – 4:00 PM (or by appointment)",
//   avatarUrl: "https://randomuser.me/api/portraits/women/45.jpg",
// };

export default function Profile() {
  // const {
  //   fullName: name,
  //   title,
  //   department,
  //   altemail: email,
  //   phonenumber: phone,
  //   office,
  //   bio,
  //   skills: researchInterests,
  //   // publications,
  //   officeHours,
  //   avatarUrl,
  // } = professorData;
  const [professor, setProfessor] = useState<Professor>();
  const [loading, setLoading] = useState(true);
  const [AllProjects, setAllProjects] = useState<ProjectInfo[]>([]);

  const [searchParams] = useSearchParams();

  const searchParam = searchParams.get("id");
  const nav = useNavigate();
  // Fetch project data
  useEffect(() => {
    if (searchParam != null) {
      const loadProjects = async () => {
        try {
          const service = ProjectService.getInstance();
          const projects = await service.fetchProjects();

          setAllProjects(projects);
        } catch (error) {
          console.error("Failed to fetch projects:", error);
          setAllProjects([]);
        }
      };
      const fetchProfessor = async () => {
        try {
          let projects = ProfessorsService.getInstance().getProjects();
          if (projects.length === 0) {
            projects = await ProfessorsService.getInstance().fetchProjects();
          }

          // Find the specific project by ID (assuming you have an ID field)
          const foundProfessor = projects.find(
            (p) => p.id === parseInt(searchParam),
          ); // Adjust 'id' to match your project object's ID property
          if (foundProfessor) {
            setProfessor(foundProfessor);
          } else {
            // Handle case where project with ID is not found
            nav("/explore"); // or show an error message
          }
        } catch (error) {
          console.error("Error fetching project:", error);
          nav("/explore"); // or handle error appropriately
        } finally {
          setLoading(false);
        }
      };
      loadProjects();
      fetchProfessor();
    }
  }, [searchParam]);

  if (loading || !professor) {
    return <div>Loading...</div>; // Or a spinner, or nothing while loading
  }
  console.log(professor);
  console.log(AllProjects);
  return (
    <main className="min-h-screen  text-gray-100">
      <BackButton />
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header: Profile Info */}
        <header className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-10">
          {/* Avatar */}
          <div className="shrink-0 flex justify-center">
            <img
              src={professor!.avatarUrl}
              alt={`${professor!.fullName}`}
              className="h-32 w-32 md:h-40 items-center md:w-40 rounded-full object-cover border-2 border-white shadow-lg"
            />
          </div>

          {/* Text Content */}
          <div className="text-center sm:text-left space-y-3 w-full">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
              {professor!.fullName}
            </h1>
            <p className="text-lg md:text-xl text-indigo-300 font-medium">
              {professor!.department}
            </p>
            {/*<p className="text-gray-300">{department}</p>*/}

            {/* Contact Details */}
            <div className="mt-5 space-y-2 text-sm sm:text-base">
              <p className="flex flex-wrap gap-x-2">
                <span className="text-gray-400 min-w-max">Email:</span>
                <a
                  href={`mailto:${professor!.altemail}`}
                  className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors duration-200 truncate"
                >
                  {professor!.altemail}
                </a>
              </p>
              <p className="flex flex-wrap gap-x-2">
                <span className="text-gray-400 min-w-max">Phone:</span>
                <a
                  href={`tel:${professor!.phonenumber.replace(/\s/g, "")}`}
                  className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors duration-200"
                >
                  {professor!.phonenumber}
                </a>
              </p>
              <p className="flex flex-wrap gap-x-2">
                <span className="text-gray-400 min-w-max">Office:</span>
                {/*<span className="text-gray-200">{office}</span>*/}
                <span className="text-gray-200">office</span>
              </p>
              <p className="flex flex-wrap gap-x-2">
                <span className="text-gray-400 min-w-max">Office Hours:</span>
                <span className="text-green-300 font-medium">
                  {/*{officeHours}*/}
                  officeHours
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
            <p className="text-gray-300 leading-relaxed">{professor?.bio}</p>
          </section>

          {/* Research Interests */}
          <section className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold text-indigo-400 border-b border-white/30 pb-2 mb-5 flex items-center justify-center sm:justify-start gap-2">
              🔬 Projects Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {professor?.skills.map((interest) => (
                <TagWrapper
                  key={interest}
                  title={interest}
                  classname="bg-indigo-700! hover:bg-white/20 transition-colors duration-200 cursor-default"
                />
              ))}
            </div>
          </section>

          {/* Publications */}
          <section className="md:col-span-2">
            <h2 className="text-2xl font-bold text-indigo-400 border-b border-white/30 pb-2 mb-5 flex items-center justify-center sm:justify-start gap-2">
              📚 Current Projects
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
                {AllProjects.map((item) => {
                  if (Number.parseInt(item.professorId) === professor.id)
                    return (
                      <ProjectPreviewCard
                        project_info={item}
                        professorName={professor.fullName}
                      />
                    );
                })}
              </div>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
