import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppointmentCard from '../components/AppointmentCard';
import './techniciandashboard.css';

const TechnicianDashBoard = () => {
  const location = useLocation();
  const isAccepted = location.pathname === '/technician/dashboard/accepted';
  const [appointments,setAppointments] = useState([])

 
  useEffect(() => {
    const getAppointments = async () => {
      try {
        const technician = JSON.parse(localStorage.getItem('userData'));
        console.log(technician)
        const url = isAccepted
          ? `http://localhost:3000/technician/appointments/${technician.technician_id}`
          : 'http://localhost:3000/technician/appointments';
        const response = await fetch(url);
        const data = await response.json();
        setAppointments(data.appointments)
      } catch (err) {
        console.error('Error fetching appointments:', err);
      }
    };

    getAppointments(); 
  }, [location.pathname]); 

  return (
    <div>
      <div className='dashboard-menu flex '>
        <div className='flex flex-50 bg-warning'>
          <Link to='/technician/dashboard'>Appointments</Link>
        </div>
        <div className='flex flex-50 bg-success'>
          <Link to='/technician/dashboard/accepted'>Accepted Appointments</Link>
        </div>
      </div>
      <div className='d-flex flex-column gap-3 my-5'>
        {appointments.map((appointment)=>{
          return <AppointmentCard key={appointment.Id} appointment={appointment} isAcceptedPage={isAccepted} />
        })}
      </div>
    </div>
  );
};

export default TechnicianDashBoard;
