import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, about, photo, gender } = user;
  const dispatch = useDispatch();

  const handleFeed = async (status, _id) => {
    try {
      const feed = await axios.post(
        baseUrl + "request/send/" + status + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {" "}
      <div className="card bg-base-300 w-full max-w-sm sm:max-w-md shadow-sm rounded-3xl overflow-hidden">
        {" "}
        <figure className="w-full h-72 sm:h-80 md:h-96">
          {" "}
          <img
            src={photo}
            alt="photo"
            className="w-full h-full object-cover"
          />{" "}
        </figure>
        <div className="card-body p-4 sm:p-6">
          <h2 className="card-title text-xl sm:text-2xl break-words">
            {firstName + " " + lastName}
          </h2>

          <p>{age && gender && age + ", " + gender}</p>

          <p className="break-words">{about}</p>

          <div className="card-actions flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mt-2">
            <button
              className="btn btn-primary w-full sm:w-auto"
              onClick={() => {
                handleFeed("ignore", _id);
              }}
            >
              Ignore
            </button>

            <button
              className="btn btn-secondary w-full sm:w-auto"
              onClick={() => {
                handleFeed("interested", _id);
              }}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
