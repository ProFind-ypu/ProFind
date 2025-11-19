import { MOCK_projectinfo } from "../testing/constants";
import TagWrapper from "../components/complex/TagWrapper";
import { Link } from "react-router-dom";

export default function ProjectDetailes() {
  const project = MOCK_projectinfo[0];
  const formattedDate = project.creation_time.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-8">
      {/* Project Title & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold">{project.title}</h2>
        <TagWrapper
          title={project.status ? "Open" : "Taken"}
          classname={
            project.status ? "secsess-bg text-sm! " : "error-bg text-sm! "
          }
        />
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
          <p className="text-lg">{project.supervisor}</p>
        </div>
        <div className="w-fit">
          <h3 className="text-sm uppercase tracking-wider text-gray-400">
            Students Needed
          </h3>
          <p className="text-lg text-center">{project.suggestedStudentCount}</p>
        </div>
        <div className="w-fit">
          <h3 className="text-sm uppercase tracking-wider text-gray-400">
            Created On
          </h3>
          <p className="text-lg">{formattedDate}</p>
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
        <Link to={"/ApplicationForm"}>
          <button
            // disabled={!project.status}
            className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200
                ${
                  !project.status
                    ? "bg-gray-600 "
                    : "bg-[#4f3aed] hover:bg-[#6a55ee] active:bg-[#3a29cc]"
                }
              `}
          >
            {!project.status ? "Already Taken" : "Start Application"}
          </button>
        </Link>
      </div>
    </main>
  );
}
