import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Column } from 'primereact/column';
import Header from './Header';
import NavBar from './NavBar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './styles.css';

function Home() {
  return (
    <div>
        <Header />
        <NavBar />
        
         <h1>National preclinical sepsis platform</h1>
         <p> For any inquiries please contact Dr.Forough Jahandideh at fjahandideh@ohri.ca.</p>
          

    </div>
  )
}

export default Home