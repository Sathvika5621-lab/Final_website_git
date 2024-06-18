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
import Header from "../Header";
import "../styles.css";
import "../Formstyle.css";
// import "./globalstyles.css";

function InductionForm() {
 const {control, register, handleSubmit, formState: { errors }, setValue, watch} = useForm();
 const selectedanesthesia = watch ('anesthesia')
 const selectedMassageDone = watch ('massagedone')
 const selectedInjectionSite = watch ('injectionsite')
 const selectedInductionObservation = watch ('inductionobservation')
 const selectedInjectionStaggeringDone = watch ('staggeringdone')
 const selectedNeedleColor = watch ('needlecolor')
 const selectedMousePlacement = watch ('mouseplacement')
 const selectedCageTemperature = watch ('cagetemperature')

 const onSubmit = (data) =>
 {
   console.log(data);
 };
 
 const onAnesthesiaChange = (value) =>
 {
    setValue('anesthesia', value);
 };

 const onMassageDoneChange = (value) =>
 {
    setValue('massagedone', value);
 };

 const onInjectionSiteChange = (value) =>
 {
    setValue('injectionsite', value);
 };
 
 const onInductionObservationChange = (value) =>
 {
    setValue('inductionobservation', value);
 };
 
 const onInjectionStaggeringDoneChange = (value) =>
 {
    setValue('staggeringdone', value);
    if (value != "Yes"){
        setValue ("staggeringtimedifference", "")
    }
 }; 

 const onNeedleColorChange = (value) =>
 {
   setValue("needlecolor", value);
   if(value != "Other"){
    setValue("otherNeedleColor", "")
   }
 };

const onMousePlacementChange = (value) =>
{
 setValue("mouseplacement", value);
 if(value != "Other"){
    setValue("otherMousePlacement", "")
 }
};

const onCageTemperatureChange = (value) =>
{
    setValue('cagetemperature', value);
};

 return (
    <div className="Headings">  
    {/* <Header userName='jane doe' className = "header" /> */}
    <div className="body-content" style={{padding:'5px'}}>
      <ScrollPanel style={{width : '100%', height: '1000px'}}>
        <Fieldset legend= "INDUCTION FORM" className="fieldset-legend">
           <form onSubmit={handleSubmit(onSubmit)} className='p-formgrid p-grid'>
           <div className="form-question" style={{ padding: '3px' }}>
          <label>Please enter the user ID of the HQP who prepared the syringes:</label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("syringeprepid", { required: "This field is required." })} />
          {errors.syringeprepid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
         </div>
         <div className = "form-question" style={{ padding: '3px' }}>
          <label>Please enter the user ID(s) of the HQP(s) who completed the wellness check at T-1: </label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("wellnesscheckid", { required: "This field is required." })} />
          {errors.wellnesscheckid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>Please enter the user ID of the HQP who injected the mouse at T = 0: </label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("injectedmiceid", { required: "This field is required." })} />
          {errors.injectedmiceid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>
        <div  className = "form-question" style={{ padding: '3px' }}>
          <label> Sepsis induction syringe number(This should be identical to the mouse number): </label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("syringenum", { required: "This field is required." })} />
          {errors.syringenum && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>


        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>1. Was the mouse anesthetized before the induction of the fecal slurry? </label>
          <div className="radio-option">
            <RadioButton
              inputId="isoflurane"
              name="anesthesia"
              value="Yes,mouse was anesthetized with 5% isoflurane as indicated in the SOP"
              {...register("anesthesia", { required: "This field is required." })}
              checked={selectedanesthesia === "Yes,mouse was anesthetized with 5% isoflurane as indicated in the SOP"}
              onChange={() => onAnesthesiaChange("Yes,mouse was anesthetized with 5% isoflurane as indicated in the SOP")}
            />
            <label htmlFor="anesthesia" className="p-radiobutton-label">Yes,mouse was anesthetized with 5% isoflurane as indicated in the SOP.</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="otherthanisoflurane"
              name="anesthesia"
              value="Yes, mouse anesthetized with another agent (other than isoflurane)"
              {...register("anesthesia", { required: "This field is required." })}
              checked={selectedanesthesia === "Yes, mouse anesthetized with another agent (other than isoflurane)"}
              onChange={() => onAnesthesiaChange("Yes, mouse anesthetized with another agent (other than isoflurane)")}
            />
            <label htmlFor="anesthesia" className="p-radiobutton-label">Yes, mouse anesthetized with another agent (other than isoflurane).</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="noanesthesia"
              name="anesthesia"
              value="No, mouse was not anesthetized before fecal slurry injection"
              {...register("anesthesia", { required: "This field is required." })}
              checked={selectedanesthesia === "No, mouse was not anesthetized before fecal slurry injection"}
              onChange={() => onAnesthesiaChange("No, mouse was not anesthetized before fecal slurry injection")}
            />
            <label htmlFor="anesthesia" className="p-radiobutton-label">No, mouse was not anesthetized before fecal slurry injection</label>
          </div>
          
          {errors.anesthesia && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>2. Was the abdomen massaged after injection of the fecal slurry? </label>
          <div className="radio-option">
            <RadioButton
              inputId="massageisdone"
              name="massagedone"
              value="Yes, for approximately 10 seconds"
              {...register("massagedone", { required: "This field is required." })}
              checked={selectedMassageDone === "Yes, for approximately 10 seconds"}
              onChange={() => onMassageDoneChange("Yes, for approximately 10 seconds")}
            />
            <label htmlFor="massagedone" className="p-radiobutton-label">Yes, for approximately 10 seconds</label>
          </div>
        
          <div className="radio-option">
            <RadioButton
              inputId="nomassage"
              name="massagedone"
              value="No, abdomen was not massaged after fecal slurry injection"
              {...register("massagedone", { required: "This field is required." })}
              checked={selectedMassageDone === "No, abdomen was not massaged after fecal slurry injection"}
              onChange={() => onMassageDoneChange("No, abdomen was not massaged after fecal slurry injection")}
            />
            <label htmlFor="massagedone" className="p-radiobutton-label">No, abdomen was not massaged after fecal slurry injection</label>
          </div>
         
          {errors.massagedone && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>3. Time of sepsis induction (injection of fecal slurry)? (Military time) </label>
          <input type = "time" {...register("sepsisinductiontime", { required: "This field is required." })} />
          {errors.sepsisinductiontime && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        
        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>4. Was the injection administered into the intra-peritoneal(IP) cavity or was it a subcutaneous(SC) injection? </label>
          <div className="radio-option">
            <RadioButton
              inputId="peritonealcavity"
              name="injectionsite"
              value="Peritoneal cavity injection – with no observed leakages/skin bulge"
              {...register("injectionsite", { required: "This field is required." })}
              checked={selectedInjectionSite === "Peritoneal cavity injection – with no observed leakages/skin bulge"}
              onChange={() => onInjectionSiteChange("Peritoneal cavity injection – with no observed leakages/skin bulge")}
            />
            <label htmlFor="injectionsite" className="p-radiobutton-label">Peritoneal cavity injection – with no observed leakages/skin bulge</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="subcutaneousinjection"
              name="injectionsite"
              value="Subcutaneous injection – A noticeable bulge was observed post-injection"
              {...register("injectionsite", { required: "This field is required." })}
              checked={selectedInjectionSite === "Subcutaneous injection – A noticeable bulge was observed post-injection"}
              onChange={() => onInjectionSiteChange("Subcutaneous injection – A noticeable bulge was observed post-injection")}
            />
            <label htmlFor="injectionsite" className="p-radiobutton-label">Subcutaneous injection – A noticeable bulge was observed post-injection</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="partialsubcutaneousinjection"
              name="injectionsite"
              value="Partial subcutaneous injection – There might have been a partial subcutaneous injection, as evidenced by slight leakage or a skin bulge"
              {...register("injectionsite", { required: "This field is required." })}
              checked={selectedInjectionSite === "Partial subcutaneous injection – There might have been a partial subcutaneous injection, as evidenced by slight leakage or a skin bulge"}
              onChange={() => onInjectionSiteChange("Partial subcutaneous injection – There might have been a partial subcutaneous injection, as evidenced by slight leakage or a skin bulge")}
            />
            <label htmlFor="injectionsite" className="p-radiobutton-label">Partial subcutaneous injection – There might have been a partial subcutaneous injection, as evidenced by slight leakage or a skin bulge</label>
          </div>
          {errors.massagedone && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>5. When injecting fecal slurry into the peritoneal cavity and retracting the syringe plunger, what observations were made?</label>
          <div className="radio-option">
            <RadioButton
              inputId="blooddrawn"
              name="inductionobservation"
              value="Blood was drawn into the syringe "
              {...register("inductionobservation", { required: "This field is required." })}
              checked={selectedInductionObservation === "Blood was drawn into the syringe"}
              onChange={() => onInductionObservationChange("Blood was drawn into the syringe")}
            />
            <label htmlFor="inductionobservation" className="p-radiobutton-label">Blood was drawn into the syringe</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="fluiddrawn"
              name="inductionobservation"
              value="Fluid other than blood was drawn into the syringe"
              {...register("inductionobservation", { required: "This field is required." })}
              checked={selectedInductionObservation === "Fluid other than blood was drawn into the syringe"}
              onChange={() => onInductionObservationChange("Fluid other than blood was drawn into the syringe")}
            />
            <label htmlFor="inductionobservation" className="p-radiobutton-label">Fluid other than blood was drawn into the syringe</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="nofluid"
              name="inductionobservation"
              value="No fluid was drawn into the syringe"
              {...register("inductionobservation", { required: "This field is required." })}
              checked={selectedInductionObservation === "No fluid was drawn into the syringe"}
              onChange={() => onInductionObservationChange("No fluid was drawn into the syringe")}
            />
            <label htmlFor="inductionobservation" className="p-radiobutton-label">No fluid was drawn into the syringe</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="plungernotpulledback"
              name="inductionobservation"
              value="Plunger was not pulled back before injection"
              {...register("inductionobservation", { required: "This field is required." })}
              checked={selectedInductionObservation === "Plunger was not pulled back before injection"}
              onChange={() => onInductionObservationChange("Plunger was not pulled back before injection")}
            />
            <label htmlFor="inductionobservation" className="p-radiobutton-label">Plunger was not pulled back before injection</label>
          </div>
          {errors.inductionobservation && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>6. Were the mice injections staggered ?</label>
          <div className="radio-option">
            <RadioButton
              inputId="stagerred"
              name="staggeringdone"
              value="Yes"
              {...register("staggeringdone", { required: "This field is required." })}
              checked={selectedInjectionStaggeringDone === "Yes"}
              onChange={() => onInjectionStaggeringDoneChange("Yes")}
            />
            <label htmlFor="staggeringdone" className="p-radiobutton-label">Yes, injections were staggered</label>
          </div>
        
           <div style={{padding : '3px'}}>
             {selectedInjectionStaggeringDone === "Yes" && (
                    <>
                    <label>Please indicate how much time in between the next mouse injection : </label>
                    <InputText 
                    {...register('staggeringtimedifference', {required : "This field is required"})}
                    id = "staggeringtimedifference"
                    placeholder="Specify...." />
                    </>
             )}
           </div>
           {errors.staggeringtimedifference &&  <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          <div className="radio-option">
            <RadioButton
              inputId="nostagerring"
              name="staggeringdone"
              value="No, all mice were injected with fecal slurry at the same time one after each "
              {...register("staggeringdone", { required: "This field is required." })}
              checked={selectedInjectionStaggeringDone === "No, all mice were injected with fecal slurry at the same time one after each "}
              onChange={() => onInjectionStaggeringDoneChange("No, all mice were injected with fecal slurry at the same time one after each ")}
            />
            <label htmlFor="staggeringdone" className="p-radiobutton-label">No, all mice were injected with fecal slurry at the same time one after each </label>
          </div>
          
          {errors.staggeringdone && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          </div>
       
          <div  className = "form-question" style={{ padding: '3px' }}>
          <label>7. What is the color of the needle used for the injection(fecal slurry or dextrose-glycerol)?</label>
          <div className="radio-option">
            <RadioButton
              inputId="beige"
              name="needlecolor"
              value="Beige"
              {...register("needlecolor", { required: "This field is required." })}
              checked={selectedNeedleColor === "Beige"}
              onChange={() => onNeedleColorChange("Beige")}
            />
            <label htmlFor="Beige" className="p-radiobutton-label">Beige</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="clear"
              name="needlecolor"
              value="Clear"
              {...register("needlecolor", { required: "This field is required." })}
              checked={selectedNeedleColor === "Clear"}
              onChange={() => onNeedleColorChange("Clear")}
            />
            <label htmlFor="clear" className="p-radiobutton-label">Clear</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="other"
              name="needlecolor"
              value="Other"
              {...register("needlecolor", { required: "This field is required." })}
              checked={selectedNeedleColor === "Other"}
              onChange={() => onNeedleColorChange("Other")}
            />
            <label htmlFor="other" className="p-radiobutton-label">Other:</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectedNeedleColor === "Other" && (
            <InputText 
            {...register('otherNeedleColor ', {required:"This field is required."})}
            id="otherNeedleColor"
            placeholder="Specify...."
          />
          )}
          </div>
          {errors.needlecolor && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.otherNeedleColor && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>
          
        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>8. After the injection of fecal slurry, where was the mouse placed?</label>
          <div className="radio-option">
            <RadioButton
              inputId="standardcage"
              name="mouseplacement"
              value="standardcage"
              {...register("mouseplacement", { required: "This field is required." })}
              checked={selectedMousePlacement === "standardcage"}
              onChange={() => onMousePlacementChange("standardcage")}
            />
            <label htmlFor="standardcage" className="p-radiobutton-label">The mouse was housed in a clean standard cage (shoe box, non-ventilated) with similar bedding and housing materials from the original cage, excluding the cardboard hut</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="originalcage"
              name="mouseplacement"
              value="originalcage"
              {...register("mouseplacement", { required: "This field is required." })}
              checked={selectedMousePlacement === "originalcage"}
              onChange={() => onMousePlacementChange("originalcage")}
            />
            <label htmlFor="originalcage" className="p-radiobutton-label">Mouse was returned to its original (ventilated) cage</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="other"
              name="mouseplacement"
              value="Other"
              {...register("mouseplacement", { required: "This field is required." })}
              checked={selectedMousePlacement === "Other"}
              onChange={() => onMousePlacementChange("Other")}
            />
            <label htmlFor="other" className="p-radiobutton-label">Other:</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectedMousePlacement === "Other" && (
            <InputText 
            {...register('otherMousePlacement ', {required:"This field is required."})}
            id="otherMousePlacement"
            placeholder="Specify...."
          />
          )}
          </div>
          {errors.mouseplacement && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.otherMousePlacement && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div  className = "form-question " style={{ padding: '3px' }}>
          <label>9. Was the cage maintained at a warm temperature after induction?</label>
          <div className="radio-option">
            <RadioButton
              inputId="Yes"
              name="cagetemperature"
              value="Yes"
              {...register("cagetemperature", { required: "This field is required." })}
              checked={selectedCageTemperature === "Yes"}
              onChange={() => onCageTemperatureChange("Yes")}
            />
            <label htmlFor="cagetemperature" className="p-radiobutton-label">Yes, half of the bottom of the cage was positioned on a warming blanket/pad attached to a circulating water bath.</label>
          </div>
        
          <div className="radio-option">
            <RadioButton
              inputId="No"
              name="cagetemperature"
              value="No "
              {...register("cagetemperature", { required: "This field is required." })}
              checked={selectedCageTemperature === "No"}
              onChange={() => onCageTemperatureChange("No")}
            />
            <label htmlFor="cagetemperature" className="p-radiobutton-label">No, the cage was left on the bench without external heating</label>
          </div>
          
          {errors.cagetemperature && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          </div>
          <div className="p-field form-question " style={{padding: "3px"}} >
          <label htmlFor="deviations" >Are there any other deviations to the protocol?</label>
          <div className="p-col">
               <InputTextarea id="deviations" {...register("deviations")}  autoResize />
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

export default InductionForm



