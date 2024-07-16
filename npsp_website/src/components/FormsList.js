import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import IttForm from "./Forms/IttForm";
import BodyweightAndTemperature from "./Forms/BodyweightAndTemperature";
import SyringePrepForm from "./Forms/SyringePrepForm";
import InductionForm from "./Forms/InductionForm";
import TreatmentInjectionForm from "./Forms/TreatmentInjectionForm";
import EpocForm from "./Forms/EpocForm";
import BioBankingForm from "./Forms/BioBankingForm";
import WBCCountForm from "./Forms/WBCCountForm";
import BacterialCount from "./Forms/BacterialCount";
import BacterialCultureColonyCountForm from "./Forms/BacterialCultureColonyCountForm";

import "./styles.css"
import Header from "./Header";
import { Button } from 'primereact/button';

function FormsList() {
  const location = useLocation();
  const { mouseDetails } = location.state || {};
  const [activeFormComponent, setActiveFormComponent] = useState(null);

  const formComponents = {
    "ITT Form": <IttForm />,
    "Bw-t-score Form": <BodyweightAndTemperature />,
    "Induction Form": <InductionForm />,
    "Treatment Injection Form": <TreatmentInjectionForm />,
    "EPOC Form": <EpocForm />,
    "Bio Banking Form": <BioBankingForm />,
    "WBC Count": <WBCCountForm />,
    "Bacterial Culture:Plating form": <BacterialCount />
  };

  const handleFormClick = (formName) => {
    setActiveFormComponent(formComponents[formName]);
  };

  return (
    <div>
      <Header />
      <div className='main-container'>
        <div className='mouse-details'>
          <div className="mouse-detail">
            <span className="detail-label">Site:</span>
            <span className="detail-value">{mouseDetails?.site || 'N/A'}</span>
            <span className="detail-label">Fecal slurry dose:</span>
            <span className="detail-value">{mouseDetails?.slurrydose || 'N/A'}</span>
          </div>
          <div className="mouse-detail">
            <span className="detail-label">Type of Study:</span>
            <span className="detail-value">{mouseDetails?.studytype || 'N/A'}</span>
            <span className="detail-label">Study endpoint:</span>
            <span className="detail-value">{mouseDetails?.endpoint || 'N/A'}</span>
          </div>
          <div className="mouse-detail">
            <span className="detail-label">Mouse ID:</span>
            <span className="detail-value">{mouseDetails?.mouse_id || 'N/A'}</span>
          </div>
        </div>
        <div className='form-container'>
          <div className='sidebar'>
            <h2>Forms</h2>
            {Object.keys(formComponents).map((formName, index) => (
              <Button
                key={index}
                label={formName}
                className={`mt-2 p-button-lg blue-button-sm ${activeFormComponent === formComponents[formName] ? 'active' : ''}`}
                onClick={() => handleFormClick(formName)}
              />
            ))}
          </div>
          <div className='content'>
            {activeFormComponent}
          </div>
        </div>
        <div className="flex md:justify-content-end flex-wrap flex-container">
          <div className="flex-order-1 flex align-items-center justify-content-end" style={{ width: '8rem' }}>
            <Button label="SUBMIT" className="p-button-lg form-blue-button-sm " />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormsList;
