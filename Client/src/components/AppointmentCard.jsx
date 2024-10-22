import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { storage } from '../firebase'; // Import your Firebase configuration

const AppointmentCard = ({ appointment, isAcceptedPage }) => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadResult = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please select a file before submitting.');
      return;
    }

    setIsUploading(true);
    const storageRef = ref(storage, `results/${selectedFile.name}`);

    try {
   
      await uploadBytes(storageRef, selectedFile);
      
    
      const downloadURL = await getDownloadURL(storageRef);
      await saveResultToDatabase(downloadURL);
      
      Swal.fire('Uploaded!', 'Result has been successfully uploaded.', 'success');
      setSelectedFile(null);
    } catch (err) {
      toast.error('Failed to upload the result.');
    } finally {
      setIsUploading(false);
    }
  };

  const saveResultToDatabase = async (downloadURL) => {
    try {
      const response = await fetch(`http://localhost:3000/technician/appointment/${appointment.Id}/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ result_url: downloadURL }),
      });
      if (!response.ok) {
        throw new Error('Failed to save the result in the database.');
      }
      Swal.fire({
        title:'Results Uploaded Successfully',
        text:'Reports are send to the admin',
        icon:'success'
      })
      navigate('/technician/dashboard')
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleClick = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, accept it!',
    }).then((result) => {
      if (result.isConfirmed) {
        acceptAppointment();
      }
    });
  };

  const acceptAppointment = async () => {
    try {
      const technician_id = JSON.parse(localStorage.getItem('userData')).technician_id;
      const response = await fetch(`http://localhost:3000/technician/appointment/${appointment.Id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ technician_id }),
      });
      if (!response.ok) {
        throw new Error('Server Error Occurred');
      }
      Swal.fire('Accepted!', 'Appointment has been Accepted.', 'success');
      setTimeout(() => {
        navigate('/technician/dashboard/accepted');
      }, 500);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{appointment.name}</h5>
        <p className="card-text"><strong>Email:</strong> {appointment.email}</p>
        <p className="card-text"><strong>Contact:</strong> {appointment.phone}</p>
        <p className="card-text"><strong>Address:</strong> {appointment.address}</p>
        <p className="card-text"><strong>Medical History:</strong> {appointment.medicalHistory}</p>
        <p className="card-text"><strong>Appointment Date:</strong> {appointment.appointment_date}</p>
        <div className="mt-3">
          {isAcceptedPage ? (
            <div>
              <input
                type="file"
                className="form-control mb-2"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              <button className="btn btn-primary w-100" onClick={uploadResult} disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Submit Result'}
              </button>
            </div>
          ) : (
            <button className="btn btn-success w-100" onClick={handleClick}>
              Accept Appointment
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AppointmentCard;
