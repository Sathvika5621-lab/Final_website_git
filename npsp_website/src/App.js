import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimalHousing from "./components/Forms/AnimalHousing";
import HomePage from "./components/HomePage";
import Home from './components/Home';
import LoginPage from "./components/LoginPage";
import FormsList from "./components/FormsList";
import ForgotPassword from './components/Forms/ForgotPassword';
import SyringePrepForm from './components/Forms/SyringePrepForm';
import InductionForm from "./components/Forms/InductionForm";
import IttForm from './components/Forms/IttForm';
import RegisterHqp from './components/Forms/RegisterHqp';
import AdminSitelist from './components/AdminSitelist';

function App() {
  const [mousedetails, setMouseDetails] = useState([]);

  const addMouseDetails = (newMouseDetails) => {
    setMouseDetails(prevDetails => [...prevDetails, ...newMouseDetails]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register-hqp" element = {<RegisterHqp></RegisterHqp>} />
        <Route path="/home-page" element={<HomePage mousedetails={mousedetails} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/formslist" element={<FormsList />} />
        <Route path="/syringe-prep" element ={<SyringePrepForm />} />
        {/* <Route path="/itt-form" element={<IttForm onSubmitHandler={addMouseDetails} />} /> */}
        <Route path="/animal-housing" element={<AnimalHousing addMouseDetails={addMouseDetails} />} />
        <Route path="/sites-list" element={<AdminSitelist /> } />
      </Routes>
    </Router>
  );
}

export default App;
