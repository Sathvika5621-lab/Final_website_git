import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Fieldset } from 'primereact/fieldset';
import { RadioButton } from "primereact/radiobutton";
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Header from "../Header";
import "../styles.css";
import "../Formstyle.css";

const RadioGroup = ({ id, label, options, register, watch, setValue, errors, hasOther }) => {
  const selectedValue = watch(id);
  const onValueChange = (value) => {
    setValue(id, value);
    if (hasOther && value !== 'Other') {
      setValue(`other${id}`, "");
    }
  };


  return (
    <div className="form-question" style={{ padding: '3px' }}>
      <label>{label}</label>
      {options.map(option => (
        <div className="radio-option" key={option}>
          <RadioButton
            inputId={`${id}_${option}`}
            name={id}
            value={option}
            {...register(id, { required: "This field is required." })}
            checked={selectedValue === option}
            onChange={() => onValueChange(option)}
          />
          <label htmlFor={`${id}_${option}`} className="p-radiobutton-label">{option}</label>
        </div>
      ))}
      {hasOther && selectedValue === 'Other' && (
        <InputText
          {...register(`other${id}`, { required: "This field is required." })}
          id={`other${id}`}
          placeholder="Specify...."
        />
      )}
      {errors[id] && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
      {hasOther && errors[`other${id}`] && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
    </div>
  );
};

const CheckboxGroup = ({ id, label, options, register, watch, setValue, errors, hasOther }) => {
  const selectedValues = watch(id) || [];
  const onCheckboxChange = (value, checked) => {
    if (checked) {
      setValue(id, [...selectedValues, value]);
    } else {
      setValue(id, selectedValues.filter(v => v !== value));
    }
    if (hasOther && value === 'Other' && !checked) {
      setValue(`other${id}`, "");
    }
  };

  return (
    <div className="form-question" style={{ padding: '3px' }}>
      <label>{label}</label>
      {options.map(option => (
        <div className="radio-option" key={option}>
          <Checkbox
            inputId={`${id}_${option}`}
            value={option}
            checked={selectedValues.includes(option)}
            onChange={(e) => onCheckboxChange(option, e.checked)}
          />
          <label htmlFor={`${id}_${option}`} className="p-checkbox-label">{option}</label>
        </div>
      ))}
      {hasOther && selectedValues.includes('Other') && (
        <InputText
          {...register(`other${id}`, { required: "This field is required." })}
          id={`other${id}`}
          placeholder="Specify...."
        />
      )}
      {errors[id] && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
      {hasOther && errors[`other${id}`] && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
    </div>
  );
};


function BioBankingForm() {
  const {control, register, handleSubmit, formState: { errors }, setValue, watch} = useForm();

  const { fields, append, remove } = useFieldArray({ control, name: "biobankinghqps" });
  // const selectedIsoPercentage = watch('isopercentage');
  // const selectedIsoNoseConePercentage = watch('isonoseconepercentage');
  // const selectedSedationAssessment = watch('sedationAssessment');

  const onSubmit = (data) =>
    {
      console.log(data);
    };
    

    // const onIsoPercentageChange = (value) => {
    //   setValue('isopercentage', value);
    //   if (value !== "Other") {
    //     setValue("otherIsoPercentage", "")
    //   }
    // };
    // const onIsoNoseConePercentageChange = (value) => {
    //   setValue('isonoseconepercentage', value);
    //   if (value !== "Other") {
    //     setValue("otherIsoNoseConePercentage", "")
    //   }
    // };

    // const onSedationAssessmentChange = (value) => {
    //   setValue('sedationAssessment', value);
    //   if (value !== "Other") {
    //     setValue("otherSedationAssessment", "")
    //   }
    // };

  return (
    <div className="Headings">
    <div className="body-content" style={{padding:'5px'}}>
    <ScrollPanel style={{width : '100%', height: '1000px'}}>
    <Fieldset legend= "INDUCTION FORM" className="fieldset-legend">
    <form onSubmit={handleSubmit(onSubmit)} className='p-formgrid p-grid'>

    <div className="form-question" style={{ padding: '3px' }}>
          <label>Please enter the user ID of the HQP completing the data entry:</label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("dataentry", { required: "This field is required." })} />
          {errors.dataentry && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
    </div>

    <div className="form-question" style={{ padding: '3px' }}>
          <label>Please enter the user ID of the HQP that completed the "Biobanking Check" table: </label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("biobankinghqp", { required: "This field is required." })} />
          {errors.biobankinghqp && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
    </div>

    <div className="form-question" style={{ padding: '3px' }}>
          <label>Please enter the User ID(s) of the HQP collecting blood/PLF and dissecting tissue. If the HQP is not listed, have them register before proceeding. </label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("bloodcollectionhqp", { required: "This field is required." })} />
          {errors.bloodcollectionhqp && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
    </div>

  <div className="form-question" style={{ padding: '3px' }}>
          <label>Please enter the User ID(s) of the HQP(s) sectioning and storing the tissue. If the HQP is not listed, have them register before proceeding.</label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("sectioningandstoringhqp", { required: "This field is required." })} />
          {errors.sectioningandstoringhqp && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
    </div>

    <div  className = "form-question" style={{ padding: '3px' }}>
          <label>What time was the mouse placed in the induction chamber? (Military time)</label>
          <input type = "time" {...register("inductionchambertime", { required: "This field is required." })} />
          {errors.inductionchambertime && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
    </div>
 

          <RadioGroup
                id="isoPercentageInductionChamber"
                label="What was the isoflurane (iso) percentage in the induction chamber?"
                options={["5%", "Other"]}
                register={register}
                watch={watch}
                setValue={setValue}
                errors={errors}
                hasOther={true}
              />

        <RadioGroup
                id="isoPercentageNoseCone"
                label="What was the isoflurane percentage when the mouse was in the nose cone?"
                options={["1%-2%", "Other"]}
                register={register}
                watch={watch}
                setValue={setValue}
                errors={errors}
                hasOther={true}
              />
          <RadioGroup
                id="sedationLevelAssessment"
                label="How was the mouse’s sedation level assessed before beginning the blood collection procedure?"
                options={["Toe pinch", "Other", "None- we did not assessed anesthesia depth"]}
                register={register}
                watch={watch}
                setValue={setValue}
                errors={errors}
                hasOther={true}
              />


<Accordion>
                <AccordionTab header="CAROTID BLOOD COLLECTION AND EPOC ANALYSIS">
                  <RadioGroup
                    id="ethanolCleaning"
                    label="Did you clean mouse’s fur from the neck down to the abdomen with 70% ethanol (EtOH)?"
                    options={["Yes, with 70% ethanol", "No, we did not clean the fur with 70% ethanol"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={false}
                  />

                  <div className="form-question" style={{ padding: '3px' }}>
                    <label htmlFor="dissectionTime">What time did the carotid artery dissection begin (when the first cut is made)? (military time)</label>
                    <InputText
                      id="dissectionTime"
                      {...register("dissectionTime", { required: "This field is required." })}
                      placeholder="HH:MM"
                    />
                    {errors.dissectionTime && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                  </div>

                  <RadioGroup
                    id="bloodTubeType"
                    label="What type of tube and anticoagulant was used to collect the blood?"
                    options={["K2 EDTA microtainer provided by NPSP", "Other"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />

                  <div className="form-question" style={{ padding: '3px' }}>
                    <label htmlFor="bloodVolume">How much blood was approximately collected? (µL)?</label>
                    <InputText
                      id="bloodVolume"
                      {...register("bloodVolume", { required: "This field is required." })}
                      placeholder="µL"
                    />
                    {errors.bloodVolume && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                  </div>

                  <CheckboxGroup
                    id="bloodCollectionDifficulties"
                    label="Were there any difficulties when collecting blood? (e.g. slow bleeding, clotting, low volume, spilled sample) - select all that apply"
                    options={["No difficulties", "Slow bleeding", "Clotting", "Low volume", "Spilled sample", "Other"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />

                  <RadioGroup
                    id="invertedBloodTube"
                    label="Did you invert the blood collection tube(s) immediately after collection and before taking the epoc sample?"
                    options={["Yes, blood collection tube was inverted 3-5 times before taking epoc sample", "No, we did not invert the blood collection tube before epoc sample collection"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={false}
                  />

                  <RadioGroup
                    id="bloodSampleStorage"
                    label="Where was the blood sample tube kept after taking epoc sample?"
                    options={["Room temperature", "Ice"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={false}
                  />

                  <RadioGroup
                    id="epocAnalysis"
                    label="Was the HQP able to load the blood sample successfully within the 8-minute time window post cartridge calibration?"
                    options={["Yes, epoc analysis was successful using the first cartridge", "Yes, but we needed to re-do the epoc using a second cartridge", "No, epoc failed after second try as well", "No, there was not enough sample (less than approximately 150µL of blood collected) for an epoc analysis"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={false}
                  />
                </AccordionTab>
              </Accordion>
              <Accordion>
              <AccordionTab header="PERITONEAL LAVAGE FLUID (PLF) COLLECTION">
                  <RadioGroup
                    id="pbscavity"
                    label="How much ice-cold PBS was injected into the peritoneal cavity?"
                    options={["3 mL", "Other"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />

                  <RadioGroup
                    id="needlesize"
                    label="What size needle was used to inject the ice-cold PBS into peritoneum?"
                    options={["26G needle (0.4mm x 13 mm)", "Other"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />

                  <RadioGroup
                    id="peritoneummassage"
                    label="Did you massage the peritoneum for 10s before collecting the fluid?"
                    options={["Yes, the peritoneum was massaged before PLF collection", "No, we did not massage the peritoneum before PLF collection"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={false}
                  />

                  <div className="form-question" style={{ padding: '3px' }}>
                    <label htmlFor="plfVolume">Approximately how much PLF was collected? (mL)</label>
                    <InputText
                      id="plfVolume"
                      {...register("plfVolume", { required: "This field is required." })}
                      placeholder="mL"
                    />
                    {errors.plfVolume && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                  </div>

                  <RadioGroup
                    id="plflocation"
                    label="Where were the PLF samples kept right after collecting?"
                    options={["Ice", "Room temperature"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={false}
                  />

                  <CheckboxGroup
                    id="plfappearance"
                    label="What was the appearance of the collected PLF? (check all that apply)"
                    options={["Clear", "Cloudy", "Yellow", "Pink", "Red", "Other"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />

                  <RadioGroup
                    id="plfuploaded"
                    label="Was a picture of the collected whole PLF uploaded to the online website?"
                    options={["Yes, as the collected PLF was not clear", "Not applicable- the collected PLF was clear"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={false}
                  />

                  <RadioGroup
                    id="plfcomplications"
                    label="Were there any complications when collecting the PLF?"
                    options={["Yes", "No"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />
                </AccordionTab>
              </Accordion>
<Accordion>
              <AccordionTab header="TISSUE DISSECTION">
  <RadioGroup
    id="brainDissection"
    label="Please verify the following sentences regarding dissected brain sections:"
    options={[
      "Brain was cut in half longitudinally (cerebellum was included), and the olfactory bulbs were discarded",
      "Left lobe was stored in 10% formalin",
      "Right lobe was frozen immediately in liquid nitrogen (snap freeze)"
    ]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={false}
  />

  <RadioGroup
    id="lungDissection"
    label="Please verify the following sentences regarding dissected lung sections:"
    options={[
      "Right lung lobes were separated and frozen immediately in liquid nitrogen",
      "Left lung was cut into four sections; top and bottom sections were stored in RNAlater",
      "Left lung was cut into four sections; two middle sections were stored in 10% formalin"
    ]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={false}
  />

  <RadioGroup
    id="heartDissection"
    label="Please verify the following sentences regarding dissected heart sections:"
    options={[
      "Heart was cut into 3 sections",
      "Superior section was frozen immediately in liquid nitrogen",
      "Middle section was stored in 10% formalin",
      "Inferior section was stored in RNAlater"
    ]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={false}
  />

  <RadioGroup
    id="liverDissection"
    label="Please verify the following sentences regarding dissected liver sections:"
    options={[
      "Right and caudate lobes were stored in RNAlater",
      "Median lobe was cut into three sections and frozen immediately in liquid nitrogen",
      "Left lung was cut into three sections and stored in 10% formalin"
    ]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={false}
  />

  <RadioGroup
    id="spleenDissection"
    label="Please verify the following sentences regarding dissected spleen sections:"
    options={[
      "Spleen was cut into three sections",
      "Superior section was frozen immediately in liquid nitrogen",
      "Middle section was stored in 10% formalin",
      "Inferior section was stored in RNAlater"
    ]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={false}
  />

  <RadioGroup
    id="kidneyDissection"
    label="Please verify the following sentences regarding dissected kidney sections:"
    options={[
      "Left kidney was cut into two sections; top section was stored in 10% formalin (with the tip cut and discarded) and bottom section was stored in RNAlater",
      "Right kidney was cut into two sections and frozen immediately in liquid nitrogen"
    ]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={false}
  />

  <RadioGroup
    id="kidneyDecapsulation"
    label="Did you decapsulate the kidneys?"
    options={["Yes", "No"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={false}
  />

  <RadioGroup
    id="muscleDissection"
    label="Please verify the following sentences regarding dissected muscle sections:"
    options={["TBD"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={false}
  />

  <RadioGroup
    id="cecalContents"
    label="Please verify the following sentences regarding cecal contents collection:"
    options={[
      "Changed gloves and use dissection tools specific for cecal content collection",
      "Squeezed cecal contents into a 1.5 mL snap cap tube and froze immediately in liquid nitrogen",
      "Cleaned surgical tools and changed gloves again"
    ]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={false}
  />

  <CheckboxGroup
    id="dissectionComplications"
    label="Please indicate if there were any complications while dissecting the following organs:"
    options={[
      "Brain", 
      "Lung", 
      "Heart", 
      "Liver", 
      "Spleen", 
      "Kidney", 
      "Muscle", 
      "No complications occurred during biobanking"
    ]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={false}
  />

  <div className="form-question" style={{ padding: '3px' }}>
    <label htmlFor="biobankingEndTime">What time did biobanking end (end time is defined by the time cecal contents were placed inside the collection tube)? (Military time)</label>
    <InputText
      id="biobankingEndTime"
      {...register("biobankingEndTime", { required: "This field is required." })}
      placeholder="HH:MM"
    />
    {errors.biobankingEndTime && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
  </div>

  <RadioGroup
    id="rnalaterTubes"
    label="How many microtubes of RNAlater were collected for this mouse by the end of biobanking?"
    options={["8 microtubes", "Other"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={true}
  />

  <RadioGroup
    id="snapFrozenTubes"
    label="How many snap frozen tubes were collected for this mouse by the end of biobanking?"
    options={["8 microtubes", "Other"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={true}
  />

  <RadioGroup
    id="snapFreezeStorage"
    label='Where were "snap freeze" tubes stored immediately after dissection on the experimental day?'
    options={["Liquid nitrogen", "Other"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={true}
  />

  <RadioGroup
    id="rnalaterStorage"
    label="Where were the RNAlater microtubes stored immediately after the tissues were placed in?"
    options={["Ice", "Room temperature", "Liquid nitrogen"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={false}
  />

  <RadioGroup
    id="histologyStorage"
    label="Where were the histology samples (10% formalin falcon tubes) stored immediately after the tissues were placed in?"
    options={["Ice", "Room temperature", "Liquid nitrogen"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={false}
  />
</AccordionTab>
</Accordion>
<Accordion>
<AccordionTab header="FLUID PROCESSING AND STORAGE IMMEDIATELY AFTER BIOBANKING">
  <RadioGroup
    id="formalinTemp"
    label="At what temperature were the falcon tubes of 10% formalin placed for the fixation process?"
    options={["4°C/cold room", "Other"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={true}
  />

  <RadioGroup
    id="formalinShaker"
    label="Are the 10% formalin falcon tubes placed on their side and on a shaker during the fixation process?"
    options={["Yes, falcon tubes were shaken during fixation process", "No, falcon tubes were stored steadily"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={false}
  />

  <RadioGroup
    id="formalinDuration"
    label="How long the histology samples were kept in 10% formalin?"
    options={["24 hours", "Other (please specify)"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={true}
  />

  <RadioGroup
    id="pbsWashDuration"
    label="How long were the histology samples washed with 1XPBS after formalin fixation?"
    options={["3 hours", "Other"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={true}
  />

  <RadioGroup
    id="tissueStorage"
    label="What were the tissues placed in after being washed with 1XPBS?"
    options={["The brain was placed in sodium azide and all other tissues were placed in 70% ethanol (EtOH)", "Other"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={true}
  />

  <RadioGroup
    id="centrifugeType"
    label="What was used to centrifuge blood and PLF samples?"
    options={["Fridge centrifuge set at 4°C", "Room temperature centrifuge"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={false}
  />

  <RadioGroup
    id="centrifugeSpeedDuration"
    label="At what speed and duration were the blood samples centrifuged after samples for fresh outcomes measurements were taken?"
    options={["500 x g for 10 minutes at 4˚C", "Other"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={true}
  />

  <RadioGroup
    id="plasmaProcessing"
    label="What was done with the plasma once the blood was done spinning?"
    options={[
      "A) Plasma was removed, placed in a new 1.5mL snap cap tube and centrifuged again with the same conditions as before or B) plasma was aliquoted",
      "Other"
    ]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={true}
  />

  <RadioGroup
    id="eveBiomarkerPrep"
    label="Were you able to prepare samples for biomarkers analysis by EVE technology?"
    options={[
      "Yes, two vials were prepared, labelled, and stored for biomarker analysis as per the SOP",
      "Yes, but only one sample was prepared for biomarker analysis due to plasma volume limitations",
      "No, we could not save any plasma for biomarker analysis after initial fresh outcome measurements (collected blood was less than 150ul)"
    ]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={false}
  />

  <CheckboxGroup
    id="plasmaAliquots"
    label="Please indicate the number of collected plasma aliquots (excluding EVE technology samples):"
    options={[
      "Less than 20ul volume",
      "20ul volume",
      "50ul volume",
      "100ul volume",
      "Other (please specify)",
      "No other aliquots were collected"
    ]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={true}
  />

  <RadioGroup
    id="plfAliquots"
    label="How many aliquots of fresh peritoneal lavage fluid (PLF) were collected?"
    options={["5 aliquots of 50uL each", "Other"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={true}
  />

  <RadioGroup
    id="plfCentrifuge"
    label="At what speed, duration, and temperature was the PLF centrifuged after using it for fresh outcomes?"
    options={["500 x g for 10 minutes at 4˚C", "Other"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={true}
  />

  <RadioGroup
    id="plfSupernatantAliquots"
    label="How many aliquots of PLF supernatant were collected?"
    options={["4 aliquots of 400uL each", "Other"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={true}
  />

  <RadioGroup
    id="sampleStorageTemp"
    label="At what temperature were the plasma, fresh PLF, PLF supernatant aliquots, and snap frozen samples stored immediately after biobanking/aliquoting?"
    options={["-80°C", "Other"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={true}
  />

  <RadioGroup
    id="rnalaterStorage"
    label="At what temperature were the RNAlater tubes stored immediately after biobanking?"
    options={["4°C", "Other"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={true}
  />

  <RadioGroup
    id="rnalaterStorage24hrs"
    label="At what temperature were the RNAlater tubes stored 24hrs after biobanking?"
    options={["-80°C", "Other"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={true}
  />

  <RadioGroup
    id="protocolDeviations"
    label="Were there any other deviations from the protocol when biobanking and storing samples? Please specify"
    options={["Yes", "No"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={false}
  />

</AccordionTab>
</Accordion>

<RadioGroup
    id="protocolDeviations"
    label="Were there any other deviations from the protocol when biobanking and storing samples? Please specify"
    options={["Yes", "No"]}
    register={register}
    watch={watch}
    setValue={setValue}
    errors={errors}
    hasOther={false}
  />

  <div className="form-question" style={{ padding: '3px' }}>
    <label htmlFor="comments">Do you have any other comments?</label>
    <InputTextarea id="comments" {...register("comments")} autoResize />
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

export default BioBankingForm