import React, {useState} from "react";
import ReactDOM from "react-dom";
import { useForm,Controller, set } from "react-hook-form";
import { TabView, TabPanel } from 'primereact/tabview';
import { InputTextarea } from 'primereact/inputtextarea';
import { Panel } from 'primereact/panel';
import { Fieldset } from 'primereact/fieldset';
import { RadioButton } from "primereact/radiobutton";
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Divider } from 'primereact/divider';
import Header from "../Header";
import "../styles.css";
import "../Formstyle.css";
import BacterialCountInitial from "./BacterialCountInitial";
import BacterialCountafter24 from "./BacterialCountafter24";


// import "./globalstyles.css";


function BacterialCount() {

  const {control, register, handleSubmit, formState: { errors }, setValue, watch} = useForm();


  const onSubmit = (data) =>
    {
      console.log(data);
    };

  
  
  
  return (
    <div >
      
      <TabView>
            <TabPanel header = "Questions need to be filled out during the initial plating" >
              <BacterialCountInitial />
            </TabPanel>
            <TabPanel header = "Questions to be filled out 24 hours after the plate was placed in the incubator">
                <BacterialCountafter24 />
           </TabPanel>
         </TabView>


    </div>
  )
}
export default BacterialCount