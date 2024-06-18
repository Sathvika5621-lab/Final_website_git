import React, {useState} from 'react'
import { Button } from "primereact/button";
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

function FormsList() {
  const [activeFormComponent, setActiveFormComponent] = useState(null);
  const mouseID = "mouse_Id (placeholder)"
  const formComponents = {
    "ITT Form": <IttForm />,
    "Bw-t-score Form": <BodyweightAndTemperature />,
    "Syringe Preparation Form": <SyringePrepForm />,
    "Induction Form": <InductionForm />,
    "Treatment Injection Form": <TreatmentInjectionForm />,
    "EPOC Form": <EpocForm />,
    "Bio Banking Form": <BioBankingForm />,
    "WBC Count": <WBCCountForm />,
    "Bacterial Culture:Plating form": <BacterialCount />,
    "Bacterial Culture:Colony Counting Form": <BacterialCultureColonyCountForm />
  };

  const handleFormClick = (formName) => {
    setActiveFormComponent(formComponents[formName]);
    // You would also handle opening the form or popup here
  };


  return (
    <div>
      <Header />
      <div className='main-container'>
      <h4 className='mouse-id'>Mouse ID: {mouseID}</h4> 
      <div className='form-container'>
      
      <div className='sidebar'>
           <h2> Forms </h2>
           {Object.keys(formComponents).map((formName, index)=> (
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

export default FormsList