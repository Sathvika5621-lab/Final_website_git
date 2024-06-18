import React, {useState} from "react";
import ReactDOM from "react-dom";
import { useForm,Controller, set } from "react-hook-form";
import { InputTextarea } from 'primereact/inputtextarea';
import { Panel } from 'primereact/panel';
import { Fieldset } from 'primereact/fieldset';
import { RadioButton } from "primereact/radiobutton";
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Divider } from 'primereact/divider';
import { Checkbox } from 'primereact/checkbox';
import Header from "../Header";
import "../styles.css";
import "../Formstyle.css";
// import "./globalstyles.css";

function WBCCountForm() {

  const {control, register, handleSubmit, formState: { errors }, setValue, watch} = useForm();
  const selectedDyeName = watch ('dyename');
  const selectedSampleObservation = watch ('sampleobservation')
  const selectedDeviceUsedToCount = watch ('deviceusedtocount')


  const cellCount1 = watch('cellCount1', 0);
  const cellCount2 = watch('cellCount2', 0);
  const cellCount3 = watch('cellCount3', 0);
  const cellCount4 = watch('cellCount4', 0);
  const totalCells = Number(cellCount1) + Number(cellCount2) + Number(cellCount3) + Number(cellCount4);
  const cellConcentration = (totalCells / 4) * 40 * Math.pow(10, 4);

  const onSubmit = (data) =>
    {
      console.log(data);
    };


    const onDyeNameChange = (value) =>
      {
        setValue('dyename', value);
        if (value != "Other"){
          setValue("otherdyename", "")
        }
      };

   const onSampleObservationChange = (value) =>
    {
      setValue('sampleobservation', value);
    };

    const onDeviceUsedToCountChange = (value) =>
      {
        setValue('deviceusedtocount', value);
      };


  return (
    <div className = "Headings">
      <div className="body-content" style={{padding :'5px'}}>    
      <ScrollPanel style={{width : '100%', height: '1000px'}}>
      <Fieldset legend = "Bacterial count form" className="fieldset-legend">

      <Panel header="For any inquiries please contact Dr.Forough Jahandideh at fjahandideh@ohri.ca"  toggleable >
         <h3 style={{marginTop:'0', marginBottom:'0'}}>Instructions: </h3>
         <ul style={{marginTop:'0', marginBottom:'0'}}>
            1) Read the cell count & fluid processing SOP. Print and complete the “White Blood Cell Count Check” table. This table should be actively filled while counting the white blood cells for every mouse.  
        </ul>
        <ul style={{marginTop:'0', marginBottom:'0'}}>
            2) Use the answer from the “White Blood Cell Count Check” table to answer the questions below and upload a picture or scan a copy of the referenced filled table.
       </ul>
      </Panel>

      <form onSubmit = {handleSubmit(onSubmit)} className = 'p-formgrid p-grid' style={{ padding: '5px' }}>
         
      <div className="form-question" style={{ padding: '3px' }}>
              <label>Please enter the user ID of the HQP completing the data entry: </label>
              <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("dateentry", { required: "This field is required." })} />
               {errors.dataentry && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
               </div>

               <div className="form-question" style={{ padding: '3px' }}>
              <label>Please enter the user ID of the HQP that completed the "White Blood Cell Count" table: </label>
              <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("wbccounthqp", { required: "This field is required." })} />
               {errors.wbccounthqp && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
               </div>

         <div  className = "form-question" style={{ padding: '3px' }}>
          <label> What time was the white blood cell count performed? (Military time) </label>
          <input type = "time" {...register("bloodagartime", { required: "This field is required." })} />
          {errors.bloodagartime && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>What dye was used to stain the white blood cells? </label>
          <div className="radio-option">
            <RadioButton
              inputId="aceticacid"
              name="dyename"
              value="Acetic acid with methylene blue"
              {...register("dyename", { required: "This field is required." })}
              checked={selectedDyeName === "Acetic acid with methylene blue"}
              onChange={() => onDyeNameChange("Acetic acid with methylene blue")}
            />
            <label htmlFor="aceticacid" className="p-radiobutton-label">3% acetic acid with methylene blue</label>
          </div>
          
          <div className="radio-option">
            <RadioButton
              inputId="other"
              name="dyename"
              value="Other"
              {...register("dyename", { required: "This field is required." })}
              checked={selectedDyeName === "Other"}
              onChange={() => onDyeNameChange("Other")}
            />
            <label htmlFor="other" className="p-radiobutton-label">Other:</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectedDyeName === "Other" && (
            <InputText 
            {...register('otherdyename ', {required:"This field is required."})}
            id="otherdyename"
            placeholder="Specify...."
          />
          )}
          </div>
          {errors.dyename && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.otherdyename && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label> When taking 5uL of whole blood, how did the sample look like? </label>
          <div className="radio-option">
            <RadioButton
              inputId="bloodclot"
              name="sampleobservation"
              value="Blood Clotted"
              {...register("sampleobservation", { required: "This field is required." })}
              checked={selectedSampleObservation === "Blood Clotted"}
              onChange={() => onSampleObservationChange("Blood Clotted")}
            />
            <label htmlFor="bloodclot" className="p-radiobutton-label">The blood was clotted</label>
          </div>
         
          <div className="radio-option">
            <RadioButton
              inputId="normalblood"
              name="sampleobservation"
              value="Blood was normal"
              {...register("sampleobservation", { required: "This field is required." })}
              checked={selectedSampleObservation === "Blood was normal"}
              onChange={() => onSampleObservationChange("Blood was normal")}
            />
            <label htmlFor="normalblood" className="p-radiobutton-label"> The blood was normal</label>
          </div>
          
          {errors.sampleobservation && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        

        <div className = "form-question" style={{padding:'3px'}}>
          <label>
            <input type="checkbox" {...register("confirmNPSP", { required: "This field is required." })} />
            I confirm that I followed the NPSP SOP regarding sample preparation and execution
          </label>
          {errors.confirmNPSP && <p style={{ color: 'red' }}>{errors.confirmNPSP.message}</p>}
        </div>

        <div className = "form-question" style={{padding:'3px'}}>
          <label>
            <input type="checkbox" {...register("changesWBCProtocol", { required: "This field is required." })} />
            We made changes to the WBC protocol in our laboratory
          </label>
          {errors.changesWBCProtocol && <p style={{ color: 'red' }}>{errors.changesWBCProtocol.message}</p>}
        </div>

        <div className = "form-question" style={{padding:'3px'}}>
          <label>
            <input type="checkbox" {...register("notSure", { required: "This field is required." })} />
            I am not sure
          </label>
          {errors.notSure && <p style={{ color: 'red' }}>{errors.notSure.message}</p>}
        </div>




      <div  className = "form-question" style={{ padding: '3px' }}>
          <label> What was used to count the white blood cells? </label>
          <div className="radio-option">
            <RadioButton
              inputId="hemocytometer"
              name="deviceusedtocount"
              value="Hemocytometer "
              {...register("deviceusedtocount", { required: "This field is required." })}
              checked={selectedDeviceUsedToCount === "Hemocytometer"}
              onChange={() => onDeviceUsedToCountChange("Hemocytometer")}
            />
            <label htmlFor="hemocytometer" className="p-radiobutton-label">Hemocytometer</label>
          </div>
         
          <div className="radio-option">
            <RadioButton
              inputId="automaticcellcounter"
              name="deviceusedtocount"
              value="Automatic cell counter"
              {...register("deviceusedtocount", { required: "This field is required." })}
              checked={selectedDeviceUsedToCount === "Automatic cell counter"}
              onChange={() => onDeviceUsedToCountChange("Automatic cell counter")}
            />
            <label htmlFor="normalblood" className="p-radiobutton-label"> Automatic cell counter</label>
          </div>
          
          {errors.deviceusedtocount && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>


        <div className="p-fluid form-question p-formgrid p-grid" style={{padding: "3px"}}>
          <div className="p-field p-col-12 p-md-3">
            <label htmlFor="cellCount1">Cell count (corner 1):</label>
            <Controller name="cellCount1" control={control} defaultValue={0} render={({ field }) => (
              <InputText id="cellCount1" {...field} type="number" />
            )} />
          </div>
          <div className="p-field form-question p-col-12 p-md-3" style={{padding: "3px"}}>
            <label htmlFor="cellCount2">Cell count (corner 2):</label>
            <Controller name="cellCount2" control={control} defaultValue={0} render={({ field }) => (
              <InputText id="cellCount2" {...field} type="number" />
            )} />
          </div>
          <div className="p-field form-question p-col-12 p-md-3" style={{padding: "3px"}}>
            <label htmlFor="cellCount3">Cell count (corner 3):</label>
            <Controller name="cellCount3" control={control} defaultValue={0} render={({ field }) => (
              <InputText id="cellCount3" {...field} type="number" />
            )} />
          </div>
          <div className="p-field form-question p-col-12 p-md-3 " style={{padding: "3px"}}>
            <label htmlFor="cellCount4">Cell count (corner 4):</label>
            <Controller name="cellCount4" control={control} defaultValue={0} render={({ field }) => (
              <InputText id="cellCount4" {...field} type="number" />
            )} />
          </div>
        </div>   

        <div className="p-field form-question p-col-12" style={{padding: "3px"}}>
          <label htmlFor="totalCells">Total number of counted cells in all four corners (cells): </label>
          <InputText id="totalCells" value={totalCells} readOnly />
        </div>

        <div className="p-field form-question p-col-12" style={{padding: "3px"}}>
          <label htmlFor="cellConcentration">Cell Concentration (cells/mL): </label>
          <InputText id="cellConcentration" value={cellConcentration.toFixed(2)} readOnly />
        </div>

        
        <div className = "form-question" style={{padding:'3px'}}>
          <label>
            <input type="checkbox" {...register("couldnotcount", { required: "This field is required." })} />
            We could not count any WBC for this sample
          </label>
          {errors.couldnotcount && <p style={{ color: 'red' }}>{errors.couldnotcount.message}</p>}
        </div>

        <div className="p-field form-question" style={{padding: "3px"}}>
          <label htmlFor="deviations">Were there any deviations from the protocol when counting the white blood cells?</label>
          <div className="p-col">
          <InputTextarea id="deviations" {...register("deviations")} autoResize />
          </div>
        </div>

        <div className="p-field form-question" style={{padding: "3px"}}>
          <label htmlFor="comments">Do you have any comments to add?</label>
          <div className="p-col">
          <InputTextarea id="comments" {...register("comments")} autoResize />
          </div>
        </div>

        <div className="flex md:justify-content-end flex-wrap flex-container">
        <div className="flex-order-0 flex align-items-center justify-content-center" >
         <Button label="SAVE AND EXIT" className="p-button-lg form-blue-button-sm save-and-exit-btn " />
        </div>
        <div className="flex-order-1 flex align-items-center justify-content-center" style={{ width: '8rem'}}>
           <Button label="SUBMIT" className="p-button-lg form-blue-button-sm" />
         </div>
         </div>


        </form>
        </Fieldset>
        </ScrollPanel>
      </div>
    </div>
  )
}

export default WBCCountForm