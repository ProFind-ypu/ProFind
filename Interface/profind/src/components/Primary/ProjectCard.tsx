import { Link } from "react-router-dom";
import TagWrapper from "../complex/TagWrapper";
import type { ProjectInfo } from "../../testing/constants";

type Props = { project_info: ProjectInfo };
export default function ProjectCard({ project_info }: Props) {
  return (
    <div
      className="flex flex-col  gap-5 p-5 hover:shadow-black hover:ring bg-banner justify-between rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
      key={project_info.id}
    >
      <div className="flex flex-col gap-5 ">
        <div className="flex flex-row justify-between">
          <h3 className="text-md font-semibold text-indigo-500 ">
            {project_info.title}
          </h3>
          <TagWrapper
            title={project_info.taken ? "Taken" : "Open"}
            classname={project_info.taken ? "error-bg " : "secsess-bg "}
          />
        </div>
        <p id="OverflowText" className=" text-sm mt-1 w-full  ">
          {project_info.description}
        </p>
      </div>
      <div>
        <p className="pb-1 pl-1 text-sm">
          {project_info.supervisor}{" "}
          <Link
            to=""
            className="text-blue-400 cursor-pointer hover:text-green-500"
          >
            [View Profile]
          </Link>
        </p>

        <p className="pl-1 pb-1 text-xs">
          Created at:{" "}
          {project_info.creation_time.toLocaleDateString("en-GB")}{" "}
        </p>
        <div className="w-full flex flex-row gap-2">
          {[...project_info.tags].map((tag) => (
            <TagWrapper title={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
