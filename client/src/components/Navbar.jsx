import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/UserContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const avatarButtonRef = useRef(null);

  const token = localStorage.getItem("token");
  
  const isLoggedIn = !!token && !!user?.username;

  
  const username = user?.username || "";
  const firstLetter = username ? username.charAt(0).toUpperCase() : "";

  const handleLogout = () => {
    localStorage.removeItem("token");
    
    setUser({ email: "", username: "", token: "" });
    setIsDropdownOpen(false);
    navigate("/login");
  };

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        avatarButtonRef.current &&
        !avatarButtonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") setIsDropdownOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav className="w-full bg-white   pt-5 top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">

          {/* Logo */}
          <div
            className="cursor-pointer"
            onClick={() => navigate("/")}
            role="link"
            aria-label="Go to homepage"
          >
            <h1 className="text-xl font-bold text-gray-900">
              PlanIT<span className="text-indigo-600">.AI</span>
            </h1>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              
              <div className="relative flex items-center gap-3">
                
                <button
                  ref={avatarButtonRef}
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                  onClick={() => setIsDropdownOpen((s) => !s)}
                  className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-sm hover:bg-indigo-700 transition ring-2 ring-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  title={username}
                >
                  {firstLetter || "U"}
                </button>

                
                <button
                  
                  className="text-sm font-medium text-gray-800 hover:text-indigo-600 focus:outline-none"
                >
                  {username}
                </button>

                
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    role="menu"
                    aria-label="User menu"
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/50">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {username}
                      </p>
                    </div>

                    <button
                      role="menuitem"
                      onClick={() => {
                        navigate("/plans");
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      Dashboard
                    </button>

                    <button
                      role="menuitem"
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // -------- LOGGED OUT: BUTTONS --------
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm text-gray-600 hover:text-indigo-600 font-medium transition"
                >
                  Log in
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-full font-medium transition shadow-sm hover:shadow"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
