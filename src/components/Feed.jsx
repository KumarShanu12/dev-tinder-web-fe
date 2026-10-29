import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../utils/constant";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);

  //  

  const dispatch = useDispatch();

  const getFeed = async () => {
    if(feed) return
    try {
      const res = await axios.get(BASE_URL + "/feed?limit=20", {
        withCredentials: true,
      });

      const {
        data: { data },
      } = res;

      dispatch(addFeed(data));
      // console.log('response',data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    getFeed();
  }, []);

  if(!feed) return 

  if(feed?.length===0) return <div className="flex justify-center"><h1>No More Feed !!</h1></div>

  return (
    <div>

      {feed &&  <UserCard feed={feed[0]} />}
      
     
    </div>
  );
};

export default Feed;
