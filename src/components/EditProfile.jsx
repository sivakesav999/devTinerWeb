import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about);
  const [gender, setGender] = useState(user.gender || "");
  const [photo, setPhoto] = useState(user.photo || "");
  const [toast, showToast] = useState(false);

  const updateProfile = async () => {
    try {
      const res = await axios.patch(
        baseUrl + "profile/edit",
        {
          firstName,
          lastName,
          age,
          about,
          gender,
          photo,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res.data));
      showToast(true);
      setTimeout(() => {
        showToast(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-center mx-10">
        <div className="min-h-screen flex justify-center items-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
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

              <fieldset className="fieldset">
                <label className="label" htmlFor="age">
                  Age
                </label>

                <input
                  type="number"
                  id="age"
                  className="input"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <label className="label" htmlFor="gender">
                  Gender
                </label>

                <input
                  id="gender"
                  className="input"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <label className="label" htmlFor="about">
                  About
                </label>

                <input
                  id="about"
                  className="input"
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
                  className="input"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                />
              </fieldset>

              <div className="card-actions justify-end my-5">
                <button className="btn btn-primary" onClick={updateProfile}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="my-28">
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
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile has been updated now!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
