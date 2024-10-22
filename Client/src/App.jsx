import { Route, Routes } from 'react-router-dom';
import AdminPrivate from './AdminPrivate';
import './App.css';
import PatientPrivateRoute from './PatientPrivateRoute';
import Navbar from './components/Navbar';
import AboutUs from './pages/AboutUs';
import AdminHome from './pages/AdminHome';
import AdminLogin from './pages/AdminLogin';
import AdminResult from './pages/AdminResult';
import AdminTest from './pages/AdminTest';
import Home from './pages/Home';
import PatientDashboard from './pages/PatientDashboard';
import PatientLogin from './pages/PatientLogin';
import PatientRegister from './pages/PatientRegister';
import TechnicianDashBoard from './pages/TechnicianDashBoard';
import TechnicianLogin from './pages/TechnicianLogin';
import TechnicianRegister from './pages/TechnicianRegister';
import Tests from './pages/Tests';

function App() {
  

  return (
    <>
     <Navbar/>
      <Routes>
        <Route path='/about-us' element={<AboutUs/>}/>
        <Route element={<AdminPrivate/>}>
          <Route path='/admin' element={<AdminHome/>}/>
          <Route path='/admin/results' element={<AdminResult/>}/>
          <Route path='/admin/test' element={<AdminTest/>}/>
        </Route>
        <Route path='/technician/signup' element={<TechnicianRegister/>}/>
        <Route path='/technician/login' element={<TechnicianLogin/>}/>
        <Route path='/patient/login' element={<PatientLogin />} />
        <Route path='/admin/login' element={<AdminLogin/>}/>
        <Route path='/patient/register' element={<PatientRegister />} />
        <Route path='/' element={<Home />} />
        <Route path='/technician/dashboard' element={<TechnicianDashBoard/>}/>
        <Route path='/technician/dashboard/accepted' element={<TechnicianDashBoard/>}/>
        <Route path='/patient/dashboard' element={<PatientDashboard/>}/>
        <Route path='/patient' element={<PatientPrivateRoute />}>
        

        </Route>
        <Route path='/test' element={<Tests/>}/>
      </Routes>
    </>
  );
}

export default App;
