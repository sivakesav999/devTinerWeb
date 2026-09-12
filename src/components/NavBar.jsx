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
      {" "}
      <div className="navbar bg-base-200 shadow-sm px-2 sm:px-4">
        {" "}
        <div className="flex-1 min-w-0">
          {" "}
          <Link
            to="/feed"
            className="btn btn-ghost text-lg sm:text-xl px-2 sm:px-4"
          >
            DevTinder{" "}
          </Link>{" "}
        </div>
        {user && (
          <div className="flex gap-1 sm:gap-2 items-center shrink-0">
            <p className="hidden sm:block pt-2 max-w-40 md:max-w-none truncate">
              <b>Welcome, {user.firstName}</b>
            </p>

            {/* Dropdown */}
            <div className="relative ml-1 sm:mx-3">
              {/* Avatar Button */}
              <button
                type="button"
                className="btn btn-ghost btn-circle avatar"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <div className="w-9 sm:w-10 rounded-full">
                  <img alt="user photo" src={user.photo} />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <ul className="menu menu-sm absolute right-0 top-14 z-50 w-52 max-w-[calc(100vw-1rem)] rounded-box bg-base-100 p-2 shadow">
                  <li>
                    <Link to="/profile" onClick={closeDropdown}>
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/connections" onClick={closeDropdown}>
                      Connections
                    </Link>
                  </li>

                  <li>
                    <Link to="/requests" onClick={closeDropdown}>
                      Connection Requests
                    </Link>
                  </li>

                  <li>
                    <button onClick={handleLogout}>Logout</button>
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
