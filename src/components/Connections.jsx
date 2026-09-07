import axios from "axios";
import { baseUrl } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

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
    return <h1>No Connections found!</h1>;
  }

  return (
    <div className="my-5">
      <h1 className="text-center font-bold text-2xl mb-5">Connections</h1>

      <div className="flex flex-col flex-wrap justify-center gap-5 mx-5">
        {myConnections.map((connection) => {
          const { firstName, lastName, photo, age, gender, about } = connection;

          return (
            <div
              key={connection._id}
              className="card card-side bg-base-300 shadow-sm w-full max-w-full min-h-48 border"
            >
              <figure className="w-40 shrink-0">
                <img
                  src={photo}
                  alt={firstName}
                  className="w-40 h-55 object-cover"
                />
              </figure>

              <div className="card-body">
                <h2 className="card-title">
                  {firstName} {lastName}{" "}
                </h2>
                <p>{about}</p>
                <p>{gender}</p>
                <p>{age}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
