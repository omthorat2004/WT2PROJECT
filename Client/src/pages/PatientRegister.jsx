import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { storage } from '../firebase';
const PatientRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        gender: '',
        bloodGroup: '',
        medicalHistory: '',
        password: '',
    });
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        setLoading(true);
        try {

            let photoURL = '';
            if (photo) {
                const storageRef = ref(storage, `patient_photos/${photo.name}`);
                await uploadBytes(storageRef, photo);
                photoURL = await getDownloadURL(storageRef);
                console.log('Photo uploaded successfully:', photoURL);
            }

          
            const response = await fetch('http://localhost:3000/patient/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, photoURL }),
            });

            if (!response.ok) {
                throw new Error('Failed to register patient');
            }

            const result = await response.json();
            console.log('Patient registered successfully:', result);

            setLoading(false);
            toast.success('Patient registered successfully');
            const {password,...userData} = formData
            localStorage.setItem('current-user',JSON.stringify({id:result.patientId,...userData}))
            setFormData({
                name: '',
                email: '',
                phone: '',
                address: '',
                gender: '',
                bloodGroup: '',
                medicalHistory: '',
                password: '',
            });
            setPhoto(null);
            localStorage.setItem('isLogin', true);
            localStorage.setItem('userRole','patient')
            navigate('/'); 
        } catch (error) {
            console.error('Error registering patient:', error);
            toast.error('Failed to register patient');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h4>Patient Registration</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
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
                            <label className="form-label">Phone</label>
                            <input
                                type="tel"
                                className="form-control"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Gender</label>
                            <select
                                className="form-select"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Blood Group</label>
                            <input
                                type="text"
                                className="form-control"
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Photo</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Medical History</label>
                            <textarea
                                className="form-control"
                                name="medicalHistory"
                                value={formData.medicalHistory}
                                onChange={handleChange}
                            ></textarea>
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
                        <button type="submit" className="btn btn-primary w-100" disabled={uploading}>
                            {uploading ? 'Registering...' : 'Register'}
                        </button>
                        <Link className="btn btn-primary w-100 mt-4" to='/patient/login'>Already Have an Account?</Link>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PatientRegister;
