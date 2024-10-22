import React, { useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const TechnicianRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        qualification: '',
        specialization: '',
        hireDate: '',
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
            const response = await fetch('http://localhost:3000/technician/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
                Swal.fire({
                    title: 'Success!',
                    text: 'Technician registered successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                const { password, ...userData } = formData;
                localStorage.setItem('userData', JSON.stringify({ technician_id: data.technicianId, userData }));
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    qualification: '',
                    specialization: '',
                    hireDate: '',
                    password: ''
                });
                localStorage.setItem('isLogin', true);
                localStorage.setItem('userRole', 'technician');

                navigate('/');
            } else {
                toast.error(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            toast.error('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="mb-4">Technician Registration</h2>
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel controlId="name" label="Name" className="mb-3">
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Name"
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="email" label="Email" className="mb-3">
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Email"
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="phone" label="Phone" className="mb-3">
                            <Form.Control
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                placeholder="Phone"
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="qualification" label="Qualification" className="mb-3">
                            <Form.Control
                                type="text"
                                name="qualification"
                                value={formData.qualification}
                                onChange={handleChange}
                                placeholder="Qualification"
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="specialization" label="Specialization" className="mb-3">
                            <Form.Control
                                type="text"
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                placeholder="Specialization"
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="hireDate" label="Hire Date" className="mb-3">
                            <Form.Control
                                type="date"
                                name="hireDate"
                                value={formData.hireDate}
                                onChange={handleChange}
                                required
                                placeholder="Hire Date"
                            />
                        </FloatingLabel>

                        <FloatingLabel controlId="password" label="Password" className="mb-3">
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Password"
                            />
                        </FloatingLabel>

                        <Stack className="d-flex justify-content-between align-items-center mb-5">
                            <Button variant="primary" type="submit" className="mt-3">
                                Register
                            </Button>
                            <Link to={'/technician/login'} className="nav-link mt-0">
                                Already Have an Account?
                            </Link>
                        </Stack>
                    </Form>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
};

export default TechnicianRegister;
