import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, about, photo, gender } = user;
  const dispatch = useDispatch();
  const handleFeed = async (status, _id) => {
    try {
      const feed = await axios.post(baseUrl + "request/send/" + status + _id, {}, {withCredentials:true});
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="card bg-base-300 w-96 shadow-sm rounded-3xl overflow-hidden">
        <figure>
          <img src={photo} alt="photo" />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>

          <p>{age && gender && age + ", " + gender}</p>

          <p>{about}</p>

          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={()=>{handleFeed("ignore", _id)}}>Ignore</button>
            <button className="btn btn-secondary" onClick={()=>{handleFeed("interested", _id)}}>Interested</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
