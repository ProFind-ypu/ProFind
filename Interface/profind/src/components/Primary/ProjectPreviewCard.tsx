import { Link, useNavigate } from "react-router-dom";
import TagWrapper from "../complex/TagWrapper";
import type { ProjectInfo } from "../../class/ProjectInfo";
import { HiTrash } from "react-icons/hi2";
import { deleteProject } from "../../class/Services/_deleteProject";
type Props = {
  project_info: ProjectInfo;
  professorName: string;
  removeIcon: boolean;
};
export default function ProjectPreviewCard({
  project_info,
  removeIcon = false,
  professorName,
}: Props) {
  const nav = useNavigate();
  return (
    <div
      className="flex flex-col  gap-5 p-5 hover:shadow-black hover:ring bg-banner justify-between rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
      key={project_info.id}
      onClick={() => {
        nav("/projectDetailes?id=" + project_info.id);
      }}
    >
      <div className="flex flex-col gap-5 ">
        <div className="flex flex-row justify-between">
          <h3 className="text-md font-semibold text-indigo-500 ">
            {project_info.title}
          </h3>
          <TagWrapper
            title={
              project_info.status.charAt(0).toUpperCase() +
              project_info.status.slice(1).toLowerCase()
            }
            classname={
              project_info.status == "OPEN" ? "secsess-bg " : "error-bg "
            }
          />
        </div>
        <p id="OverflowText" className=" text-sm mt-1 w-full  ">
          {project_info.shortDescription}
        </p>
      </div>
      <div>
        <p className="pb-1 pl-1 text-sm">
          {professorName}{" "}
          <Link
            to={"/profile?id=" + project_info.professorId}
            className="text-blue-400 cursor-pointer hover:text-green-500"
            onClick={(e) => e.stopPropagation()}
          >
            [View Profile]
          </Link>
        </p>

        <p className="pl-1 pb-1 text-xs">
          Created at:{" "}
          {new Date(project_info.createdAt.toString()).toLocaleDateString(
            "en-GB",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            },
          )}
        </p>
        <div className="w-full flex flex-wrap gap-2">
          {[...project_info.tags].map((tag) => (
            <TagWrapper title={tag} />
          ))}
          {removeIcon && (
            <HiTrash
              color="#e7000b"
              size={26}
              className="hover:scale-140 transition-transform duration-300"
              onClick={(e) => {
                e.stopPropagation();
                deleteProject(project_info.id);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
