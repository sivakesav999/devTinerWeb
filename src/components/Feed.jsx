import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import axios from "axios";
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

  return <div className="flex justify-center my-5">
    {feed.length > 0 && <UserCard user={feed[0]} />}
  </div>;
};

export default Feed;