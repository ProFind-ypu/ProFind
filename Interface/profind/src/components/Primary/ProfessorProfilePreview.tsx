import { Link } from "react-router-dom";
import type { User } from "../../testing/constants";
import TagWrapper from "../complex/TagWrapper";
type ProInfo = { ProInfo: User };
export default function ProfessorProfilePreview({ ProInfo }: ProInfo) {
  return (
    <Link to="/profile">
      <div className=" w-full flex flex-row hover:scale-[1.1] gap-4 items-center  space-y-2  transition ">
        <img
          src={ProInfo.avatarUrl}
          alt={ProInfo.name}
          className=" max-w-[40%] h-fit rounded-full  object-center shadow-sm"
        />
        <div className="pt-2 pb-2 ">
          <h3 className="font-medium text-lg ">{ProInfo.name}</h3>
          <p className="text-sm text-wrap text-gray-500 mb-3">
            department of dephense
          </p>
          {ProInfo.email && (
            <button
              onClick={() =>
                window.open(
                  `mailto:${ProInfo.email}`,
                  "_blank",
                  "noopener,noreferrer",
                )
              }
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors block truncate"
            >
              {ProInfo.email}
            </button>
          )}
          <div className="flex flex-wrap gap-1 ">
            {ProInfo.tags.map((specialty) => (
              <TagWrapper title={specialty} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
