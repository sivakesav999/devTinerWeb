import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { useState } from "react";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(baseUrl + "logout", {}, { withCredentials: true });

      dispatch(removeUser());
      setIsOpen(false);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="navbar bg-black/30 backdrop-blur-md border-b border-white/10 shadow-lg px-2 sm:px-4">
        {/* Logo */}
        <div className="flex-1 min-w-0">
          <Link
            to="/feed"
            className="btn btn-ghost text-lg sm:text-xl px-2 sm:px-4 text-white hover:text-cyan-300"
          >
            DevTinder
          </Link>
        </div>

        {user && (
          <div className="flex items-center shrink-0">
            {/* Welcome Text */}
            <p className="mr-2 sm:mr-4 text-white text-xs sm:text-sm md:text-base max-w-24 sm:max-w-40 truncate">
              <b>Welcome, {user.firstName}</b>
            </p>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-5 mr-4">
              <li>
                <Link
                  to="/profile"
                  className="text-white/90 hover:text-cyan-300 transition-colors duration-200"
                >
                  Profile
                  <span className="badge badge-primary badge-xs ml-1">
                    New
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/connections"
                  className="text-white/90 hover:text-cyan-300 transition-colors duration-200"
                >
                  Connections
                </Link>
              </li>

              <li>
                <Link
                  to="/requests"
                  className="text-white/90 hover:text-cyan-300 transition-colors duration-200"
                >
                  Requests
                </Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="text-white/90 hover:text-red-300 transition-colors duration-200"
                >
                  Logout
                </button>
              </li>
            </ul>

            {/* Avatar */}
            <div className="relative">
              <button
                type="button"
                className="btn btn-ghost btn-circle avatar ring-2 ring-cyan-400/40 hover:ring-cyan-300 transition-all duration-200"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <div className="w-8 sm:w-10 rounded-full">
                  <img
                    alt="user photo"
                    src={user.photo}
                  />
                </div>
              </button>

              {/* Mobile Dropdown */}
              {isOpen && (
                <ul className="menu menu-sm md:hidden absolute right-0 top-12 z-50 w-52 max-w-[calc(100vw-1rem)] rounded-box bg-base-100 p-2 shadow-xl border border-white/10">
                  <li>
                    <Link
                      to="/profile"
                      onClick={closeDropdown}
                    >
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/connections"
                      onClick={closeDropdown}
                    >
                      Connections
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/requests"
                      onClick={closeDropdown}
                    >
                      Connection Requests
                    </Link>
                  </li>

                  <li>
                    <button onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
