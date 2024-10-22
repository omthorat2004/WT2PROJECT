import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(''); // 'admin', 'technician', 'patient', or empty
  const navigate = useNavigate()
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLogin');
    const role = localStorage.getItem('userRole'); 
    setIsLoggedIn(loginStatus === 'true');
    setUserRole(role);
  }, [navigate]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container">
        <Link className="navbar-brand text-white fw-bold" to="/">
          HealthCare Portal
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Common links */}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about-us">
                About Us
              </Link>
            </li>

            
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/patient/login">
                    Patient Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/patient/register">
                    Patient Register
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && userRole === 'patient' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/patient/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/test">
                    Test
                  </Link>
                </li>
              </>
            )}

            {/* Technician-related links */}
            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/technician/signup">
                  Technician Signup
                </Link>
              </li>
            )}
            {isLoggedIn && userRole === 'technician' && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/technician/dashboard">
                  Technician Dashboard
                </Link>
              </li>
            )}

            {/* Admin-related links */}
            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin/login">
                  Admin Login
                </Link>
              </li>
            )}
            {isLoggedIn && userRole === 'admin' && (
              <>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin/test">
                  Add Test
                </Link>
              </li>
                <li className="nav-item">
                <Link className="nav-link text-white" to="/admin/results">
                  Results
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin">
                  Users
                </Link>
              </li>
              
              </>
            )}

            {/* Logout button */}
            {isLoggedIn && (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light ms-2"
                  onClick={() => {
                    
                    setIsLoggedIn(false);
                    setUserRole('');
                    localStorage.removeItem('isLogin');
                    localStorage.removeItem('userRole');
                    localStorage.clear()
                    navigate('/')
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
