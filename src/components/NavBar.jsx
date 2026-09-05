import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async() => {
    try{
      await axios.post(baseUrl+"logout", {}, {withCredentials : true});
      dispatch(removeUser());
      return navigate("/login");
    } catch(err){
      console.log(err);
    }
  }
  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
        {user && <div className="flex gap-2 item-center">
          <p className="pt-2"><b>Welcome, {user.firstName}</b></p>
          <div className="dropdown dropdown-end mx-3">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="user photo"
                  src={user.photo}
                />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>}
      </div>
    </>
  );
};

export default NavBar;
