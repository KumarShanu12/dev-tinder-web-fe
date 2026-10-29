import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "../utils/constant";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {

    

    const dispatch = useDispatch()


  const [firstName, setFirstName] = useState(user?.firstName);
 


const updateHanlder = async() =>{

    try {

      const {data:{data}} =   await axios.patch(BASE_URL+'/profile/edit',{
            firstName
        },{
            withCredentials:true
        })

        // console.log(data)

        dispatch(addUser(data))
        
    } catch (error) {

        console.log(error)
        
    }

    

}

  return (
    <div>
      <div className="flex justify-center my-12 ">
        <div className="card w-96 shadow-sm bg-gray-800">
          <div className="card-body">
            <h2 className="card-title  flex justify-center font-bold">
              EDIT PROFILE
            </h2>

            <div className="card-actions justify-end">
              <input
                type="text"
                placeholder="First Name"
                className="input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
               
              <button
                className="m-auto my-2.5 btn btn-primary"

                onClick={updateHanlder}
                 
              >
                UPDATE
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
