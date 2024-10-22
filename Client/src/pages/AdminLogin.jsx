import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './AdminLogin.css';

const AdminLogin = () => {
    const navigate = useNavigate()
    const [formData,setFormData] = useState({email:'',password:''})
    const handleChange = (e)=>{
        setFormData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(formData)
    const {email,password} = formData
    if(email=='admin@gmail.com' && password=='pass'){
        Swal.fire({
            title:'Login Successful',
            icon:'success',
        })
        localStorage.setItem('userRole','admin')
        localStorage.setItem('userData',JSON.stringify(formData))
        localStorage.setItem('isLogin',true)
        navigate('/')
    }else{
        Swal.fire({
            title:'Error Login',
            text:'Incorrect Email or Password',
            icon:'error'
        })
    }
  }
  return (
    <div className="login-container">
      <div className="login-card shadow">
        <h2 className="login-title">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" className="form-control" name='email' id="email" onChange={handleChange} placeholder="Enter email" required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name='password' onChange={handleChange} id="password" placeholder="Password" required />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
