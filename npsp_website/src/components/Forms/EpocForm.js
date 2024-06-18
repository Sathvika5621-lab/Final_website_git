import React, {useState} from "react";
import ReactDOM from "react-dom";
import { useForm,Controller } from "react-hook-form";
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

function EpocForm() {
  const {control, register, handleSubmit, formState: { errors }, setValue, watch} = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }


  return (
    <div className="Headings">
      <div className="body-content" style = {{padding:'5px'}}>
       <ScrollPanel style={{width : '100%', height: '1000px'}}>
       <Fieldset legend= "EPOC FORM" className="fieldset-legend">
       <form onSubmit={handleSubmit(onSubmit)} className='p-formgrid p-grid'>

       <div className="form-question" style={{ padding: '3px' }}>
          <label>User ID of the HQP responsible of the epoc device (sample injection) </label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("epocdevidehandling", { required: "This field is required." })} />
          {errors.epocdevidehandling && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
         </div>

         <div className="form-question" style={{ padding: '3px' }}>
          <label htmlFor='epocinjectiontime'>Time the epoc sample injection was done(Military time): </label>
          <input type = "time" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("epocinjectiontime", { required: "This field is required." })} />
          {errors.epocinjectiontime && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
         </div>

       <div className="form-question" style={{ padding: '3px' }}>
          <label>Please enter the user ID of the HQP that completed the "EPOC Check" table: </label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("epoccheckHQP", { required: "This field is required." })} />
          {errors.epoccheckHQP && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
         </div>

       <div className="form-question" style={{ padding: '3px' }}>
          <label>Please enter the user ID of the HQP completing the data entry: </label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("HQPdataentry", { required: "This field is required." })} />
          {errors.HQPdataentry && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
         </div>

         <div className="form-question" style={{ padding: '3px' }}>
          <label>Please enter the user ID of the HQP verifying the data entry: </label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("HQPverified", { required: "This field is required." })} />
          {errors.HQPverified && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
         </div>

         <div className="p-col-12 p-md-4">
         <Fieldset legend="Blood Gas Analysis" className="p-mb-5">
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="ph">pH:</label>
                                <InputText id="ph" {...register("ph")} />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="pco2">pCO2 (mmHg):</label>
                                <InputText id="pco2" {...register("pco2")} />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="po2">pO2 (mmHg):</label>
                                <InputText id="po2" {...register("po2")} />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="hco3">cHCO3- (mmol/L):</label>
                                <InputText id="hco3" {...register("hco3")} />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="beecf">BE(ecf) (mmol/L):</label>
                                <InputText id="beecf" {...register("beecf")} />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="beb">BE(b) (mmol/L):</label>
                                <InputText id="beb" {...register("beb")} />
                            </div>
                        </div>
                    </Fieldset>
                  </div>
                  <div className="p-col-12 p-md-4">
                    <Fieldset legend="Electrolytes and Hematology" className="p-mb-5">
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="cso2">cSO2 (%):</label>
                                <InputText id="cso2" {...register("cso2")} />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="na">Na+ (mmol/L):</label>
                                <InputText id="na" {...register("na")} />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="k">K+ (mmol/L):</label>
                                <InputText id="k" {...register("k")} />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="ca">Ca2+ (mmol/L):</label>
                                <InputText id="ca" {...register("ca")} />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="cl">Cl- (mmol/L):</label>
                                <InputText id="cl" {...register("cl")} />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="hct">Hct (% PCV):</label>
                                <InputText id="hct" {...register("hct")} />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="chgb">cHgb (g/dL):</label>
                                <InputText id="chgb" {...register("chgb")} />
                            </div>
                        </div>
                    </Fieldset>
                    </div>

                    <div className="p-col-12 p-md-4">
                    <Fieldset legend="Metabolic and Renal" className="p-mb-5">
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="glu">Glu (mmol/L):</label>
                                <InputText id="glu" {...register("glu")} />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="lac">Lac (mmol/L):</label>
                                <InputText id="lac" {...register("lac")} />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="bun">BUN (mg/dL):</label>
                                <InputText id="bun" {...register("bun")} />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="urea">Urea (mmol/L):</label>
                                <InputText id="urea" {...register("urea")} />
                            </div>
                            <div className="p-field p-col-12 p-md-6">
                                <label htmlFor="crea">Crea (mmol/L):</label>
                                <InputText id="crea" {...register("crea")} />
                            </div>
                        </div>
                    </Fieldset>
                    </div> 

         <div className="form-question" style={{ padding: '3px' }}>
         <Checkbox inputId="confirmPictures" {...register("confirmPictures", { required: "This field is required." })} />
         <label htmlFor="confirmPictures">I confirm that the pictures of the epoc data have been labelled and uploaded on the website</label>
         {errors.confirmPictures && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}  
         </div>

         <div className="form-question" style={{ padding: '3px' }}>
         <Checkbox inputId="confirmEntry" {...register("confirmPictures", { required: "This field is required." })} />
         <label htmlFor="confirmEntry">I confirm that data entry has been done accurately</label>
         {errors.confirmEntry && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}  
         </div>


         <div className="p-field form-question " style={{padding: "3px"}} >
          <label htmlFor="deviations" >Are there any deviations from the protocol when obtaining the epoc results? </label>
          <div className="p-col">
               <InputTextarea id="deviations" {...register("deviations")}  autoResize />
          </div>
        </div>

        <div className="p-field form-question " style={{padding: "3px"}} >
          <label htmlFor="comments" >Do you have any comments? </label>
          <div className="p-col">
               <InputTextarea id="comments" {...register("comments")}  autoResize />
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

export default EpocForm