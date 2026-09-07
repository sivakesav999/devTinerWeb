import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const myRequests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const getRequests = async () => {
    try {
      const res = await axios.get(baseUrl + "requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getRequests();
  }, []);

  console.log(myRequests);
  if (!myRequests) return;

  if (myRequests.length === 0) {
    return <h1>No Requests found!</h1>;
  }

  return (
    <div className="my-5">
      <h1 className="text-center font-bold text-2xl mb-5">
        Connection Requests
      </h1>

      <div className="flex flex-col flex-wrap justify-center gap-5 mx-5">
        {myRequests.map((request) => {
          const { firstName, lastName, photo, age, gender, about } =
            request.fromUserId;

          console.log(request.fromUserId);

          return (
            <div
              key={request._id}
              className="card card-side bg-base-300 shadow-sm w-full max-w-full min-h-48 border h-48 border-rounded"
            >
              <figure className="w-40 shrink-0">
                <img
                  src={photo}
                  alt={firstName}
                  className="w-70 h-50 object-cover"
                />
              </figure>

              <div className="card-body flex flex-col justify-center items-start w-2/3 my-9 text-left">
                <h2 className="card-title">
                  {firstName} {lastName}
                </h2>

                <p>{about}</p>
                <p>{gender}</p>
                <p>{age}</p>
              </div>

              <div className="flex justify-center items-center gap-3 w-56 px-4">
                <button className="btn btn-outline btn-secondary">
                  Ignore
                </button>
                <button className="btn btn-primary">Accept</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
