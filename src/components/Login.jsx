import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

import BASE_URL from '../utils/constant'

import { useNavigate } from 'react-router-dom'


const Login = () => {


    // "emailId": "ladka15@g.com",
    // "password" : "securepassword15",
    const [emailId,setEmailId] = useState('ladka11@g.com')
    const [password,setPassword] = useState('securepassword11')

    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [loginForm,setLoginForm] = useState(true)
    const [error,setError] = useState('')
    const dispatch = useDispatch()

    const navigate = useNavigate()


    const handleLogin = async () =>{

        try {
            const res = await axios.post(BASE_URL+'/login',{
                emailId,
                password
            },{
                withCredentials:true
            })

            const {data} = res

            dispatch(addUser(data))

            navigate('/')

            // console.log('res',data)
        } catch (error) {
          setError('Auth faild try again')
            console.log(error)
        }

            


    }

    const handleSignUp = async()=>{

      try {
        const res = await axios.post(BASE_URL+'/signup',{
            emailId,
            password,
            firstName,
            lastName
        },{
            withCredentials:true
        })

        const {data : {user}} = res

        // console.log(data)

        dispatch(addUser(user))

        navigate('/profile')

        // console.log('res',data)
    } catch (error) {
      setError('Auth faild try again')
        console.log(error)
    }

    }

  return (
    <div className='flex justify-center my-12 '>
      <div className="card w-96 shadow-sm bg-gray-800">
   
  <div className="card-body">
    <h2 className="card-title  flex justify-center font-bold">{loginForm ? "LOGIN FORM" : "SIGNUP FORM"} </h2>
   
    <div className="card-actions justify-end">
    <input type="text" placeholder="Email" className="input"  onChange={(e)=> setEmailId(e.target.value)} />
    <input type="password" placeholder="Password" className="input" onChange={(e)=> setPassword(e.target.value)} />
      
    </div>

    {!loginForm ? <>  <div className="card-actions justify-end">
    <input type="text" placeholder="FirstName" className="input"  onChange={(e)=> setFirstName(e.target.value)} />
    <input type="text" placeholder="Lastname" className="input" onChange={(e)=> setLastName(e.target.value)} />
      {/* <button className="m-auto my-2.5 btn btn-primary" onClick={handleLogin}>LOGIN</button> */}
    </div></>:null}

    <button className="m-auto my-2.5 btn btn-primary cursor-pointer" onClick={loginForm ? handleLogin : handleSignUp}>{loginForm ? "Login" : "Signup"}</button>

    <p className='text-pink-300 flex justify-center' onClick={()=>setLoginForm(!loginForm)}>{!loginForm ? "Login here !!" : "Signup here" }</p>

     <p className='text-red-600 flex justify-center'>{error.toUpperCase()}</p>
  </div>
</div>

    </div>
  )
}

export default Login
