import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './AdminTest.css'; // Custom CSS for styling

const AdminTest = () => {
  const [testData, setTestData] = useState({
    testName: '',
    testDescription: '',
    testPrice: '',
    sampleType: '',
  });
  const navigate = useNavigate()
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestData({ ...testData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3000/admin/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(result.message);
        Swal.fire({
            title: 'Test Added Successfully',
            text: 'Test has been added successfully',
            icon: 'success',
        })
        setTimeout(()=>{
            navigate('/')

        },1000)
        setTestData({ testName: '', testDescription: '', testPrice: '', sampleType: '' });
      } else {
        const error = await response.json();
        setErrorMessage(error.message);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setErrorMessage('An error occurred while submitting the form. Please try again.');
    }
  };

  return (
    <Container className="admin-test-container">
      <h2 className="mb-4 text-center">Add New Test</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      
      <Form onSubmit={handleSubmit} className="test-form">
        <Row>
          <Col md={6}>
            <Form.Group controlId="formTestName">
              <Form.Label>Test Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter test name"
                name="testName"
                value={testData.testName}
                onChange={handleChange}
                required
                className="form-control"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formSampleType">
              <Form.Label>Sample Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter sample type"
                name="sampleType"
                value={testData.sampleType}
                onChange={handleChange}
                required
                className="form-control"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formTestPrice">
              <Form.Label>Test Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter test price"
                name="testPrice"
                value={testData.testPrice}
                onChange={handleChange}
                required
                className="form-control"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="formTestDescription">
          <Form.Label>Test Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter test description"
            name="testDescription"
            value={testData.testDescription}
            onChange={handleChange}
            required
            className="form-control"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3 btn-submit">
          Add Test
        </Button>
      </Form>
    </Container>
  );
};

export default AdminTest;
