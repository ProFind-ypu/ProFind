import { Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";

const TopNavBar = () => {
  return (
    // <nav className=" backdrop-blur-md bg-focus  shadow-md  border-b  sticky top-0 z-50">
    <header className="sticky top-0 bg-black/60 z-20 backdrop-blur-md w-full border-b border-white/30">
      <div>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <span className="font-bold text-xl text-white tracking-wide">
              ProFind
            </span>
          </div>
          {/* Navigation Links */}
          {/* <div className="md:flex space-x-4">

            {['Home', 'browser'].map((item) => (

              <Link
                className="text-gray-300 hover:text-indigo-400 transition-colors duration-200 font-medium text-sm uppercase tracking-wider hover:underline hover:underline-offset-4"
                key={item}
                to="/">
                {item}
              </Link>

            ))}
          </div> */}
          {/* Sign Up Button */}
          <div className=" flex  gap-2 ">
            <Link to="">
              <Button>
                <button className="px-3 py-1 border-2  border-indigo-600 bg-transparent hover:border-transparent hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-gray-900 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-indigo-500/25">
                  Sign Up
                </button>
              </Button>
            </Link>
            <Link to="/login">
              <Button>
                <button className="px-3 py-1 border-2 border-transparent bg-indigo-600 hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 focus:ring-offset-gray-900 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-indigo-500/25">
                  Login
                </button>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
