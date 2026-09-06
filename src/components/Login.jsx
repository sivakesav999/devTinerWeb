import { useState } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/constants";

const Login = () => {
  
  const [emailID, setEmailId] = useState("virat@gmail.com");
  const [password, setPassword] = useState("Virat@1234");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        baseUrl + "login",
        {
          email: emailID,
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(response.data));
      navigate("/feed");
    } catch (error) {
      console.log(error);
      setError(error.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <fieldset className="fieldset">
            <label className="label" htmlFor="emailid">
              Email ID
            </label>

            <input
              type="text"
              id="emailid"
              className="input"
              value={emailID}
              onChange={(e) => setEmailId(e.target.value)}
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
            <button
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;