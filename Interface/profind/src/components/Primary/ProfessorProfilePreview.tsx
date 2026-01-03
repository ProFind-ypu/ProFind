import { type NavigateFunction } from "react-router-dom";
import TagWrapper from "../complex/TagWrapper";
import { HiUserCircle } from "react-icons/hi2";
import type { Professor } from "../../class/Professor";
import { useEffect, useState } from "react";
type ProInfo = { ProInfo: Professor; nav: NavigateFunction };
// a shared navigation instant for better preformance
// type navigationgInstant = { nav: NavigateFunction };
export default function ProfessorProfilePreview({ ProInfo, nav }: ProInfo) {
  // add some delay to stop caching the same url , so hopefully getting new faces images
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      const url = ProInfo.avatarUrl;
      setImageUrl(url + "?random=" + Math.random());
    }, ProInfo.id * 500);
  }, []);
  return (
    // <Link to="/profile">
    <div
      onClick={() => nav("/profile?id=" + ProInfo.id)}
      className=" w-full h-full cursor-pointer flex flex-row hover:scale-[1.1] gap-4 items-center  space-y-2  transition "
    >
      <img
        // src={ProInfo.avatarUrl}
        src={imageUrl}
        className=" max-w-[40%] h-fit rounded-full  object-center shadow-sm"
        onError={(e) => {
          //console.log(e);
          const img = e.target as HTMLImageElement;
          img.style.display = "none"; // Hide the broken image
          const fallback = img.nextElementSibling;
          if (fallback) fallback.setAttribute("style", "display: block;");
        }}
      />
      <HiUserCircle className="hidden min-w-[25%] max-w-[40%]  sm:min-w-[20%] sm:max-w-[40%] h-fit  rounded-full  object-center shadow-sm" />
      <div className="pt-2 pb-2 ">
        <h3 className="font-medium text-lg ">{ProInfo.fullName}</h3>
        <p className="text-sm text-wrap text-gray-500 mb-3">
          {ProInfo.department}
        </p>
        {ProInfo.altemail && (
          <button
            onClick={() =>
              window.open(
                `mailto:${ProInfo.altemail}`,
                "_blank",
                "noopener,noreferrer",
              )
            }
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors block truncate"
          >
            {ProInfo.altemail}
          </button>
        )}
        <div className="flex flex-wrap gap-1 pt-2 ">
          {ProInfo.skills.map((specialty) => (
            <TagWrapper title={specialty} />
          ))}
        </div>
      </div>
    </div>
    // </Link>
  );
}
