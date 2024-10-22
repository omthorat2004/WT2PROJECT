import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const TechnicianLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/technician/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Success
                toast.success('Login successful');
                // Show SweetAlert2 success animation
                Swal.fire({
                    title: 'Welcome!',
                    text: 'Technician logged in successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                const { password, ...userData } = data.userData;
                localStorage.setItem('userData', JSON.stringify(userData));
                localStorage.setItem('isLogin', true);
                localStorage.setItem('userRole', 'technician');

                // Navigate to the home page
                navigate('/');
            } else {
                // Handle error response
                toast.error(data.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            toast.error('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Technician Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-4">Login</button>
            </form>
           
            <ToastContainer />
        </div>
    );
};

export default TechnicianLogin;
