import { useNavigate } from "react-router-dom";
import { UseAuth } from "../Auth/AuthContext";
import ProjectService from "../class/Services/projectService";
import { useEffect, useState } from "react";
import type { ProjectInfo } from "../class/ProjectInfo";
import ProjectPreviewCard from "../components/Primary/ProjectPreviewCard";

export default function MyProjects() {
  const { user } = UseAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    if (user == null) {
      nav("/explore");
    }
  }, [user, nav]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        let projects = ProjectService.getInstance().getProjects();
        if (projects.length === 0) {
          projects = await ProjectService.getInstance().fetchProjects();
        }
        const foundProject = projects.filter(
          (p) => Number.parseInt(p.professorId) === user?.id,
        );
        if (foundProject) {
          setProjects(foundProject);
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        nav("/explore");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProject();
    }
  }, [user, nav]);

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <main className="sm:ml-[20%] pt-4 min-h-full flex-1 p-6 space-y-8">
      <header className=" flex pl-1 justify-between items-center ">
        <h2 className="text-lg sm:text-2xl font-semibold">My Projects</h2>
        <button
          onClick={() => nav("/newproject")}
          className="px-4 py-2 hidden sm:block bg-indigo-600 rounded hover:bg-indigo-700 transition"
        >
          New Projects
        </button>
      </header>
      <div className="w-full grid gap-4 pl-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((item) => (
          <ProjectPreviewCard project_info={item} key={item.id} />
        ))}
      </div>
    </main>
  );
}
