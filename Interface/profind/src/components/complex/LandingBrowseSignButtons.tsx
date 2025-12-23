import { Link } from "react-router-dom";

export default function LandingBrowseSignButtons() {
  return (
    <div className=" flex  gap-2  ">
      <Link to="/explore">
        <button className="px-3 py-1 border-2 border-transparent bg-indigo-600 hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-gray-900 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-indigo-500/25">
          Browse Projects
        </button>
      </Link>
      <Link to="/signup">
        <button className="px-3 py-1 border-2 border-indigo-600 bg-transparent hover:border-transparent hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-gray-900 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-indigo-500/25">
          Signup
        </button>
      </Link>
    </div>
  );
}
