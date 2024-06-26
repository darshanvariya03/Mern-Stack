import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom';


const Adminroute = () => {

    const [auth,setAuth] = useAuth()
    
    const getUser = async()=>{
        try{
            let all = await fetch(`http://localhost:8000/api/v1/auth/adminAuth`,{
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    Authorization : `Bearer ${auth?.token}`
                }
            })
            let res = await all.json();
        }catch(err){
            console.log(err);
            return false
        }
    }

    useEffect(()=>{
        getUser()
    },[])
   
    return(
        auth?.token && auth?.user?.role=="admin" ? <Outlet/> : <Navigate to={'/'}/>
    )
}

export default Adminroute
