import axios from "axios";
import { baseUrl } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed.length > 0) {
      return;
    }

    try {
      const res = await axios.get(baseUrl + "feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log("API error:", err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length <= 0)
    return <h1 className="text-center my-10 px-4">No New Users Found!</h1>;

  return (
    <div className="flex justify-center my-5 px-4 sm:px-6">
      {feed.length > 0 && <UserCard user={feed[0]} />}{" "}
    </div>
  );
};

export default Feed;
