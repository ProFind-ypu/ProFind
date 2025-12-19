// import { useState, useEffect } from "react";

// type Role = "student" | "professor";
// type ProposalStatus =
//   | "draft"
//   | "sent"
//   | "under_review"
//   | "revised"
//   | "approved";

// interface Proposal {
//   id: string;
//   title: string;
//   studentName: string;
//   status: ProposalStatus;
//   lastUpdated: string;
//   messages?: number;
// }

// export default function Dashboard() {
//   const [user] = useState<{ name: string; role: Role; department: string }>({
//     name: "AG",
//     role: "student", // Can be dynamically set on login
//     department: "Computer Science",
//   });

//   const [proposals, setProposals] = useState<Proposal[]>([
//     {
//       id: "1",
//       title: "AI-Based Tutoring System",
//       studentName: "AG",
//       status: "under_review",
//       lastUpdated: "2025-12-04",
//       messages: 2,
//     },
//   ]);

//   const [notifications, setNotifications] = useState([
//     "Prof. Lee reviewed your proposal.",
//     "New matching suggestion available.",
//   ]);

//   useEffect(() => {
//     document.title = "Project Match Dashboard";
//   }, []);

//   const getStatusColor = (status: ProposalStatus) => {
//     switch (status) {
//       case "draft":
//         return "bg-gray-300";
//       case "sent":
//         return "bg-blue-300";
//       case "under_review":
//         return "bg-yellow-300";
//       case "revised":
//         return "bg-purple-300";
//       case "approved":
//         return "bg-green-300";
//       default:
//         return "bg-gray-300";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm px-6 py-4">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-800">ProjectMatch</h1>
//           <div className="text-right">
//             <p className="font-medium">{user.name}</p>
//             <p className="text-sm text-gray-500 capitalize">
//               {user.role} • {user.department}
//             </p>
//           </div>
//         </div>
//       </header>

//       <div className="flex">
//         {/* Sidebar */}
//         <nav className="w-64 bg-white min-h-screen p-4 shadow-sm">
//           <ul className="space-y-2">
//             <li>
//               <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
//                 Dashboard
//               </button>
//             </li>
//             <li>
//               <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
//                 My Proposals
//               </button>
//             </li>
//             {user.role === "professor" && (
//               <li>
//                 <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
//                   Review Queue
//                 </button>
//               </li>
//             )}
//             <li>
//               <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
//                 Matches
//               </button>
//             </li>
//             <li>
//               <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded">
//                 Profile
//               </button>
//             </li>
//           </ul>
//         </nav>

//         {/* Main Content */}
//         <main className="flex-1 p-6">
//           {/* Quick Actions */}
//           <section className="mb-8">
//             <div className="flex flex-wrap gap-4">
//               <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700">
//                 + Send New Proposal
//               </button>
//               <button className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50">
//                 Search Matches
//               </button>
//             </div>
//           </section>

//           {/* Notifications */}
//           <section className="bg-white p-4 rounded-lg shadow mb-6">
//             <h2 className="font-semibold mb-2">Notifications</h2>
//             <ul className="text-sm text-gray-700 space-y-1">
//               {notifications.map((n, i) => (
//                 <li
//                   key={i}
//                   className="py-1 border-b border-gray-100 last:border-0"
//                 >
//                   {n}
//                 </li>
//               ))}
//             </ul>
//           </section>

//           {/* Proposal List */}
//           <section>
//             <h2 className="text-xl font-semibold mb-4">
//               {user.role === "student"
//                 ? "Your Proposals"
//                 : "Proposals to Review"}
//             </h2>
//             <div className="space-y-4">
//               {proposals.map((proposal) => (
//                 <div
//                   key={proposal.id}
//                   className="bg-white p-5 rounded-lg shadow-sm border"
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="font-medium text-gray-900">
//                         {proposal.title}
//                       </h3>
//                       <p className="text-sm text-gray-500">
//                         by {proposal.studentName}
//                       </p>
//                     </div>
//                     <span
//                       className={`h-3 w-3 rounded-full ${getStatusColor(proposal.status)}`}
//                     ></span>
//                   </div>
//                   <div className="mt-3 flex justify-between text-sm text-gray-500">
//                     <span>Updated: {proposal.lastUpdated}</span>
//                     {proposal.messages ? (
//                       <span className="text-blue-600">
//                         {proposal.messages} new messages
//                       </span>
//                     ) : null}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }
// Dashboard.tsx
import { useState, useEffect } from "react";
import { HiPlus } from "react-icons/hi2";
import { Link, Navigate } from "react-router-dom";
// import { MOCK_Professor_USER } from "../testing/constants";
import { UseAuth } from "../Auth/AuthContext";

