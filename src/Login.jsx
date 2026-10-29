import React, { useState } from 'react'
import axios from 'axios'


const Login = () => {

    const [emailId,setEmailId] = useState('ladka13@g.com')
    const [password,setPassword] = useState('securepassword13')


    const handleLogin = async () =>{

        try {
            const res = await axios.post('http://localhost:7777/login',{
                emailId,
                password
            },{
                withCredentials:true
            })
        } catch (error) {
            console.log(error)
        }

            


    }

  return (
    <div className='flex justify-center my-12 '>
      <div className="card w-96 shadow-sm bg-pink-200">
   
  <div className="card-body">
    <h2 className="card-title flex justify-center">LOGIN FORM </h2>
   
    <div className="card-actions justify-end">
    <input type="text" placeholder="Email" className="input"  onChange={(e)=> setEmailId(e.target.value)} />
    <input type="password" placeholder="Password" className="input" onChange={(e)=> setPassword(e.target.value)} />
      <button className="m-auto my-2.5 btn btn-primary" onClick={handleLogin}>LOGIN</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login
