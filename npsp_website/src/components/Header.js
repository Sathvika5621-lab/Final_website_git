import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import './styles.css'; 
import logo from './logo/NPSPLogo_HR_White_Stack.png'

function Header({userName}) {
  return (
    <div>
      <div className="header p-grid p-align-center p-justify-between" style={{ backgroundColor: '#265787' }}>
      <div className="p-col-fixed">
      <img src={logo} alt="Logo" className='header-logo' />
      </div>
      <div className="p-col">
        <h1 className="header-title">NATIONAL PRECLINICAL SEPSIS PLATFORM</h1>
      </div>
      <div className="header-userinfo">
        <div>Welcome {userName}!</div>
        <Button label="Logout" className="p-button-text" />
      </div>
    </div>
    </div>
  )
}

export default Header