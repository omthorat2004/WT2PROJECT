import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './PatientDashboard.css'; // Import your custom CSS file

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filterType, setFilterType] = useState('Pending');
  
  const patientId = JSON.parse(localStorage.getItem('current-user')).id;

  useEffect(() => {
    if (patientId) {
      fetchAppointments(filterType);
    }
  }, [filterType, patientId]);

  const fetchAppointments = async (filter) => {
    try {
      const response = await fetch(`http://localhost:3000/admin/patient/appointments?filterType=${filter}&patientId=${patientId}`);
      const data = await response.json();
      setAppointments(data.appointments || []);
      setFilteredAppointments(data.appointments || []);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  const handleReadMore = (appointment) => {
    let title = '';
    let text = '';

    if (filterType === 'CompletedNotApproved') {
      title = 'Payment Required';
      text = 'Make payment to admin so the result can be approved.';
    } else if (filterType === 'Accepted') {
      title = 'Technician Information';
      text = `Accepted by Technician: ${appointment.technician_name}, Phone: ${appointment.technician_phone}`;
    } else if (filterType === 'Pending') {
      title = 'Pending Appointment Details';
      text = `Your appointment is currently pending. Please wait for confirmation.`;
    } else if (filterType === 'CompletedApproved') {
      title = 'Completed Appointment Details';
      text = `Your appointment has been completed and approved. Thank you for your patience!`;
    }

    Swal.fire({
      title: title,
      text: text,
      icon: 'info',
      confirmButtonText: 'OK',
    });
  };

  const handleDownloadReport = (resultUrl) => {
    window.open(resultUrl, '_blank');
  };

  return (
    <Container>
      <h2 className="mb-4">Patient Dashboard</h2>

      <div className="filter-options mb-4">
        <Button variant={filterType === 'Pending' ? 'primary' : 'outline-primary'} onClick={() => setFilterType('Pending')}>
          Pending Appointments
        </Button>
        <Button variant={filterType === 'Accepted' ? 'primary' : 'outline-primary'} onClick={() => setFilterType('Accepted')}>
          Accepted Appointments
        </Button>
        <Button variant={filterType === 'CompletedNotApproved' ? 'primary' : 'outline-primary'} onClick={() => setFilterType('CompletedNotApproved')}>
          Completed but Not Approved
        </Button>
        <Button variant={filterType === 'CompletedApproved' ? 'primary' : 'outline-primary'} onClick={() => setFilterType('CompletedApproved')}>
          Completed and Approved
        </Button>
      </div>

      <Row>
        {filteredAppointments.map((appointment) => (
          <Col md={4} key={appointment.appointment_id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Appointment Date: {appointment.Appointment_Date}</Card.Title>
                <Card.Text>
                  <strong>Status:</strong> {appointment.Status} <br />
                  {filterType === 'Accepted' && (
                    <>
                      <strong>Technician:</strong> {appointment.technician_name} <br />
                      <strong>Phone:</strong> {appointment.technician_phone} <br />
                    </>
                  )}
                </Card.Text>
                <Button variant="primary" onClick={() => handleReadMore(appointment)}>
                  Read More
                </Button>
                {filterType === 'CompletedApproved' && (
                  <Button variant="success" className="ml-2" onClick={() => handleDownloadReport(appointment.result_url)}>
                    Download Report
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredAppointments.length === 0 && (
        <Alert variant="info">No appointments available for the selected filter.</Alert>
      )}
    </Container>
  );
};

export default PatientDashboard;
