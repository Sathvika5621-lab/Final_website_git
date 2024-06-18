import React, { useState, useEffect }from 'react'
import { useForm } from "react-hook-form";

import { Fieldset } from 'primereact/fieldset';
import { Button } from "primereact/button";
import { Panel } from 'primereact/panel';
import { Calendar } from 'primereact/calendar';
import { RadioButton } from "primereact/radiobutton";
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import "../styles.css";
import "../Formstyle.css";

function IttForm() {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const selectedsite = watch ('experimentsite')
  const selectedsexofmice = watch ('sexofmice')
  const selectedexclusioncriteria = watch ('exclusioncriteria')
  const selectedremovedfromstudy = watch ('removedfromstudy')
  const selectedsplitintocage = watch ('splitintocage')
  const selectednoofmiceincage = watch ('noofmiceincage')


  const onSiteChange = (value) =>
  {
     setValue('experimentsite', value);
  };
 
  const onSexOfMiceChange = (value) =>
  {
    setValue ('sexofmice', value);
  }
  
  const onExclusionCriteriaChange = (value) =>
  {
     setValue('exclusioncriteria', value);
     if (value != "Yes"){
         setValue ("exclusioncriteria", "")
     }
  }; 

  const onRemovedFromStudyChange = (value) =>
  {
    setValue ('removedfromstudy', value);
  }

  const onSplitIntoCageChange = (value) =>
  {
    setValue ( 'splitintocage', value);
  }

  const onNoOfMiceInCageChange = (value) =>
  {
    setValue ('noofmiceincage', value);
  }
  
  const onSubmit = data => console.log(data);
 

  return (
    <div className = "form-container">
      <div className="body-content" style={{padding:'5px'}}>
        
        <Fieldset legend= "ITT Form" className="fieldset-legend custom-panel-fieldset">  
        <Panel header="For any inquiries please contact Dr.Forough Jahandideh at fjahandideh@ohri.ca"  toggleable className='custom-panel-fieldset' >
         <h3 style={{marginTop:'0', marginBottom:'0'}}>Instructions: </h3>
         <ul style={{marginTop:'0', marginBottom:'0'}}>
            1) Print and complete the “ITT Check” form. This form should be filled 48 hours prior to experiment day.
        </ul>
        <ul style={{marginTop:'0', marginBottom:'0'}}>
            2) Use the answers of the “ITT Check” table to answer the questions below and upload a picture or scan a copy of the referenced filled table within 24 hours.
       </ul>
      </Panel>
         <form onSubmit={handleSubmit(onSubmit)} className='p-formgrid p-grid' style = {{padding : '10px' }}>
         <div className="form-question" style={{ padding: '5px' }}> 
         <label>Please enter the user ID of the HQP completing the data entry : </label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("syringeprepid", { required: "This field is required." })} />
          {errors.dataentryitt && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
         </div>

         <div className = "form-question" style={{ padding: '3px' }}>
          <label>Please enter the user ID of the HQP that completed the "ITT Check" table : </label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("wellnesscheckid", { required: "This field is required." })} />
          {errors.ittcheck && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>
  
        <div className="form-question" style={{ padding: '3px' }}>
            <label> Please select a site : </label>
            <div className="radio-option">
            <RadioButton
              inputId="Ottawa"
              name="experimentsite"
              value="Ottawa"
              {...register("experimentsite", { required: "This field is required." })}
              checked={selectedsite === "Ottawa"}
              onChange={() => onSiteChange("Ottawa")}
            />
            <label htmlFor="experimentsite" className="p-radiobutton-label">Ottawa</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="McMaster"
              name="experimentsite"
              value="McMaster"
              {...register("experimentsite", { required: "This field is required." })}
              checked={selectedsite === "McMaster"}
              onChange={() => onSiteChange("McMaster")}
            />
            <label htmlFor="experimentsite" className="p-radiobutton-label">McMaster</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="Western"
              name="experimentsite"
              value="Western"
              {...register("experimentsite", { required: "This field is required." })}
              checked={selectedsite === "Western"}
              onChange={() => onSiteChange("Western")}
            />
            <label htmlFor="experimentsite" className="p-radiobutton-label">Western</label>
          </div>

          <div className="radio-option">
            <RadioButton
              inputId="Manitoba"
              name="experimentsite"
              value="Manitoba"
              {...register("experimentsite", { required: "This field is required." })}
              checked={selectedsite === "Manitoba"}
              onChange={() => onSiteChange("  Manitoba")}
            />
            <label htmlFor="experimentsite" className="p-radiobutton-label">Manitoba </label>
          </div>
          
          <div className="radio-option">
            <RadioButton
              inputId="Alberta"
              name="experimentsite"
              value="Alberta"
              {...register("experimentsite", { required: "This field is required." })}
              checked={selectedsite === "Alberta "}
              onChange={() => onSiteChange("Alberta")}
            />
            <label htmlFor="experimentsite" className="p-radiobutton-label">Alberta</label>
          </div>

          <div className="radio-option">
            <RadioButton
              inputId="Calgary "
              name="experimentsite"
              value="Calgary"
              {...register("experimentsite", { required: "This field is required." })}
              checked={selectedsite === "Calgary "}
              onChange={() => onSiteChange("Calgary")}
            />
            <label htmlFor="experimentsite" className="p-radiobutton-label">Calgary</label>
          </div>
          {errors.experimentsite && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>
        {/* <div className="form-question" style={{ padding: '3px' }}>
            <label htmlFor="plannedStudyDate"> Planned study date :</label>
            <Calendar
              id="plannedStudyDate"
              inputId="plannedStudyDate" // Ensure the inputId matches the id for proper label association
              dateFormat="yy-mm-dd"
              className="text-base surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
              {...register("plannedStudyDate", { required: "This field is required." })}
            />
            {errors.plannedStudyDate && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div> */}
  
        <div className="form-question" style={{ display: 'flex', justifyContent: 'space-between', padding: '3px' }}>
        <div style={{ display : 'flex', flex: '1', marginRight: '10px' , alignItems:'center'}}> {/* Adjust spacing as needed */}
                  <label htmlFor="fecalslurrydose" style={{ marginRight: '8px' }}>Fecal slurry dose (mg of slurry/g of mouse): </label>
                  <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("fecalslurrydose", { required: "This field is required." })} />
          {errors.fecalslurrydose && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>
        </div>

        <div className = "form-question" style={{ padding: '3px' }}>
          <label>How many mice will be used on the planned study date?  </label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("noofmice", { required: "This field is required." })} />
          {errors.noofmice && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div className = "form-question" style={{ padding: '3px' }}>
          <label>How many male mice will be used on the study date?  </label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("malemice", { required: "This field is required." })} />
          {errors.malemice && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div className = "form-question" style={{ padding: '3px' }}>
          <label>How many female mice will be used on the study date?  </label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("femalemice", { required: "This field is required." })} />
          {errors.femalemice && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div className = "form-question" style={{ padding: '3px' }}>
          <label>1. What is the biological sex of this mouse?</label>
          <div>
            <RadioButton
              inputId="male"
              name="sexofmice"
              value="Male"
              {...register("sexofmice", { required: "This field is required." })}
              checked={selectedsexofmice === "Male"}
              onChange={() => onSexOfMiceChange("Male")}
            />
            <label htmlFor="sexofmice" className="p-radiobutton-label">Male</label>
          </div>
          <div>
            <RadioButton
              inputId="female"
              name="sexofmice"
              value="Female"
              {...register("sexofmice", { required: "This field is required." })}
              checked={selectedsexofmice === "Female"}
              onChange={() => onSexOfMiceChange("Female")}
            />
            <label htmlFor="sexofmice" className="p-radiobutton-label">Female</label>
          </div>
          
          {errors.sexofmice && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          </div>

          <div className="form-question" style={{ padding: '3px' }}>
            <label htmlFor="dateofbirth"> 2. What is the date of birth (DOB) for this mouse? </label>
            <Calendar
              id="dateofbirth"
              inputId="dateofbirth" // Ensure the inputId matches the id for proper label association
              dateFormat="yy-mm-dd"
              className='custom-calendar'
              {...register("dateofbirth", { required: "This field is required." })}
            />
            {errors.dateofbirth && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>
  
        <div className = "form-question" style={{ padding: '3px' }}>
          <label>3. What is the cage ID of the cage this mouse is being held in?  </label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("cageid", { required: "This field is required." })} />
          {errors.cageid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>
    
        <div className="form-question" style={{ padding: '3px' }}>
            <label htmlFor="mousereceived">4. Date this mouse was received? </label>
            <Calendar
              id="mousereceived"
              inputId="mousereceived" // Ensure the inputId matches the id for proper label association
              dateFormat="yy-mm-dd"
              className='custom-calendar'
              {...register("mousereceived", { required: "This field is required." })}
            />
            {errors.mousereceived && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>
        
        <div className = "form-question" style={{ padding: '3px' }}>
         <label>5. Does this mouse meet the exclusion criteria for the study (BW &lt; 16g or &gt;30g, labored breathing, hind limb tremor, or other serious health concerns?)</label>
          <div className='radio-option'>
            <RadioButton
              inputId="yes"
              name="exclusioncriteria"
              value="Yes"
              {...register("exclusioncriteria", { required: "This field is required." })}
              checked={selectedexclusioncriteria === "Yes"}
              onChange={() => onExclusionCriteriaChange("Yes")}
            />
            <label htmlFor="exclusioncriteria" className="p-radiobutton-label">Yes</label>
          </div>
          
          <div style={{padding : '3px'}}>
             {selectedexclusioncriteria === "Yes" && (
                    <>
                    <label> Please explain why: </label>
                    <InputText 
                    {...register('exclusioncriteriamention', {required : "This field is required"})}
                    id = "exclusioncriteriamention"
                    placeholder="Specify...." />
                    </>
             )}
           </div>
           {errors.exclusioncriteriamention &&  <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          <div className='radio-option'>
            <RadioButton
              inputId="No"
              name="exclusioncriteria"
              value="No"
              {...register("exclusioncriteria", { required: "This field is required." })}
              checked={selectedexclusioncriteria === "Female"}
              onChange={() => onExclusionCriteriaChange("Female")}
            />
            <label htmlFor="exclusioncriteria" className="p-radiobutton-label"> No</label>
          </div>
          
          {errors.exclusioncriteria && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          </div>


          <div className = "form-question" style={{ padding: '3px' }}>
          <label>6. If the mouse met the exclusion criteria, was it removed from the study (sacrificed)? </label>
          <div className='radio-option'>
            <RadioButton
              inputId="yes"
              name="removedfromstudy"
              value="Yes"
              {...register("removedfromstudy", { required: "This field is required." })}
              checked={selectedremovedfromstudy === "Yes"}
              onChange={() => onRemovedFromStudyChange("Yes")}
            />
            <label htmlFor="removedfromstudy" className="p-radiobutton-label"> Yes</label>
          </div>
          <div className='radio-option'>
            <RadioButton
              inputId="no"
              name="removedfromstudy"
              value="No"
              {...register("removedfromstudy", { required: "This field is required." })}
              checked={selectedremovedfromstudy === "No"}
              onChange={() => onRemovedFromStudyChange("No")}
            />
            <label htmlFor="removedfromstudy" className="p-radiobutton-label"> No</label>
          </div>
          
          {errors.removedfromstudy && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          </div>

          <div className = "form-question" style={{ padding: '3px' }}>
          <label>7. Was this mouse split into new cag due to fighting? </label>
          <div className='radio-option'>
            <RadioButton
              inputId="yes"
              name="splitintocage"
              value="Yes"
              {...register("splitintocage", { required: "This field is required." })}
              checked={selectedsplitintocage === "Yes"}
              onChange={() => onSplitIntoCageChange("Yes")}
            />
            <label htmlFor="splitintocage" className="p-radiobutton-label"> Yes</label>
          </div>
          <div className='radio-option'>
            <RadioButton
              inputId="no"
              name="splitintocage"
              value="No"
              {...register("splitintocage", { required: "This field is required." })}
              checked={selectedsplitintocage === "No"}
              onChange={() => onSplitIntoCageChange("No")}
            />
            <label htmlFor="splitintocage" className="p-radiobutton-label"> No</label>
          </div>
          
          {errors.splitintocage && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          </div>

          <div className="form-question" style={{ padding: '3px' }}>
            <label htmlFor="cagesplitdate">8. Date the mouse was split into a new cage (single caged) </label>
            <Calendar
              id="cagesplitdate"
              inputId="cagesplitdate" // Ensure the inputId matches the id for proper label association
              dateFormat="yy-mm-dd"
              className='custom-calendar'
              {...register("cagesplitdate", { required: "This field is required." })}
            />
            {errors.cagesplitdate && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>9. How many mice are in the cage this mouse is held in? 
          </label>
          <div className="radio-option">
            <RadioButton
              inputId="two"
              name="noofmiceincage"
              value="Two"
              {...register("noofmiceincage", { required: "This field is required." })}
              checked={selectednoofmiceincage === "Two"}
              onChange={() => onNoOfMiceInCageChange("Two")}
            />
            <label htmlFor="noofmiceincage" className="p-radiobutton-label">Two </label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="three"
              name="noofmiceincage"
              value="Three"
              {...register("noofmiceincage", { required: "This field is required." })}
              checked={selectednoofmiceincage === "Three"}
              onChange={() => onNoOfMiceInCageChange("Three")}
            />
            <label htmlFor="noofmiceincage" className="p-radiobutton-label">Three </label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="other"
              name="noofmiceincage"
              value="Other"
              {...register("noofmiceincage", { required: "This field is required." })}
              checked={selectednoofmiceincage === "Other"}
              onChange={() => onNoOfMiceInCageChange("Other")}
            />
            <label htmlFor="other" className="p-radiobutton-label">Other:</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectednoofmiceincage === "Other" && (
            <InputText 
            {...register('noofmiceincage ', {required:"This field is required."})}
            id="othernoofmice"
            placeholder="Specify...."
          />
          )}
          </div>
          {errors.noofmiceincage && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.othernoofmice && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>


        <div className = "form-question" style={{padding:'3px'}}>
          <label>
            <input type="checkbox" {...register("communicatedwithcoordinator", { required: "This field is required." })} />
              I confirm that we have communicated with NPSP coordinator about our scheduled experiments
          </label>
          {errors.communicatedwithcoordinator && <p style={{ color: 'red' }}>{errors.communicatedwithcoordinator.message}</p>}
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
           
          
    </div>  
    </div>
  )
}

export default IttForm