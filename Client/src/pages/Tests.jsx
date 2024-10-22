import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Tests = () => {
  const [show, setShow] = useState(false);
  const [appointmentModalShow, setAppointmentModalShow] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [testData, setTestData] = useState([]); // Initialize state for tests

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch('http://localhost:3000/patient/tests');
        if (!response.ok) {
          throw new Error('Failed to fetch tests');
        }
        const data = await response.json();
        setTestData(data); // Update state with fetched tests
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchTests(); // Fetch tests on component mount
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (test) => {
    setSelectedTest(test);
    setShow(true);
  };

  const handleAppointmentShow = () => {
    setAppointmentModalShow(true);
  };

  const handleAppointmentClose = () => {
    setAppointmentModalShow(false);
    setAppointmentDate('');
  };

  const handleDateChange = (e) => {
    setAppointmentDate(e.target.value);
  };

  const handleSubmitAppointment = async () => {
    try {
      const patientId = JSON.parse(localStorage.getItem('current-user')).id;
      console.log(patientId);
      const response = await fetch('http://localhost:3000/patient/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patientId, appointmentDate, testId: selectedTest.id }),
      });
      if (!response.ok) {
        throw new Error('Failed Adding Appointment');
      }

      const data = await response.json();

      Swal.fire({
        title: 'Appointment Added',
        icon: 'success',
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      handleAppointmentClose();
    }
  };

  return (
    <div className="container mt-4">
      <h2>Available Tests</h2>
      <div className="row">
        {testData.map((test) => (
          <div className="col-md-4 mb-4" key={test.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{test.name}</h5>
                <p className="card-text">Cost: ₹{test.cost}</p>
                <p className="card-text">Sample Type: {test.sampleType}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleShow(test)}
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTest?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Description:</h6>
          <p>{selectedTest?.description}</p>
          <h6>Cost:</h6>
          <p>₹{selectedTest?.cost}</p>
          <h6>Sample Type:</h6>
          <p>{selectedTest?.sampleType}</p>
          <Button
            variant="primary"
            onClick={handleAppointmentShow}
          >
            Take Appointment
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={appointmentModalShow} onHide={handleAppointmentClose}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule Appointment for {selectedTest?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="appointment-date">Select Date:</label>
          <input
            type="date"
            id="appointment-date"
            className="form-control"
            value={appointmentDate}
            onChange={handleDateChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAppointmentClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitAppointment}>
            Submit Appointment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Tests;
