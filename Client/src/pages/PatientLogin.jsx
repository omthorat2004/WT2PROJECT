import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const PatientLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3000/patient/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                
                Swal.fire({
                    title: 'Error!',
                    text: data.error || 'An error occurred!',
                    icon: 'error',
                    confirmButtonText: 'Okay',
                });
            } else {
                
                localStorage.setItem('current-user', JSON.stringify(data.userData));
                localStorage.setItem('isLogin',true)
                localStorage.setItem('userRole','patient')
                setTimeout(()=>{
                    navigate('/'); 
                setLoading(false);

                },2000)
                toast.success('Login successful!');
            }
        } catch (error) {

            toast.error('Network error. Please try again.');
        } finally {
           
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center">
                    <h4>Patient Login</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {loading ? <BeatLoader size={8} color="#fff" /> : 'Login'}
                        </button>
                    </form>
                </div>
                <div className="card-footer text-center">
                    <p>
                        Don't have an account? <Link to="/patient/register">Register here</Link>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PatientLogin;
