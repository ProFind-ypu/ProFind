import * as React from "react";
import { HiArrowLeft } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../../Auth/AuthContext";

export default function AssideBar() {
  const { user } = UseAuth();
  const nav = useNavigate();
  return (
    <aside className="w-[20%] hidden sm:block bg-black/15 p-5 pr-11  sm:fixed h-full overflow-y-auto top-0 left-0">
      {/*<h1 className="text-xl font-bold mb-5 pt-5 pl-2">Dashboard</h1>*/}
      <button className="cursor-pointer" onClick={() => nav("/explore")}>
        <HiArrowLeft size={24} />{" "}
      </button>
      <nav className="space-y-4 w-full">
        <Link
          to="/dashboard"
          className="block p-2 pl-3 rounded hover:bg-gray-700 transition"
        >
          Dashboard
        </Link>
        {user?.roles == "PROFESSOR" ? (
          <Link
            to="/myprojects"
            className="block p-2 pl-3 rounded hover:bg-gray-700 transition"
          >
            My Projects
          </Link>
        ) : (
          ""
        )}
        <Link
          to="/messages"
          className="block p-2 pl-3 rounded bg-green-900 hover:bg-gray-700 transition"
        >
          Messages
        </Link>
        <a
          href="#"
          className="block p-2 pl-3 rounded hover:bg-gray-700 transition"
        >
          Profile Stetings
        </a>
      </nav>
    </aside>
  );
}
