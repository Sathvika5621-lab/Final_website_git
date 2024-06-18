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
import Header from "../Header";
import "../styles.css";
import "../Formstyle.css";
// import "./globalstyles.css";


function BacterialCountInitial() {

  const {control, register, handleSubmit, formState: { errors }, setValue, watch} = useForm();
  
  const selectedAliquotsStorage = watch ('aliquotsstorage')
  const selectedAgarPlatesType = watch ('agarplatestype')
  const selectedPrepMethod= watch ('prepmethod')
  const selectedDilutionSolution = watch ('dilutionsolution')
  const selectedDilutionMethod = watch ('dilutionmethod')
  const selectedIncubatorType = watch('incubatortype')

  const onSubmit = (data) =>
    {
      console.log(data);
    };

  const OnAliquotsStorageChange = (value) =>
    {
       setValue('aliquotsstorage', value);
       if (value != "Yes"){
        setValue ("noofaliquots", "")
    }
    };
  
  const onAgarPlatesTypeChange = (value) =>
    {
      setValue('agarplatestype', value);
      if(value != "Other"){
        setValue("otheragarplatestype", "")
       }
    };

  const onPrepMethodChange = (value) =>
    {
      setValue('prepmethod', value);
      if(value != "Other"){
        setValue("otherprepmethod", "")
       }
    };

   const onDilutionSolutionChange = (value) =>
    {
      setValue('dilutionsolution', value);
      if(value != "Other"){
        setValue("otherdilutionsolution", "")
       }
    } ;

    const onDilutionMethodChange = (value) =>
      {
        setValue('dilutionmethod', value);
        if(value != "Other"){
          setValue("otherdilutionmethod", "")
         }
      };

      const onIncubatorTypeChange = (value) =>
        {
          setValue('incubatortype', value);
          if(value != "Other"){
            setValue("otherincubatortype", "")
           }
        };

  
  
  return (
    <div className = "Headings">
        <div className="body-content" style={{padding :'5px'}}>
           <ScrollPanel style={{width : '100%', height: '1000px'}}>
             <Fieldset legend = "Bacterial count form" className="fieldset-legend">
              <form onSubmit = {handleSubmit(onSubmit)} className = 'p-formgrid p-grid'>
              <div className="form-question" style={{ padding: '3px' }}>
              <label>Please enter the user ID of the HQP completing the data entry: </label>
              <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("dateentry", { required: "This field is required." })} />
               {errors.dataentry && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
               </div>
              
               <div className="form-question" style={{ padding: '3px' }}>
              <label>Please enter the user ID of the HQP that completed the "Culture Check" table: </label>
              <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("culturecheckhqp", { required: "This field is required." })} />
               {errors.culturecheckhqp && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
               </div>


               <div  className = "form-question" style={{ padding: '3px' }}>
          <label>1. Did you store the aliquots of whole peritoneal lavage fluid (PLF) for this mouse subject before centrifugation? </label>
          <div className="radio-option">
            <RadioButton
              inputId="yes"
              name="aliquotsstorage"
              value="Yes"
              {...register("aliquotsstorage", { required: "This field is required." })}
              checked={selectedAliquotsStorage === "Yes"}
              onChange={() => OnAliquotsStorageChange("Yes")}
            />
            <label htmlFor="aliquotsstorage" className="p-radiobutton-label">Yes, whole PLF samples were collected, frozen in liquid nitrogen, and stored at -80c for future use.</label>
          </div>
          <div style={{padding : '3px'}}>
             {selectedAliquotsStorage === "Yes" && (
                    <>
                    <label>How many aliquots : </label>
                    <InputText 
                    {...register('noofaliquots', {required : "This field is required"})}
                    id = "noofaliquots"
                    placeholder="Specify...." />
                    </>
             )}
           </div>
           {errors.noofaliquots &&  <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          
          <div className="radio-option">
            <RadioButton
              inputId="No"
              name="aliquotsstorage"
              value="No"
              {...register("aliquotsstorage", { required: "This field is required." })}
              checked={selectedAliquotsStorage === "No"}
              onChange={() => OnAliquotsStorageChange("No")}
            />
            <label htmlFor="aliquotsstorage" className="p-radiobutton-label">No, mouse was not anesthetized before fecal slurry injection</label>
          </div>
          
          {errors.aliquotsstorage && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>



        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>2.Which type of blood agar plates was utilized ?</label>
          <div className="radio-option">
            <RadioButton
              inputId="sop"
              name="agarplatestype"
              value="Sop"
              {...register("agarplatestype", { required: "This field is required." })}
              checked={selectedAgarPlatesType === "Sop"}
              onChange={() => onAgarPlatesTypeChange("Sop")}
            />
            <label htmlFor="sop" className="p-radiobutton-label">Procured the blood agar plates following the SOP guidelines</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="independent"
              name="agarplatestype"
              value="Indendent"
              {...register("agarplatestype", { required: "This field is required." })}
              checked={selectedAgarPlatesType === "Independent"}
              onChange={() => onAgarPlatesTypeChange("Independent")}
            />
            <label htmlFor="independent" className="p-radiobutton-label">Independently prepared blood agar plates in the laboratory</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="other"
              name="agarplatestype"
              value="Other"
              {...register("agarplatestype", { required: "This field is required." })}
              checked={selectedAgarPlatesType === "Other"}
              onChange={() => onAgarPlatesTypeChange("Other")}
            />
            <label htmlFor="other" className="p-radiobutton-label">Other:</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectedAgarPlatesType === "Other" && (
            <InputText 
            {...register('otheragarplatestype ', {required:"This field is required."})}
            id="otheragarplatestype"
            placeholder="Specify...."
          />
          )}
          </div>
          {errors.agarplatestype && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.otheragarplatestype && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>
          

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>3. Where was the preparation of dilutions and loading of samples for bacterial culturing conducted? </label>
          <div className="radio-option">
            <RadioButton
              inputId="bsc"
              name="prepmethod"
              value="BSC"
              {...register("prepmethod", { required: "This field is required." })}
              checked={selectedPrepMethod === "BSC"}
              onChange={() => onPrepMethodChange("BSC")}
            />
            <label htmlFor="bsc" className="p-radiobutton-label">Biosafety cabinet (BSC)</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="fumehood"
              name="prepmethod"
              value="Fume hood"
              {...register("prepmethod", { required: "This field is required." })}
              checked={selectedPrepMethod === "Fume hood"}
              onChange={() => onPrepMethodChange("Fume hood")}
            />
            <label htmlFor="fumehood" className="p-radiobutton-label">Fume hood</label>
          </div>


          <div className="radio-option">
            <RadioButton
              inputId="benchsurface"
              name="prepmethod"
              value="Bench surface"
              {...register("prepmethod", { required: "This field is required." })}
              checked={selectedPrepMethod === "Bench surface"}
              onChange={() => onPrepMethodChange("Bench surface")}
            />
            <label htmlFor="benchsurface" className="p-radiobutton-label">Bench surface</label>
          </div>


          <div className="radio-option">
            <RadioButton
              inputId="other"
              name="prepmethod"
              value="Other"
              {...register("prepmethod", { required: "This field is required." })}
              checked={selectedPrepMethod === "Other"}
              onChange={() => onPrepMethodChange("Other")}
            />
            <label htmlFor="other" className="p-radiobutton-label">Other:</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectedPrepMethod === "Other" && (
            <InputText 
            {...register('otherprepmethod ', {required:"This field is required."})}
            id="otherprepmethod"
            placeholder="Specify...."
          />
          )}
          </div>
          {errors.prepmethod && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.otherprepmethod && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>
          


        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>4. What was used to dilute the whole blood and whole PLF for bacterial culturing experiment?</label>
          <div className="radio-option">
            <RadioButton
              inputId="sterile1xpbs"
              name="dilutionsolution"
              value="Sterile 1XPBS"
              {...register("dilutionsolution", { required: "This field is required." })}
              checked={selectedDilutionSolution === "Sterile 1XPBS"}
              onChange={() => onDilutionSolutionChange("Sterile 1XPBS")}
            />
            <label htmlFor="sterile1xpbs" className="p-radiobutton-label">Sterile 1XPBS</label>
          </div>
          
          <div className="radio-option">
            <RadioButton
              inputId="other"
              name="dilutionsolution"
              value="Other"
              {...register("dilutionsolution", { required: "This field is required." })}
              checked={selectedDilutionSolution === "Other"}
              onChange={() => onDilutionSolutionChange("Other")}
            />
            <label htmlFor="other" className="p-radiobutton-label">Other:</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectedDilutionSolution === "Other" && (
            <InputText 
            {...register('otherdilutionsolution ', {required:"This field is required."})}
            id="otherdilutionsolution"
            placeholder="Specify...."
          />
          )}
          </div>
          {errors.dilutionsolution && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.otherdilutionsolution && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>



        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>5. How were the sample dilutions placed? </label>
          <div className="radio-option">
            <RadioButton
              inputId="10ultriplicates"
              name="dilutionmethod"
              value="10ul Triplicates"
              {...register("dilutionsolution", { required: "This field is required." })}
              checked={selectedDilutionMethod === "10ul Triplicates"}
              onChange={() => onDilutionMethodChange("10ul Triplicates")}
            />
            <label htmlFor="10ultriplicates" className="p-radiobutton-label">In 10ul Triplicates, within their labelled area</label>
          </div>
          
          <div className="radio-option">
            <RadioButton
              inputId="other"
              name="dilutionmethod"
              value="Other"
              {...register("dilutionmethod", { required: "This field is required." })}
              checked={selectedDilutionMethod === "Other"}
              onChange={() => onDilutionMethodChange("Other")}
            />
            <label htmlFor="other" className="p-radiobutton-label">Other:</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectedDilutionMethod === "Other" && (
            <InputText 
            {...register('otherdilutionmethod ', {required:"This field is required."})}
            id="otherdilutionmethod"
            placeholder="Specify...."
          />
          )}
          </div>
          {errors.dilutionmethod && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.otherdilutionmethod && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>6. What type of incubator was used for culturing plates?</label>
          <div className="radio-option">
            <RadioButton
              inputId="microbiologicalincubators"
              name="incubatortype"
              value="Microbiological Incubators"
              {...register("incubatortype", { required: "This field is required." })}
              checked={selectedIncubatorType === "Microbiological Incubators"}
              onChange={() => onIncubatorTypeChange("Microbiological Incubators")}
            />
            <label htmlFor="microbiologicalincubators" className="p-radiobutton-label">Microbiological Incubators</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="laboven"
              name="incubatortype"
              value="Lab oven"
              {...register("incubatortype", { required: "This field is required." })}
              checked={selectedIncubatorType === "Lab oven"}
              onChange={() => onIncubatorTypeChange("Lab oven")}
            />
            <label htmlFor="laboven" className="p-radiobutton-label">Lab oven</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="other"
              name="incubatortype"
              value="Other"
              {...register("incubatortype", { required: "This field is required." })}
              checked={selectedIncubatorType === "Other"}
              onChange={() => onIncubatorTypeChange("Other")}
            />
            <label htmlFor="other" className="p-radiobutton-label">Other:</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectedIncubatorType === "Other" && (
            <InputText 
            {...register('otherincubatortype ', {required:"This field is required."})}
            id="otherincubatortype"
            placeholder="Specify...."
          />
          )}
          </div>
          {errors.incubatortype && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.otherincubatortype && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>7. What time was the blood agar plate placed in the incubator?(Military time) </label>
          <input type = "time" {...register("bloodagartime", { required: "This field is required." })} />
          {errors.bloodagartime && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>



        <div className="form-question" style={{ padding: '3px' }}>
              <label>8. At what temperature was the incubator set?(°C)</label>
              <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("incubatortemperature", { required: "This field is required." })} />
               {errors.incubatortemperature && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
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
export default BacterialCountInitial