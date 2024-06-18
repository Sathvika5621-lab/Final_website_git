import React, { useState } from 'react';
import { useForm,Controller } from "react-hook-form";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { RadioButton } from "primereact/radiobutton";
import { ScrollPanel } from 'primereact/scrollpanel';   
import { InputTextarea } from 'primereact/inputtextarea';
import { Fieldset } from 'primereact/fieldset';
import "../styles.css";
import "../Formstyle.css";



function SyringePrepTThree() {
    const {control, register, handleSubmit, formState: { errors }, setValue, watch} = useForm({
         defaultValues: {
            dissolvedontime: '',
            syringestorage:''
         }
    });
    const onSubmit = (data) => {
        console.log(data);
    };

   const selectedantibiotic = watch ('antibiotic')
   const selectedbuprenorphinedilution = watch ('buprenorphinedilution')
   const selectedimipenemdilution = watch ('imipenemdilution')
   const selecteddissolvedontime = watch ('dissolvedontime')

  const onAntibioticChange = (value) =>
  {
    setValue('antibiotic', value);
    if(value != "Other"){
        setValue('otherAntibiotic', "")
    }
  };
   
  const onBuprenorphineDilutionChange = (value) =>
  {
    setValue('buprenorphinedilution', value);
    if(value != "Other"){
        setValue('otherBuprenorphineDilution', "")
    }
  };

 const onImipenemDilutionChange = (value) =>
 {
    setValue('imipenemdilution', value); 
    if(value != "Other"){
        setValue('otherImipenemDilution', "")
    }
 };

 const onDissolvedOnTimeChange = (value) => {
     setValue ('dissolvedontime', value);
     if (value !== "Yes, there was a time gap") {
        setValue('syringestorage', '');
     }
 }
  

  return (
    <div className = "Headings">
  <div className="body-content" style={{padding:'5px'}}>
  <ScrollPanel style={{width : '100%', height: '1000px'}}>
  <Fieldset legend= "SYRINGE PREP" className="fieldset-legend">
  <form onSubmit={handleSubmit(onSubmit)} className='p-formgrid p-grid'>
  <div className="form-question" style={{ padding: '3px' }}>
          <label>What is the concentration of the original buprenorphine stock? </label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("concentration", { required: "This field is required." })} />
          {errors.concentration && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
  </div>

  <div  className = "form-question" style={{ padding: '3px' }}>
          <label>What was used as the antibiotic for the study?</label>
          <div className="radio-option">
            <RadioButton
              inputId="imipenem"
              name="antibiotic"
              value="Imipenem-cilastatin (500mg) vial provided by Ottawa site"
              {...register("antibiotic", { required: "This field is required." })}
              checked={selectedantibiotic === "Imipenem-cilastatin (500mg) vial provided by Ottawa site"}
              onChange={() => onAntibioticChange("Imipenem-cilastatin (500mg) vial provided by Ottawa site")}
            />
            <label htmlFor="antibiotic" className="p-radiobutton-label">Imipenem-cilastatin (500mg) vial provided by Ottawa site</label>
          </div>
       
          <div className="radio-option">
            <RadioButton
              inputId="other"
              name="antibiotic"
              value="Other"
              {...register("antibiotic", { required: "This field is required." })}
              checked={selectedantibiotic === "Other"}
              onChange={() => onAntibioticChange("Other")}
            />
            <label htmlFor="other" className="p-radiobutton-label">Other:</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectedantibiotic === "Other" && (
            <InputText 
            {...register('otherAntibiotic ', {required:"This field is required."})}
            id="otherAntibiotic"
            placeholder="Specify...."
          />
          )}
          </div>
          {errors.antibiotic && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.otherAntibiotic && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>To what concentration was the buprenorphine diluted to by using ringer's lactate?</label>
          <div className="radio-option">
            <RadioButton
              inputId="0.03mgperml"
              name="buprenorphinedilution"
              value="0.03 mg/mL"
              {...register("buprenorphinedilution", { required: "This field is required." })}
              checked={selectedbuprenorphinedilution === "0.03 mg/mL"}
              onChange={() => onBuprenorphineDilutionChange("0.03 mg/mL")}
            />
            <label htmlFor="buprenorphinedilution" className="p-radiobutton-label">0.03 mg/mL</label>
          </div>
       
          <div className="radio-option">
            <RadioButton
              inputId="other"
              name="buprenorphinedilution"
              value="Other"
              {...register("buprenorphinedilution", { required: "This field is required." })}
              checked={selectedbuprenorphinedilution === "Other"}
              onChange={() => onBuprenorphineDilutionChange("Other")}
            />
            <label htmlFor="other" className="p-radiobutton-label">Other:</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectedbuprenorphinedilution === "Other" && (
            <InputText 
            {...register('otherBuprenorphineDilution ', {required:"This field is required."})}
            id="otherBuprenorphineDilution"
            placeholder="Specify...."
          />
          )}
          </div>
          {errors.buprenorphinedilution && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.otherBuprenorphineDilution && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>


        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>To what concentration was the imipenem-cilastatin diluted to by using sterile ringer's lactate?</label>
          <div className="radio-option">
            <RadioButton
              inputId="5mgperml "
              name="imipenemdilution"
              value="5 mg/mL"
              {...register("imipenemdilution", { required: "This field is required." })}
              checked={selectedimipenemdilution === "5 mg/mL"}
              onChange={() => onImipenemDilutionChange("5 mg/mL")}
            />
            <label htmlFor="imipenemdilution" className="p-radiobutton-label">5 mg/mL</label>
          </div>
       
          <div className="radio-option">
            <RadioButton
              inputId="other"
              name="imipenemdilution"
              value="Other"
              {...register("imipenemdilution", { required: "This field is required." })}
              checked={selectedimipenemdilution === "Other"}
              onChange={() => onImipenemDilutionChange("Other")}
            />
            <label htmlFor="other" className="p-radiobutton-label">Other:</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectedimipenemdilution === "Other" && (
            <InputText 
            {...register('otherImipenemDilution ', {required:"This field is required."})}
            id="otherImipenemDilution"
            placeholder="Specify...."
          />
          )}
          </div>
          {errors.imipenemdilution && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.otherImipenemDilution && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div className="form-question" style={{ padding: '3px' }}>
          <label htmlFor='antibioticResuspendedTime'>What time was the antibiotic resuspended? (Military time) </label>
          <input type = "time" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("antibioticResuspendedTime", { required: "This field is required." })} />
          {errors.antibioticResuspendedTime && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
         </div>

         <div className="form-question" style={{ padding: '3px' }}>
          <label htmlFor='firstInjectionTime'>What time was the first planned fecal slurry/vehicle injection? </label>
          <input type = "time" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("firstInjectionTime", { required: "This field is required." })} />
          {errors.firstInjectionTime && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
         </div>

         <div className="form-question" style={{ padding: '3px' }}>
          <label htmlFor='lastInjectionTime'>What time was the last planned fecal slurry/vehicle injection? </label>
          <input type = "time" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("lastInjectionTime", { required: "This field is required." })} />
          {errors.lastInjectionTime && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
         </div>          

          <div className="form-question" style={{ padding: '3px'}}>
          <Checkbox inputId="confirmDissolution" {...register("confirmDissolution", { required: " This field is required." })} />
           <label htmlFor="confirmDissolution"> I confirm complete dissolution of the resuspended and diluted antibiotic (5mg/mL) with no observable particles at the bottom of the container</label>
           {errors.confirmDissolution && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          </div>

          <div className="form-question" style={{ padding: '3px'}}>
          <Checkbox inputId="confirmPreparation" {...register("confirmPreparation", { required: " This field is required." })} />
           <label htmlFor="confirmPreparation"> I confirm that antibiotic solution was prepared on the day of the experiment</label>
           {errors.confirmPreparation && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          </div>

          <div className="form-question" style={{ padding : '3px'}}>
          <div className="radio-option">
          <label>Has the antibiotic been dissolved in ringer's lactate less than 4 hours before the LAST scheduled mouse injection at T=4? </label>
          <RadioButton
                  inputId="dissolved"
                  name="dissolvedontime"
                  value="Yes, there was a time gap"
                  {...register("dissolvedontime", { required: "This field is required." })}
                  checked={selecteddissolvedontime === "Yes, there was a time gap"}
                  onChange={() => onDissolvedOnTimeChange ("Yes, there was a time gap")}
                />
                <label htmlFor="dissolved" className="p-radiobutton-label" >Yes, there was a time gap of less than 4h between the dissolution of the imipenem-cilastatin and the last scheduled mouse injection at T=4h</label> 
          </div>

          <div className='radio-option'>
          <RadioButton
                inputId='notdissolved'
                name= "dissolvedontime"
                value ="No, there was no time gap"
                {...register("dissolvedontime", {required: "This field is required."})}
                checked={selecteddissolvedontime === "No, there was no time gap"}
                onChange={() => onDissolvedOnTimeChange ("No, there was no time gap")}
              />
              <label htmlFor="notdissolved" className="p-radiobutton-label">No, the time between the dissolution of antibiotic and last scheduled mouse injection at T=4, was more than 4 hours</label>
          </div>
          {errors.dissolvedontime && <p style={{ color: 'red' , marginTop: '0', marginBottom: '0'}}>*This field is required</p>}
          </div>

          {selecteddissolvedontime === "Yes, there was a time gap" && (
            <div className='form-question'>
                <label>If yes, where were the syringes kept before injection took place? </label>
                <div className='radio-option'>
                   <RadioButton 
                      inputId = "roomTemperature"
                      name = "syringestorage"
                      value = "At room temperature"
                      {...register("syringeStorage", { required: "This field is required." })}
                      />
                    <label htmlFor= "roomTemperature" className="p-radiobutton-label">At room temperature</label>
                </div>
                
                <div className='radio-option'>
                    <RadioButton 
                        inputId='at4C'
                        name = "syringestorage"
                        value = "At 4°C"
                        {...register("syringeStorage", { required: "This field is required." })}
                    />
                    <label htmlFor= "roomTemperature" className="p-radiobutton-label">At 4°C</label>
                </div>
                {errors.syringestorage && <p style={{ color: 'red' , marginTop: '0', marginBottom: '0'}}>*This field is required</p>}
            </div>
          )}

        <div className="p-field form-question " style={{padding: "3px"}} >
          <label htmlFor="deviations" >Were there any deviations from the protocol when preparing the syringes? </label>
          <div className="p-col">
               <InputTextarea id="deviations" {...register("deviations")}  autoResize />
          </div>
        </div>

        <div className="p-field form-question " style={{padding: "3px"}} >
          <label htmlFor="comments" >Are there any other comments that need to be recorded? </label>
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

export default SyringePrepTThree