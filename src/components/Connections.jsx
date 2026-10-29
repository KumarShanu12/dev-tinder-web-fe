import axios from 'axios'
import React, { useEffect } from 'react'
import BASE_URL from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'

import { addConnections } from '../utils/connectionSlice'

const Connections = () => {


    const connection = useSelector(store=>store.connections)

    const dispatch = useDispatch()


    const fetchConnections = async () =>{


        try {

            let {data:{data}} = await axios.get(BASE_URL+'/user/connection',{
                withCredentials:true
            });
    
            dispatch(addConnections(data))
            
        } catch (error) {
            
        }

       

        // console.log('ads')
       


        // console.log('->here',res)
    }

    useEffect(()=>{

        fetchConnections()

    },[])

    if(!connection) return

    if(connection?.length===0) return <div className='my-6 flex justify-center'><h1>NO ANY CONNECTION</h1></div> 

    // console.log('->>>>',connection)



  return (

    
    <div className='m-auto my-7'>

        {connection?.map((val,index)=>{
            return (
              <div className='my-6' key={val?._id}>
                <div className="card border-2 bg-amber-100 w-96 shadow-sm"
                >
                  <figure>
                    <img src={val?.photoUrl} alt="Shoes" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{val?.firstName}</h2>
                    <h2 className="card-title">{val?.lastName}</h2>
                  </div>
                  <div className="flex justify-center gap-1.5 mb-8.5">

                <button className="btn btn-primary">Ignore</button>
                <button className="btn btn-secondary">Interested</button>
                </div>
                </div>
              </div>
            );
        })}

     


    </div>
  )
}

export default Connections
