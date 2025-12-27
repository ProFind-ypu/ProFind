import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/home.tsx";
import Signup from "./pages/signup.tsx";
import TopNavBar from "./components/Primary/TopNavBar.tsx";
import Login from "./pages/login.tsx";
import ProjectsListing from "./pages/ProjectListing.tsx";
import Profile from "./pages/profile.tsx";
import ProjectDetailes from "./pages/projectInfo.tsx";
import Footer from "./components/decorator/Footer.tsx";
import ApplicationForm from "./pages/applecationForm.tsx";
import EmailVerification from "./pages/emailVerification .tsx";
import { AuthProvider } from "./Auth/AuthContext.tsx";
import Dashboard from "./pages/dashboard.tsx";
import ProfessorsList from "./pages/ProfessorsListing.tsx";
import axios from "axios";
import Logout from "./pages/logout.tsx";
import MyProjects from "./pages/myprojects.tsx";
import AssideBar from "./components/Primary/AssideBar.tsx";
import NewProject from "./pages/newProject.tsx";

export default function App() {
  // Log all outgoing requests
  axios.interceptors.request.use(
    (config) => {
      console.log("🚀 Axios Request:", {
        url: config.url,
        method: config.method?.toUpperCase(),
        headers: config.headers,
        data: config.data,
        withCredentials: config.withCredentials,
      });
      return config;
    },
    (error) => {
      console.error("❌ Axios Request Error:", error);
      return Promise.reject(error);
    },
  );

  // Optional: Log responses too
  axios.interceptors.response.use(
    (response) => {
      console.log("✅ Axios Response:", {
        status: response.status,
        data: response.data,
        headers: response.headers,
      });
      return response;
    },
    (error) => {
      console.error("❌ Axios Response Error:", error);
      return Promise.reject(error);
    },
  );
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* pages with Navegation bar */}
          <Route element={<WithNavbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<ProjectsListing />} />
            <Route path="/professors" element={<ProfessorsList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/projectDetailes" element={<ProjectDetailes />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/ApplicationForm" element={<ApplicationForm />} />
          </Route>
          {/* pages without Navegation bar */}
          <Route element={<WithAssideBar />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/myprojects" element={<MyProjects />} />
            <Route path="/newproject" element={<NewProject />} />
          </Route>
          <Route element={<WithoutNavbar />}>
            <Route path="/login" element={<Login />} />
            <Route path="/Email_Verification" element={<EmailVerification />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
function WithAssideBar() {
  return (
    <>
      <AssideBar />
      <Outlet />
      <Footer />
    </>
  );
}
function WithNavbar() {
  return (
    <>
      <TopNavBar />
      <Outlet /> {/* This renders the child route */}
      <Footer />
    </>
  );
}
function WithoutNavbar() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
