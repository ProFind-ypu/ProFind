import { Link, useNavigate } from "react-router-dom";
import { UseAuth } from "../../Auth/AuthContext";
import DropdownMenu from "../complex/DropdownMenu";
import { HiCog8Tooth, HiUserCircle } from "react-icons/hi2";

const DropMenuOptions = [
  { label: "Your Profile", value: "/profile", icon: HiUserCircle },
  { label: "Settings", value: "time_of_creation", icon: HiCog8Tooth },
];
const TopNavBar = () => {
  const { user } = UseAuth();
  const logedStat: boolean = user != null;
  const navigate = useNavigate();
  return (
    // <nav className=" backdrop-blur-md bg-focus  shadow-md  border-b  sticky top-0 z-50">
    <header className="sticky top-0 bg-default z-20 backdrop-blur-md w-full border-0 border-white/30">
      <div>
        <div className="container mx-auto px-10 sm:px-20 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link
              to="/"
              className="font-bold text-xl sm:font-extrabold sm:text-2xl text-white tracking-wide"
            >
              ProFind
            </Link>
          </div>

          {logedStat ? (
            <div className="outline rounded-lg " hidden={!logedStat}>
              <DropdownMenu
                placeholder={user?.fullname}
                options={DropMenuOptions}
                onSelect={() => {
                  navigate("/dashboard");
                }}
              />
            </div>
          ) : (
            <div className={` flex  gap-2 `} hidden={logedStat}>
              <Link to="/signup">
                <button className="px-3 py-1 border-2  border-indigo-600 bg-transparent hover:border-transparent hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-gray-900 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-indigo-500/25">
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button className="px-3 py-1 border-2 border-transparent bg-indigo-600 hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-gray-900 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-indigo-500/25">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
