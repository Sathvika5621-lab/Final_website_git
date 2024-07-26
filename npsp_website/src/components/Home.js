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

function Home() {
  return (
    <div>
        <Header />
        <NavBar />
        <div className="home-container">
            <Card className="home-card">
                <h1 className="home-title">National Preclinical Sepsis Platform</h1>
                <p className="home-content">
                    For any inquiries please contact Dr. Forough Jahandideh at <a href="mailto:fjahandideh@ohri.ca">fjahandideh@ohri.ca</a>.
                </p>
            </Card>
        </div>
    </div>
  );
}

export default Home;
