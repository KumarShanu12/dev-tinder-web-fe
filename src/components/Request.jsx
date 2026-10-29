import React, { useEffect } from "react";
import BASE_URL from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { removeRequest, request } from "../utils/requestSlice";
import axios from "axios";

const Request = () => {
  const requestt = useSelector((store) => store.request);
  const dispatch = useDispatch();



  const fetchRequest = async () => {
    
    try {
      let {data:{data}} = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });

    //   console.log('data',res)

      dispatch(request(data));
    } catch (error) {
        console.log(error)
    }

    // console.log('ads')

    // console.log('->here',res)
  };


  const requestAction = async (status,_id) =>{
    try {


        const res = await axios.post(BASE_URL+'/request/review/'+status+'/'+_id ,{},{
            withCredentials:true
        })



        dispatch(removeRequest(_id))

        
    } catch (error) {
        
        console.log(error)
    }
  }



  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requestt) return;

  if (requestt.length === 0) return <div className='border-2 h-auto my-6 flex justify-center' ><h1>NO  any Request</h1></div> 

  return (
    <div>
      <div className="flex justify-center my-7">
        {requestt?.map((val, index) => {
          return (
            <div key={val?._id}>
              <div
                key={index}
                className="card border-2 bg-blue-100 w-96 shadow-sm"
              >
                <h1 className="flex justify-center">REQUEST</h1>
                <figure>
                  <img src={val?.photoUrl} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{val?.fromUserId?.firstName}</h2>
                  <h2 className="card-title">{val?.fromUserId?.lastName}</h2>
                </div>

                <div className="flex justify-center gap-1.5 mb-8.5">
                  <button
                    className="btn btn-primary"
                    onClick={() => requestAction("accepted", val?._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => requestAction("rejected", val?._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Request;
