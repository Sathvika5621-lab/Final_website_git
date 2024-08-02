import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import './styles.css'; 
import logo from './logo/NPSPLogo_HR_White_Stack.png'

function Header({userName}) {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Here you can also clear any user session data if needed
    navigate('/'); // Redirect to the login page
  };
  return (
    <div>
      <div className="header p-grid p-align-center p-justify-between" style={{ backgroundColor: '#265787' }}>
      <div className="p-col-fixed">
      <img src={logo} alt="Logo" className='header-logo' />
      </div>
      <div>
        <h1 className="header-title">NATIONAL PRECLINICAL SEPSIS PLATFORM</h1>
      </div>
      
      <div className="login-info header-userinfo ">
        <div>Welcome {userName}!</div>
        <Button label="Logout" className="p-button-text" onClick={handleLogout} />
      </div>
    </div>
    </div>
  )
}

export default Header