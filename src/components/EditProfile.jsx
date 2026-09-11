import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photo, setPhoto] = useState(user.photo || "");
  const [toast, showToast] = useState(false);
  const [error, setError] = useState("");

  const updateProfile = async () => {
    try {
      const res = await axios.patch(
        baseUrl + "profile/edit",
        {
          firstName,
          lastName,
          age: age === "" ? undefined : Number(age),
          about,
          gender,
          photo,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res.data.Data));
      setError("");
      showToast(true);
      setTimeout(() => {
        showToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data || "Unable to update profile");
    }
  };

  return (
    <>
      {" "}
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 lg:gap-12 px-4 sm:px-6 lg:px-8 py-6">
        {" "}
        <div className="min-h-0 lg:min-h-screen flex justify-center items-center w-full lg:w-auto">
          {" "}
          <div className="card bg-base-300 w-full max-w-md shadow-sm">
            {" "}
            <div className="card-body p-4 sm:p-6">
              {" "}
              <fieldset className="fieldset">
                {" "}
                <label className="label" htmlFor="firstName">
                  First Name{" "}
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
              <fieldset className="fieldset">
                <label className="label" htmlFor="age">
                  Age
                </label>

                <input
                  type="number"
                  id="age"
                  className="input w-full"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <label className="label" htmlFor="gender">
                  Gender
                </label>

                <select
                  id="gender"
                  className="select w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </fieldset>
              <fieldset className="fieldset">
                <label className="label" htmlFor="about">
                  About
                </label>

                <input
                  id="about"
                  className="input w-full"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <label className="label" htmlFor="photo">
                  Photo
                </label>

                <input
                  id="photo"
                  className="input w-full"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                />
              </fieldset>
              {error && <p className="text-red-500 break-words">{error}</p>}
              <div className="card-actions justify-center sm:justify-end my-4 sm:my-5">
                <button
                  className="btn btn-primary w-full sm:w-auto"
                  onClick={updateProfile}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center lg:w-auto lg:my-28">
          <UserCard
            user={{
              firstName,
              lastName,
              age,
              about,
              gender,
              photo,
            }}
          />
        </div>
      </div>
      {toast && (
        <div className="toast toast-top toast-center px-4 w-full">
          <div className="alert alert-success w-full max-w-md">
            <span>Profile has been updated now!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
