import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/UserContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({ email: "", username: "", token: "" });
    navigate("/login");
  };

  return (
    <nav className="top-3 z-50 bg-white/80 backdrop-blur-md mt-3 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              PlanIT<span className="text-indigo-600">.AI</span>
            </h1>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <span className="text-gray-700 font-medium">
                  {user?.username || user?.email || ""}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 font-medium transition-colors duration-200"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200"
                >
                  Log in
                </button>
                {/* Uncomment if you want a signup button */}
                {/* 
                <button
                  onClick={() => navigate("/register")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 text-sm font-semibold rounded-full shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105"
                >
                  Sign Up Free
                </button> 
                */}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
