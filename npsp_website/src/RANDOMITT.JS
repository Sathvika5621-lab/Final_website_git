import React, { useState, useEffect }from 'react'
import { useForm } from "react-hook-form";
import TextInput from '../InputComponents/TextInput';
import RadioButtonGroup from '../InputComponents/RadioButtonGroup';
import CalendarInput from '../InputComponents/CalendarInput';
import TextAreaInput from '../InputComponents/TextAreaInput';
import { Fieldset } from 'primereact/fieldset';
import { Button } from "primereact/button";
import "../styles.css";
import "../Formstyle.css";

function IttForm() {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const onSubmit = data => console.log(data);
  const [exclusionCriteria, setExclusionCriteria] = useState('');
  const [cageSplitDueToFighting, setCageSplitDueToFighting] = useState('');
  const [numberOfMiceInCage, setNumberOfMiceInCage] = useState('');
  const handleRadioButtonChange = (value, fieldName) => {
    setValue(fieldName, value);
    if (fieldName === 'exclusionCriteria') {
      setExclusionCriteria(value);
  } else if (fieldName === 'cageSplitDueToFighting') {
      setCageSplitDueToFighting(value);
  } else if (fieldName === 'numberOfMiceInCage') {
      setNumberOfMiceInCage(value);
  }

};

  return (
    <div className = "form-container">
      <div className="body-content" style={{padding:'5px'}}>
        <Fieldset legend= "INDUCTION FORM" className="fieldset-legend">     
        <form onSubmit={handleSubmit(onSubmit)} className='p-formgrid p-grid'>
        <div className="form-question" style={{ padding: '3px' }}>
         <TextInput className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
                        register={register}
                        name="dataEntryHQPId"
                        label="Please enter the User ID of HQP completing the data entry: "
                        required={true}
                        errors={errors}
                    />
          </div>
          <div className="form-question" style={{ padding: '3px' }}>
         <TextInput className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
                        register={register}
                        name="ITTcheckHQPid"
                        label="Please enter the userID of the HQP that completed the ITT Check table : " 
                        required={true}
                        errors={errors}
                    />
          </div>
          <div className="form-question" style={{ padding: '3px' }}>
            <label> Please select a site : </label>
          <RadioButtonGroup
                        options={[
                            { value: 'Ottawa', label: 'Ottawa' },
                            { value: 'McMaster', label: 'McMaster'}, 
                            { value: 'Western', label: 'Western'}, 
                            { value: 'Manitoba', label: 'Manitoba'}, 
                            { value: 'Alberta', label: 'Alberta'}, 
                            { value: 'Calgary', label: 'Calgary'}
                           ]}
                        register={register}
                        name="site"
                        errors={errors}
                        onChange={(value) => handleRadioButtonChange(value, "site")}
                       
                />
            </div>
            <div className="form-question " style={{ padding: '3px' }}>
            <CalendarInput
                register={register}
                name="studydate"
                label="Planned Study Date : "
                errors={errors} 
              />
              </div>

              <div className="form-question" style={{ display: 'flex', justifyContent: 'space-between', padding: '3px' }}>
                  <div style={{ display : 'flex', flex: '1', marginRight: '10px' , alignItems:'center'}}> {/* Adjust spacing as needed */}
                  <label htmlFor="fecalslurrydose" style={{ marginRight: '8px' }}>Fecal slurry dose (mg of slurry/g of mouse): </label>
                <TextInput
                   register={register}
                    name="fecalslurrydose"
                   required={true}
                  errors={errors}
                 />
              </div>

               <div style={{display : 'flex',  flex: '1', alignItems: 'center' }}>
               <label htmlFor="studyEndpoint" style={{ marginRight: '8px' }}>Study endpoint (hours):</label>
                <TextInput
                 register={register}
                  name="studyEndpoint"
                  required={true}
                   errors={errors}
                    />
                 </div>
              </div>
              <div className="form-question" style={{ padding: '3px' }}>
                <RadioButtonGroup
                options={[
                 { value: 'Pilot study', label: 'Pilot study' },
                 { value: 'Main study', label: 'Main study' }
                  ]}
                  register={register}
                  name="typeOfStudy"
                  label="Type of the study:"
                  errors={errors}
                  onChange={(value) => handleRadioButtonChange(value, "typeOfStudy")}
                  />
               </div>

               <div className="form-question" style={{ padding: '3px' }}>
                    <TextInput
                      register={register}
                      name="totalMice"
                      label="How many mice will be used on the planned study date?"
                      required={true}
                      errors={errors}
                    />
               </div>
               <div className="form-question" style={{ padding: '3px' }}>
                  <TextInput
                    register={register}
                    name="maleMice"
                    label="How many male mice will be used on the study date?"
                    required={true}
                    errors={errors}
                  />
                </div>

                <div className="form-question" style={{ padding: '3px' }}>
                    <TextInput
                      register={register}
                      name="femaleMice"
                      label="How many female mice will be used on the study date?"
                      required={true}
                      errors={errors}
                    />
                 </div>
                 <div className="form-question" style={{ padding: '3px' }}>
                    <RadioButtonGroup
                      options={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' }
                      ]}
                      register={register}
                      name="biologicalSex"
                      label="What is the biological sex of this mouse?"
                      errors={errors}
                      onChange={(value) => handleRadioButtonChange(value, "biologicalSex")}
                    />
                  </div>
                  <div className="form-question" style={{ padding: '3px' }}>
                  <CalendarInput 
                        register={register}
                        name="dob"
                        label="What is the date of birth (DOB) for this mouse? (YYYY-MM-DD)"
                        errors={errors}
                    />
                  </div>
                  <div className="form-question" style={{ padding: '3px' }}>
                    <TextInput
                      register={register}
                      name="cageId"
                      label="What is the cage ID of the cage this mouse is being held in?"
                      required={true}
                      errors={errors}
                    />
                  </div>
                  <div className="form-question" style={{ padding: '3px' }}>
                   <CalendarInput 
                        register={register}
                        name="dateReceived"
                        label="Date this mouse was received (YYYY-MM-DD):"
                        errors={errors}
                    />
                 </div>
                 <div className="form-question" style={{ padding: '3px' }}>
                      <RadioButtonGroup
                        options={[
                          { value: 'Yes', label: 'Yes, please explain why:' },
                          { value: 'No', label: 'No' }
                        ]}
                        register={register}
                        name="exclusionCriteria"
                        label="Does this mouse have to be removed before assigning it to a cage? (If yes, please explain why)"
                        errors={errors}
                        onChange={(value) => handleRadioButtonChange(value, "exclusionCriteria")}
                      />
                      {exclusionCriteria  === "Yes" && (
                        <TextInput
                          register={register}
                          name="exclusionReason"
                          required={false}
                          errors={errors}
                        />
                      )}
                    </div>
                    <div className="form-question" style={{ padding: '3px' }}>
                        <RadioButtonGroup
                          options={[
                            { value: 'Yes', label: 'Yes' },
                            { value: 'No', label: 'No' }
                          ]}
                          register={register}
                          name="removedFromStudy"
                          label="If the mouse met the exclusion criteria, was it removed from the study (sacrificed)?"
                          errors={errors}
                          onChange={(value) => handleRadioButtonChange(value, "removedFromStudy")}
                        />
                      </div>
                      <div className="form-question" style={{ padding: '3px' }}>
                      <RadioButtonGroup
                        options={[
                            { value: 'Yes', label: 'Yes' },
                            { value: 'No', label: 'No' }
                        ]}
                        register={register}
                        name="cageSplitDueToFighting"
                        label="Was this mouse split into a new cage due to fighting?"
                        errors={errors}
                        onChange={(value) => handleRadioButtonChange(value, "cageSplitDueToFighting")}
                    />
                    
                    {cageSplitDueToFighting === "Yes" && (
                        <CalendarInput 
                            register={register}
                            name="cageSplitDate"
                            label="Date the mouse was split into a new cage (YYYY-MM-DD):"
                            errors={errors}
                        />
                    )}

                      </div>  
                      <div className="form-question" style={{ padding: '3px' }}>
                      <RadioButtonGroup
                        options={[
                            { value: 'Two', label: 'Two' },
                            { value: 'Three', label: 'Three' },
                            { value: 'Other', label: 'Other' }
                        ]}
                        register={register}
                        name="numberOfMiceInCage"
                        label="How many mice are in the cage this mouse is held in?"
                        errors={errors}
                        onChange={(value) => handleRadioButtonChange(value, "numberOfMiceInCage")}
                    />
                     { numberOfMiceInCage === "Other" && (
                        <TextInput
                            register={register}
                            name="numberOfMiceOther"
                            required={false} // Change as needed
                            errors={errors}
                        />
                    )}
                    </div>
                    
                    <div className = "form-question" style={{padding:'3px'}}>
                      <label>
                        <input type="checkbox" {...register("applicabletoall", { required: "This field is required." })} />
                        Animal housing information is applicable to all mice in this shipment(if not please fill out the form for every mouse).
                      </label>
                      {errors.applicabletoall && <p style={{ color: 'red' }}>{errors.applicabletoall.message}</p>}
                    </div>

                    <div className="form-question" style={{ padding: '3px' }}>
                    <TextAreaInput
                        register={register}
                        name="protocolDeviations"
                        label="Are there any other deviations from the protocol during enrollment?"
                        errors = {errors}
                   />
                    </div>
                    <div className="form-question" style={{ padding: '3px' }}>
                    <TextAreaInput
                        register={register}
                        name="additionalComments"
                        label="Do you have any comments to add?"
                        errors = {errors}
                    />

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