import { Navigate, Outlet } from 'react-router-dom';

const PatientPrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem('token'); 

  return isAuthenticated ? <Outlet /> : <Navigate to='/patient/login' />;
};

export default PatientPrivateRoute;
