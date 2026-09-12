import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const myConnections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(baseUrl + "connections", {
        withCredentials: true,
      });

      console.log(res.data.data);
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!myConnections) return;

  if (myConnections.length === 0) {
    return (
      <h1 className="text-center my-10 sm:my-20 px-4">
        You have no connections!
      </h1>
    );
  }

  return (
    <div className="my-5 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center font-bold text-xl sm:text-2xl mb-5">
        Connections
      </h1>

      <div className="flex flex-col justify-center gap-4 sm:gap-5 w-full max-w-4xl mx-auto">
        {myConnections.map((connection) => {
          const { firstName, lastName, photo, age, gender, about } = connection;

          return (
            <div
              key={connection._id}
              className="card card-side flex-col sm:flex-row bg-base-300 shadow-sm w-full min-h-0 sm:min-h-48 border overflow-hidden"
            >
              <figure className="w-full h-64 sm:w-40 sm:h-48 shrink-0">
                <img
                  src={photo}
                  alt={firstName}
                  className="w-full h-full object-cover"
                />
              </figure>

              <div className="card-body p-4 sm:p-5 min-w-0">
                <h2 className="card-title text-lg sm:text-xl break-words">
                  {firstName} {lastName}
                </h2>

                <p className="break-words">{about}</p>
                <p>{gender}</p>
                <p>{age}</p>
              </div>

              <div className="flex items-center justify-center p-4 sm:pr-5">
                <Link to={"/chat/" + connection._id}>
                  <button className="btn btn-outline btn-primary">Chat</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
