import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import Header from './Header';
import NavBar from './NavBar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './styles.css';

function AdminSitelist() {
  return (
    <div className='p-grid'>
       <Header userName='Jane Doe' ></Header>
       <NavBar />
       <h1> admin</h1>


    </div>
  )
}

export default AdminSitelist
