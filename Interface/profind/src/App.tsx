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

export default function App() {
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
            <Route path="/ApplicationForm" element={<ApplicationForm />} />
          </Route>
          {/* pages without Navegation bar */}
          <Route element={<WithoutNavbar />}>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Email_Verification" element={<EmailVerification />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
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