type ProposalStatus =
  | "draft"
  | "sent"
  | "under-review"
  | "revised"
  | "approved";
// type UserRole = "student" | "professor";

interface Proposal {
  id: string;
  title: string;
  studentName: string;
  lastUpdate: string;
  status: ProposalStatus;
}

export default function Dashboard() {
  // const user = MOCK_Professor_USER;
  const { user } = UseAuth();
  //console.log(user);

  const [proposals] = useState<Proposal[]>([
    {
      id: "1",
      title: "AI-Based Mental Health Chatbot",
      studentName: "Ali Gh",
      lastUpdate: "2 hours ago",
      status: "under-review",
    },
  ]);
  if (user == null) {
    Navigate({ to: "/login" });
  }

  useEffect(() => {
    // Simulate fetching user role and proposals
    const fetchUserData = () => {
      // In real app: await API call
      // setUserRole("professor");
    };
    fetchUserData();
  }, []);

  const getStatusColor = (status: ProposalStatus) => {
    switch (status) {
      case "draft":
        return "bg-gray-500";
      case "sent":
        return "bg-blue-500";
      case "under-review":
        return "bg-yellow-500";
      case "revised":
        return "bg-purple-500";
      case "approved":
        return "bg-green-500";
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-row justify-center">
      {/* Sidebar */}
      <aside className="w-[20%] hidden sm:block bg-black/15 p-5 pr-11  sm:fixed h-full overflow-y-auto top-0 left-0">
        <h1 className="text-xl font-bold mb-5 pt-5 pl-2">Dashboard</h1>
        <nav className="space-y-4 w-full">
          <Link
            to="/explore"
            className="block p-2 pl-3 rounded hover:bg-gray-700 transition"
          >
            Discover
          </Link>
          <a
            href="#"
            className="block p-2 pl-3 rounded hover:bg-gray-700 transition"
          >
            My Proposals
          </a>
          <a
            href="#"
            className="block p-2 pl-3 rounded hover:bg-gray-700 transition"
          >
            Messages
          </a>
          <a
            href="#"
            className="block p-2 pl-3 rounded hover:bg-gray-700 transition"
          >
            Profile Stetings
          </a>
        </nav>
      </aside>
      <div className="sm:hidden fixed bottom-[10%] ">
        <Link to={user?.roles === "student" ? "/ApplicationForm" : "/"}>
          <button className="px-4 py-2 flex flex-row items-center gap-2  shadow-sm  shadow-indigo-500  bg-indigo-600 rounded hover:bg-indigo-700 transition">
            {user?.roles === "student" ? "New Proposal" : "Review Queue (3)"}
            <HiPlus />
          </button>
        </Link>
      </div>
      {/* Main Content */}
      <main className="flex-1 p-6 space-y-8 sm:ml-[20%]">
        {/* Header */}
        <header className=" flex pl-1 justify-between items-center ">
          <h2 className="text-lg sm:text-2xl font-semibold">
            Welcome
            {user?.roles === "PROFESSOR"
              ? " Dr. " + user?.fullname
              : user?.fullname}
          </h2>
          <Link to={user?.roles === "student" ? "/ApplicationForm" : "/"}>
            <button className="px-4 py-2 hidden sm:block bg-indigo-600 rounded hover:bg-indigo-700 transition">
              {user?.roles === "student" ? "New Proposal" : "Review Queue (3)"}
            </button>
          </Link>
        </header>
        {/* Notifications Panel */}
        <section id="Container">
          <h3 className="text-lg font-medium mb-4">Notifications</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>New feedback on "AI Chatbot" project.</li>
            <li>Dr. Smith reviewed your proposal.</li>
          </ul>
        </section>

        {/* Project Feed / Match Board */}
        <section id="Container">
          <h3 className="text-lg font-medium mb-4 ">
            {user?.roles === "student"
              ? "Your Proposals"
              : "Proposals to Review"}
          </h3>
          <div className="space-y-4">
            {proposals.map((proposal) => (
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
                  {user?.roles === "professor" && `By: ${proposal.studentName}`}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {proposal.lastUpdate}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
