import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        baseUrl + "login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(response.data));
      return navigate("/feed");
    } catch (error) {
      setError(error.response?.data);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        baseUrl + "signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(response.data));
      return navigate("/profile");
    } catch (error) {
      setError(error.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-8 sm:px-6">
      <div className="card bg-transparent w-full max-w-md shadow-xl">
        <div className="card-body p-4 sm:p-6">
          <h1 className="flex justify-center font-bold text-xl sm:text-2xl">
            {isLoggedIn == true ? <>Login</> : <>Signup</>}
          </h1>

          {!isLoggedIn && (
            <>
              <fieldset className="fieldset">
                <label className="label" htmlFor="firstName">
                  First Name
                </label>

                <input
                  type="text"
                  id="firstName"
                  className="input w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <label className="label" htmlFor="lastName">
                  Last Name
                </label>

                <input
                  type="text"
                  id="lastName"
                  className="input w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </>
          )}
          <fieldset className="fieldset">
            <label className="label" htmlFor="email">
              Email ID
            </label>

            <input
              type="text"
              id="email"
              className="input w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label" htmlFor="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              className="input w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <p className="text-red-500 break-words">{error}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary w-full sm:w-auto"
              onClick={isLoggedIn ? handleLogin : handleSignUp}
            >
              {isLoggedIn === true ? <>Login</> : <>Sign Up</>}
            </button>
          </div>
          <p
            className="m-auto my-3 cursor-pointer text-center text-sm sm:text-base"
            onClick={() => setIsLoggedIn((value) => !value)}
          >
            {isLoggedIn ? (
  <>
    New User?{" "}
    <span className="underline text-cyan-300 font-semibold cursor-pointer hover:text-cyan-200">
      Signup Here
    </span>
  </>
) : (
  <>
    Existing User?{" "}
    <span className="underline text-cyan-300 font-semibold cursor-pointer hover:text-cyan-200">
      Login Here
    </span>
  </>
)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
