import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimalHousing from "./components/Forms/AnimalHousing";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import FormsList from "./components/FormsList";
import ForgotPassword from './components/Forms/ForgotPassword';
import InductionForm from "./components/Forms/InductionForm";

function App() {
  const [mousedetails, setMouseDetails] = useState([]);

  const addMouseDetails = (newMouseDetails) => {
    setMouseDetails(prevDetails => [...prevDetails, ...newMouseDetails]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home-page" element={<HomePage mousedetails={mousedetails} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/formslist" element={<FormsList />} />
        <Route path="/animal-housing" element={<AnimalHousing addMouseDetails={addMouseDetails} />} />
      </Routes>
    </Router>
  );
}

export default App;
