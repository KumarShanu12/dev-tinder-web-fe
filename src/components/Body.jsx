import React from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'

import BASE_URL from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'

import { addUser } from '../utils/userSlice'



const Body = () => {
  const naviage = useNavigate()
  const user = useSelector(store=>store.user)
  const dispatch = useDispatch()
  const fetchUser = async () =>{

    try {
      // console.log('s',user)
    

      if(user) return 
  
      const userFetched = await axios.get(BASE_URL+'/profile/view',{
        withCredentials:true
      });
  
      dispatch(addUser(userFetched.data))

      
    } catch (error) {

      if(error.status===401){
        naviage('/login')
      }

      console.log('Error',error)
      

      
    }

   

    

  }

  React.useEffect(()=>{

    fetchUser()
  },[])

  return (
    <div>
        <NavBar/>

        <Outlet/>

        <Footer/>
      
    </div>
  )
}

export default Body
