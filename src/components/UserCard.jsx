import axios from "axios";
import React from "react";
import BASE_URL from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ feed }) => {
  const dispatch = useDispatch();

  const handleSendRequest = async (status, id) => {
    const res = await axios.post(
      BASE_URL + "/request/send/" + status + "/" + id,
      {},
      {
        withCredentials: true,
      }
    );

    dispatch(removeFeed(id));
  };

  
  const { firstName, lastName, photoUrl, _id } = feed;
  return (
    <div className="flex my-6 justify-center">
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img src={photoUrl} alt="user" />
        </figure>
        <div className="card-body">
          {firstName && <h2 className="card-title">{firstName}</h2>}

          <div className="flex justify-center card-actions">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              {" "}
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
