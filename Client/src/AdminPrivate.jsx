import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminPrivate = () => {
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(()=>{
        const role = localStorage.getItem('userRole')
        const admin =JSON.parse(localStorage.getItem('userData'))
        const isLoggedIn = localStorage.getItem('isLogin')
        if(role=='admin'&&isLoggedIn){
            setLoading(false)
        }else{
            navigate('/admin/login')
        }
    },[])
    if(loading){
        return <div>Loading...</div>
    }
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default AdminPrivate
