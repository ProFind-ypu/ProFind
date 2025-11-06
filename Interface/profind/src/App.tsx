import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/home.tsx";
import Signup from "./pages/signup.tsx";
import TopNavBar from "./components/Primary/TopNavBar.tsx";
import Login from "./pages/login.tsx";
import ProjectsListing from "./pages/ProjectListing.tsx";
import Test from "./testing/test.tsx";
import Profile from "./pages/profile.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* pages with Navegation bar */}
        <Route element={<WithNavbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ProjectsListing />} />
          <Route path="/test" element={<Test />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* pages without Navegation bar */}
        <Route element={<WithoutNavbar />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
function WithNavbar() {
  return (
    <>
      <TopNavBar />
      <Outlet /> {/* This renders the child route */}
    </>
  );
}
function WithoutNavbar() {
  return <Outlet />;
}
