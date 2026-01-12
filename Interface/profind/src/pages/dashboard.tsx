import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi2";
import { Link, Navigate } from "react-router-dom";
// import { MOCK_Professor_USER } from "../testing/constants";
import { UseAuth } from "../Auth/AuthContext";
import { getMyProposals } from "../class/Services/_getProposalsFromServer";
import type { Proposal } from "../class/Proposal";

export default function Dashboard() {
  // const user = MOCK_Professor_USER;
  const { user } = UseAuth();
  //console.log(user);

  const [proposals, setProposals] = useState<Proposal[]>([]);

  if (user == null) {
    Navigate({ to: "/login" });
  }
  useEffect(() => {
    const fetchMyProposals = async () => {
      const res = await getMyProposals(user!.token!);
      console.log(res);
      setProposals(res);
    };
    fetchMyProposals();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-500";
      case "PENDING":
        return "bg-yellow-500";
      case "revised":
        return "bg-purple-500";
      case "approved":
        return "bg-green-500";
    }
  };
  console.log(proposals);
  return (
    <div className="min-h-screen text-white flex flex-row justify-center">
      {/* Sidebar */}
      <div className="sm:hidden fixed bottom-[10%] ">
        <Link
          to={user?.roles === "STUDENT" ? "/ApplicationForm" : "/dashboard"}
        >
          <button className="px-4 py-2 flex flex-row items-center gap-2  shadow-sm  shadow-indigo-500  bg-indigo-600 rounded hover:bg-indigo-700 transition">
            {user?.roles === "STUDENT" ? "New Proposal" : "Review Queue (3)"}
            <HiPlus />
          </button>
        </Link>
      </div>
      {/* Main Content */}
      <main className="flex-1 p-6 space-y-8 sm:ml-[20%]">
        {/* Header */}
        <header className=" flex pl-1 justify-between items-center ">
          <h2 className="text-lg sm:text-2xl font-semibold">
            Welcome&nbsp;
            {user?.roles === "PROFESSOR"
              ? " Dr. " + user?.fullname
              : user?.fullname}
          </h2>
          <Link
            hidden={user?.roles === "PROFESSOR"}
            to={user?.roles === "STUDENT" ? "/ApplicationForm?new=true" : "/"}
          >
            <button className="px-4 py-2 hidden sm:block bg-indigo-600 rounded hover:bg-indigo-700 transition">
              "New Proposal"
            </button>
          </Link>
        </header>
        {/* Notifications Panel */}
        {/*<section id="Container">
          <h3 className="text-lg font-medium mb-4">Notifications</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>New feedback on "AI Chatbot" project.</li>
            <li>Dr. Smith reviewed your proposal.</li>
          </ul>
        </section>*/}

        {/* Project Feed / Match Board */}
        <section id="Container">
          <h3 className="text-lg font-medium mb-4 ">
            {user?.roles === "STUDENT"
              ? "Pending Proposals"
              : "Proposals to Review"}
          </h3>
          <div className="flex  flex-col space-y-4">
            {proposals
              .filter((p) => p.status == "PENDING")
              .map((proposal) => (
                <Link
                  to={`/ApplicationForm?id=${proposal.id}&projectId=${proposal.projectId}${user?.roles == "PROFESSOR" ? "&review=true" : ""}`}
                >
                  <div
                    id="subContainer"
                    key={proposal.id}
                    className="p-4 bg-gray-700 rounded hover:bg-gray-600 transition cursor-pointer"
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium">{proposal.title}</h4>
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${getStatusColor(proposal.status)}`}
                        title={proposal.status}
                      ></span>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">
                      {user?.roles === "professor" &&
                        `By: ${proposal.studentId}`}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {proposal.createdAt}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
        <section id="Container">
          <h3 className="text-lg font-medium mb-4 ">
            {user?.roles === "STUDENT"
              ? "Approved Proposals"
              : "Approved Proposals "}
          </h3>
          <div className="flex  flex-col space-y-4">
            {proposals
              .filter((p) => p.status == "approved")
              .map((proposal) => (
                <Link
                  to={`/ApplicationForm?id=${proposal.id}&projectId=${proposal.projectId}${user?.roles == "PROFESSOR" ? "&review=true" : ""}`}
                >
                  <div
                    id="subContainer"
                    key={proposal.id}
                    className="p-4 bg-gray-700 rounded hover:bg-gray-600 transition cursor-pointer"
                  >
                    <div className="flex justify-between">
                      <h4 className="font-medium">{proposal.title}</h4>
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${getStatusColor(proposal.status)}`}
                        title={proposal.status}
                      ></span>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">
                      {user?.roles === "professor" &&
                        `By: ${proposal.studentId}`}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {proposal.createdAt}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
