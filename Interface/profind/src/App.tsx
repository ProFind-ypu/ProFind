import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/home.tsx";
import Signup from "./pages/signup.tsx";
import TopNavBar from "./components/TopNavBar.tsx";
import Login from "./pages/login.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* pages with Navegation bar */}
        <Route element={<WithNavbar />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* pages without Navegation bar */}
        <Route element={<WithoutNavbar />}>
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Signup />} />
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
