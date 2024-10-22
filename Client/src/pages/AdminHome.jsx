import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Modal, Row, Spinner } from 'react-bootstrap';
import './AdminDashboard.css';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPerson, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch both patients and technicians, then stop loading
    Promise.all([fetchUsers(), fetchTechnicians()]).then(() => setLoading(false));
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:3000/admin/patients');
    const data = await response.json();
    const { patients } = data;
    setUsers(patients || []); // Ensure users is an array
  };

  const fetchTechnicians = async () => {
    const response = await fetch('http://localhost:3000/admin/technicians');
    const data = await response.json();
    const { technicians } = data; // Correctly access technicians from response
    setTechnicians(technicians || []); // Ensure technicians is an array
  };

  const handleReadMore = (person) => {
    setSelectedUser(person);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <Container className="admin-dashboard">
      <h2 className="mb-4">Patient and Technician Management</h2>
      {loading ? (
        // Show loading spinner while data is being fetched
        <div className="loading-spinner">
          <Spinner animation="border" variant="primary" />
          <p>Loading data, please wait...</p>
        </div>
      ) : (
        <>
          <Row className="mb-5">
            <h3>Patients</h3>
            {users.map((patient) => (
              <Col md={4} key={patient.id} className="mb-4">
                <Card className="custom-card">
                  <Card.Img variant="top" src={patient.imageUrl} />
                  <Card.Body>
                    <Card.Title>{patient.name}</Card.Title>
                    <Card.Text>
                      <strong>Email:</strong> {patient.email} <br />
                      <strong>Phone:</strong> {patient.phone} <br />
                      <strong>Blood Group:</strong> {patient.bloodGroup} <br />
                    </Card.Text>
                    <Button variant="primary" onClick={() => handleReadMore(patient)}>
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="mb-5">
            <h3>Technicians</h3>
            {technicians.map((technician) => (
              <Col md={4} key={technician.technician_id} className="mb-4">
                <Card className="custom-card">
                  <Card.Body>
                    <Card.Title>{technician.name}</Card.Title>
                    <Card.Text>
                      <strong>Email:</strong> {technician.email} <br />
                      <strong>Phone:</strong> {technician.phone} <br />
                      <strong>Specialization:</strong> {technician.specialization} <br />
                    </Card.Text>
                    <Button variant="primary" onClick={() => handleReadMore(technician)}>
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPerson && (
            <>
              <p><strong>ID:</strong> {selectedPerson.id || selectedPerson.technician_id}</p>
              <p><strong>Name:</strong> {selectedPerson.name}</p>
              <p><strong>Email:</strong> {selectedPerson.email}</p>
              <p><strong>Phone:</strong> {selectedPerson.phone}</p>
              {selectedPerson.bloodGroup && <p><strong>Blood Group:</strong> {selectedPerson.bloodGroup}</p>}
              {selectedPerson.medicalHistory && <p><strong>Medical History:</strong> {selectedPerson.medicalHistory}</p>}
              {selectedPerson.specialization && <p><strong>Specialization:</strong> {selectedPerson.specialization}</p>}
              {selectedPerson.qualification && <p><strong>Qualification:</strong> {selectedPerson.qualification}</p>}
              {selectedPerson.hire_date && <p><strong>Hire Date:</strong> {selectedPerson.hire_date}</p>}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminHome;
