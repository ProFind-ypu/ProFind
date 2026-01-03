// import { MOCK_projectinfo } from "../testing/constants";
import TagWrapper from "../components/complex/TagWrapper";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { useEffect, useState } from "react";
import type { ProjectInfo } from "../class/ProjectInfo";
import ProjectService from "../class/Services/projectService";
import ProfessorsService from "../class/Services/ProfessorsService";
import type { Professor } from "../class/Professor";
import { UseAuth } from "../Auth/AuthContext";

export default function ProjectDetailes() {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get("id");
  const [Professors, setProfessors] = useState<Professor[]>([]);
  const [project, setProject] = useState<ProjectInfo>();
  const [loading, setLoading] = useState(true);
  const { user } = UseAuth();
  //missing id in request
  useEffect(() => {
    if (searchParam == null) {
      nav("/explore");
    }
  }, [searchParam, nav]);

  // Fetch project data
  useEffect(() => {
    if (searchParam != null) {
      const fetchProject = async () => {
        try {
          let projects = ProjectService.getInstance().getProjects();
          if (projects.length === 0) {
            projects = await ProjectService.getInstance().fetchProjects();
          }

          // Find the specific project by ID (assuming you have an ID field)
          const foundProject = projects.find(
            (p) => p.id === parseInt(searchParam),
          ); // Adjust 'id' to match your project object's ID property
          if (foundProject) {
            setProject(foundProject);
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
      const loadProfessors = async () => {
        try {
          const service = ProfessorsService.getInstance();
          const professors = await service.fetchProjects();
          setProfessors(professors);
        } catch (error) {
          console.error("Failed to fetch professors:", error);
          setProfessors([]);
        }
      };
      loadProfessors();

      fetchProject();
    }
  }, [searchParam, nav]);
  if (loading || !project) {
    return <div>Loading...</div>; // Or a spinner, or nothing while loading
  }
  const formattedDate = new Date(project.createdAt!).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );
  console.log(project.status);
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-8">
      {/* Project Title & Status */}
      <div className="flex flex-col  md:flex-row-reverse  md:items-start space-x-5 space-y-10 justify-between mb-6">
        <TagWrapper
          title={project.status == "OPEN" ? "Open" : "Taken"}
          classname={
            project.status == "OPEN"
              ? "secsess-bg text-sm! "
              : "error-bg text-sm! "
          }
        />
        <h2 className="text-3xl font-extrabold">{project.title}</h2>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <h3 className="text-sm  tracking-wider text-gray-400 mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {[...project.tags].map((tag) => (
            <TagWrapper title={tag} classname="text-sm! bg-blue-900! " />
          ))}
        </div>
      </div>

      {/* Supervisor & Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="w-fit">
          <h3 className="text-sm uppercase tracking-wider text-gray-400">
            Supervisor
          </h3>
          <div>
            <p className="text-lg ">
              {Professors.at(Number.parseInt(project.professorId))?.fullName}
            </p>
            <Link
              to={"/profile?id=" + project.professorId}
              className="text-blue-500 text-nowrap"
            >
              [View Profile]
            </Link>
          </div>
        </div>
        <div className="w-fit">
          <h3 className="text-sm uppercase tracking-wider text-gray-400">
            Students Needed
          </h3>
          <p className="text-lg text-center">
            {project.suggestedStudentCount ??
              Math.floor((Math.random() * 10) % 5) + 1}
          </p>
        </div>
        <div className="w-fit">
          <h3 className="text-sm uppercase tracking-wider text-gray-400">
            Created On
          </h3>
          <p>{formattedDate}</p>
          {/*<p className="text-lg">{formattedDate}</p>*/}
        </div>
      </div>

      {/* Description */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
          Project Description
        </h3>
        <p className="text-gray-300 leading-relaxed">{project.description}</p>
      </section>

      {/* Requirements */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
          Requirements
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          {project.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </section>

      {/* Apply Button */}
      <div className="flex justify-center">
        <button
          onClick={() =>
            nav(
              `/ApplicationForm?id=${project.proposalId}&projectId=${project.id}`,
            )
          }
          disabled={project.status != "OPEN" || user?.roles == "PROFESSOR"}
          className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200
                ${
                  project.status == "OPEN" && user?.roles != "PROFESSOR"
                    ? "bg-[#4f3aed] hover:bg-[#6a55ee] active:bg-[#3a29cc]"
                    : "bg-gray-600"
                }
              `}
        >
          {project.status == "OPEN" && user?.roles != "PROFESSOR"
            ? "Start Application"
            : "Already Taken"}
        </button>
      </div>
    </main>
  );
}
