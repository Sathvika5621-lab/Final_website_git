import React, {useState} from "react";
import ReactDOM from "react-dom";
import { useForm,Controller } from "react-hook-form";
import { TabView, TabPanel } from 'primereact/tabview';
import { Panel } from 'primereact/panel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import SyringePrepTMinusOne from "./SyringePrepTMinusOne";
import SyringePrepTThree from "./SyringePrepTThree";
import "../styles.css";
import "../Formstyle.css";

function SyringePrepForm() {
  const { register, handleSubmit, control, formState: { errors }, watch, setValue } = useForm();
  const onSubmit = data => console.log(data);
 

  return (
    <div>

      <Panel header="For any inquiries please contact Dr.Forough Jahandideh at fjahandideh@ohri.ca"  toggleable >
         <h3 style={{marginTop:'0', marginBottom:'0'}}>Instructions: </h3>
         <ul style={{marginTop:'0', marginBottom:'0'}}>
            1) Refer to the injection volume sheet 
        </ul>
        <ul style={{marginTop:'0', marginBottom:'0'}}>
            2) Read the reagent preparation SOP
       </ul>
       <ul style={{marginTop:'0', marginBottom:'0'}}>
            3) Fill the "Syringe Preparation Check" table
       </ul>
       <ul style={{marginTop:'0', marginBottom:'0'}}>
            4) Complete this form using the information from the "Syringe Preparation Check" table
       </ul>
      </Panel>
         <TabView>
            <TabPanel header = "Syringe preparation T-1" >
              <SyringePrepTMinusOne />
            </TabPanel>
            <TabPanel header = "Syringe preparation T3">
                <SyringePrepTThree />
           </TabPanel>
         </TabView>
    </div>
  )
}

export default SyringePrepForm