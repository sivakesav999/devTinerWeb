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
          password
          
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
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h1 className="flex justify-center font-bold text-2xl">
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
                  className="input"
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
                  className="input"
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
              className="input"
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
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          <p className="text-red-500">{error}</p>

          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoggedIn ? handleLogin : handleSignUp}>
              {isLoggedIn === true ? <>Login</> : <>Sign Up</>}
            </button>
          </div>
          <p
            className="m-auto my-3 cursor-pointer"
            onClick={() => setIsLoggedIn((value) => !value)}
          >
            {isLoggedIn
              ? "New User? Signup Here"
              : "Existing User ? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
