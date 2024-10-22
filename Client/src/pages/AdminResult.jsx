import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Modal, Row, Spinner } from 'react-bootstrap';

const AdminResult = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/results');
      const data = await response.json();
      setResults(data.results || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching results:', err);
      setLoading(false);
    }
  };

  const handleReadMore = (result) => {
    setSelectedResult(result);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedResult(null);
  };

  const handleApproveResult = async () => {
    if (!selectedResult) return;
    try {
      const response = await fetch('http://localhost:3000/admin/approve-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ result_id: selectedResult.result_id }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Result approved successfully');
        fetchResults(); // Refresh the list after approval
        handleCloseModal();
      } else {
        alert(data.error || 'Failed to approve the result');
      }
    } catch (err) {
      console.error('Error approving result:', err);
      alert('Error occurred while approving the result');
    }
  };

  return (
    <Container className="admin-result">
      <h2 className="mb-4">Test Results</h2>
      {loading ? (
        <div className="loading-spinner">
          <Spinner animation="border" variant="primary" />
          <p>Loading data, please wait...</p>
        </div>
      ) : (
        <Row>
          {results.map((result) => (
            <Col md={4} key={result.result_id} className="mb-4">
              <Card className="custom-card">
                <Card.Body>
                  <Card.Title>Appointment Date: {result.Appointment_Date}</Card.Title>
                  <Card.Text>
                    <strong>Status:</strong> {result.Status} <br />
                    <strong>Patient:</strong> {result.patient_name} <br />
                    <strong>Technician:</strong> {result.technician_name} <br />
                    <strong>Specialization:</strong> {result.specialization} <br />
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleReadMore(result)}>
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Result Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedResult && (
            <>
              <p><strong>Result ID:</strong> {selectedResult.result_id}</p>
              <p><strong>Result URL:</strong> <a href={selectedResult.result_url} target="_blank" rel="noopener noreferrer">View Report</a></p>
              <p><strong>Uploaded At:</strong> {selectedResult.uploaded_at}</p>
              <p><strong>Approved by Admin:</strong> {selectedResult.approved_by_admin ? 'Yes' : 'No'}</p>
              <hr />
              <p><strong>Patient Name:</strong> {selectedResult.patient_name}</p>
              <p><strong>Email:</strong> {selectedResult.patient_email}</p>
              <p><strong>Phone:</strong> {selectedResult.patient_phone}</p>
              <hr />
              <p><strong>Technician Name:</strong> {selectedResult.technician_name}</p>
              <p><strong>Specialization:</strong> {selectedResult.specialization}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {!selectedResult?.approved_by_admin && (
            <Button variant="success" onClick={handleApproveResult}>
              Approve
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminResult;
