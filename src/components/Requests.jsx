import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const myRequests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, id) => {
    try {
      const res = await axios.post(
        baseUrl + "request/review/" + status + "/" + id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.log(err);
    }
  };

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
    return <h1 className="text-center my-10 px-4">No Requests found!</h1>;
  }

  return (
    <div className="my-5 px-4 sm:px-6 lg:px-8">
      {" "}
      <h1 className="text-center font-bold text-xl sm:text-2xl mb-5">
        Connection Requests{" "}
      </h1>
      <div className="flex flex-col justify-center gap-4 sm:gap-5 w-full max-w-5xl mx-auto">
        {myRequests.map((request) => {
          const { firstName, lastName, photo, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={request._id}
              className="card card-side flex-col sm:flex-row bg-base-300 shadow-sm w-full min-h-0 sm:min-h-48 border overflow-hidden"
            >
              <figure className="w-full h-64 sm:w-40 sm:h-48 shrink-0">
                <img
                  src={photo}
                  alt={firstName}
                  className="w-full h-full object-cover"
                />
              </figure>

              <div className="card-body flex flex-col justify-center items-start w-full sm:flex-1 sm:w-auto p-4 sm:p-5 my-0 sm:my-9 text-left min-w-0">
                <h2 className="card-title text-lg sm:text-xl break-words">
                  {firstName} {lastName}
                </h2>

                <p className="break-words">{about}</p>
                <p>{gender}</p>
                <p>{age}</p>
              </div>

              <div className="flex flex-row sm:flex-col lg:flex-row justify-center items-center gap-3 w-full sm:w-40 lg:w-56 px-4 pb-4 sm:pb-0">
                <button
                  className="btn btn-outline btn-secondary w-full sm:w-auto"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Ignore
                </button>

                <button
                  className="btn btn-primary w-full sm:w-auto"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
