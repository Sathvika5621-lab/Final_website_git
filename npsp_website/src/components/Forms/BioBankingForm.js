import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { InputTextarea } from 'primereact/inputtextarea';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Fieldset } from 'primereact/fieldset';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import { RadioGroup, CheckboxGroup } from './FormsComponents';
import Header from "../Header";
import "../styles.css";
import "../Formstyle.css";

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
    

  return (
    <div className="Headings">
    <div className="body-content" style={{padding:'5px'}}>
    <ScrollPanel style={{width : '100%', height: '1000px'}}>
    <Fieldset legend= "BIOBANKING FORM" className="fieldset-legend">

    <Panel header="For any inquiries please contact Dr.Forough Jahandideh at fjahandideh@ohri.ca" toggleable className='custom-panel-fieldset'>
      <h3 style={{ marginTop: '0', marginBottom: '0' }}>Instructions:</h3>
        <ul style={{ marginTop: '0', marginBottom: '0' }}>
            <li>1) Read the reagent preparation SOP and make up the reagents required.</li>
            <li>2) Read the biobanking SOP and view all relevant training videos.</li>
            <li>3) Complete the "Biobanking Check" table during the end pointing of the mouse.</li>
            <li>4) Use the completed "Biobanking Check" table to answer the questions below and upload a picture of the completed referenced table to your center's sepcific folder in NPSP SharePoint.</li>
        </ul>
    </Panel>


    <form onSubmit={handleSubmit(onSubmit)} className='p-formgrid p-grid'>

    <div className="form-question" style={{ padding: '3px' }}>
          <label>Please enter the email ID of the HQP completing the data entry:</label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("dataentry", { required: "This field is required." })} />
          {errors.dataentry && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
    </div>

    <div className="form-question" style={{ padding: '3px' }}>
          <label>Please enter the email ID of the HQP that completed the "Biobanking Check" table: </label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("biobankinghqp", { required: "This field is required." })} />
          {errors.biobankinghqp && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
    </div>



  <div className="form-question" style={{ padding: '3px' }}>
          <label>Please enter the email ID(s) of the HQP(s) sectioning and storing the tissue. If the HQP is not listed, have them register before proceeding.</label>
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
                label="1. What was the isoflurane (iso) percentage in the induction chamber?"
                options={["5%", "Other"]}
                register={register}
                watch={watch}
                setValue={setValue}
                errors={errors}
                hasOther={true}
              />

        <RadioGroup
                id="isoPercentageNoseCone"
                label="2. What was the isoflurane percentage when the mouse was in the nose cone?"
                options={["1%-2%", "Other"]}
                register={register}
                watch={watch}
                setValue={setValue}
                errors={errors}
                hasOther={true}
              />
          <RadioGroup
                id="sedationLevelAssessment"
                label="3. Did you check mouse’s sedation level before beginning the blood collection procedure?"
                options={["Yes, did a toe pinch", "No, we did not check anesthesia depth"]}
                register={register}
                watch={watch}
                setValue={setValue}
                errors={errors}
                hasOther={false}
              />


              <Accordion>
                <AccordionTab header="CAROTID BLOOD COLLECTION AND EPOC ANALYSIS">
                  <RadioGroup
                    id="ethanolCleaning"
                    label="4. Did you clean mouse’s fur from the neck down to the abdomen with 70% ethanol (EtOH)?"
                    options={["Yes, we cleaned the fur with 70% ethanol", "No, we did not clean the fur with 70% ethanol"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={false}
                  />

                  <div className="form-question" style={{ padding: '3px' }}>
                    <label htmlFor="dissectionTime">5. What time did the carotid artery dissection begin (when the first cut is made)? (military time)</label>
                    <InputText
                      id="dissectionTime"
                      {...register("dissectionTime", { required: "This field is required." })}
                      placeholder="HH:MM"
                    />
                    {errors.dissectionTime && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                  </div>

                  <div className="form-question" style={{ padding: '3px' }}>
                      <label>6. Email ID of the HQP conducting carotid cut blood collected:</label>
                       <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("carotidcutid", { required: "This field is required." })} />
                      {errors.carotidcutid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                 </div>

                  <RadioGroup
                    id="bloodTubeType"
                    label="7. What type of tube and anticoagulant was used to collect the blood?"
                    options={["K2 EDTA microtainer provided by NPSP", "Other"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />

                  <div className="form-question" style={{ padding: '3px' }}>
                    <label htmlFor="bloodVolume">8. How much blood was approximately collected? (µL)? Please note that if less than 150uL blood is collected, epoc analysis should be skipped.</label>
                    <InputText
                      id="bloodVolume"
                      {...register("bloodVolume", { required: "This field is required." })}
                      placeholder="µL"
                    />
                    {errors.bloodVolume && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                  </div>

                  <CheckboxGroup
                    id="bloodCollectionDifficulties"
                    label="9. Were there any difficulties when collecting blood? (e.g. slow bleeding, clotting, low volume, spilled sample) - select all that apply"
                    options={["No difficulties", "Slow bleeding", "Clotting", "Low volume", "Spilled sample", "Other"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />

                  <RadioGroup
                    id="invertedBloodTube"
                    label="10. Did you invert the blood collection tube(s) immediately after collection and before taking the epoc sample?"
                    options={["Yes, blood collection tube was inverted 3-5 times before taking epoc sample", "No, we did not invert the blood collection tube before epoc sample collection"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={false}
                  />

                  <RadioGroup
                    id="bloodSampleStorage"
                    label="11. Where was the blood sample tube kept after taking epoc sample?"
                    options={["Room temperature", "Ice"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={false}
                  />

                  <RadioGroup
                    id="epocAnalysis"
                    label="12. Was the HQP able to load the blood sample successfully within the 8-minute time window post cartridge calibration?"
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
                    label="13. How much ice-cold PBS was injected into the peritoneal cavity?"
                    options={["3 mL", "Other"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />

                  <RadioGroup
                    id="needlesize"
                    label="14. What size needle was used to inject the ice-cold PBS into peritoneum?"
                    options={["26G needle (0.4mm x 13 mm)", "Other"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />

                  <RadioGroup
                    id="peritoneummassage"
                    label="15. Did you massage the peritoneum for 10s before collecting the fluid?"
                    options={["The peritoneum was massaged before PLF collection", "We did not massage the peritoneum before PLF collection"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={false}
                  />

                  <div className="form-question" style={{ padding: '3px' }}>
                    <label htmlFor="plfVolume">16. Approximately how much PLF was collected? (mL)</label>
                    <InputText
                      id="plfVolume"
                      {...register("plfVolume", { required: "This field is required." })}
                      placeholder="mL"
                    />
                    {errors.plfVolume && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                  </div>

                  <RadioGroup
                    id="plflocation"
                    label="17. Where was the PLF sample kept right after collecting?"
                    options={["Ice", "Room temperature"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={false}
                  />

                  <CheckboxGroup
                    id="plfappearance"
                    label="18. What was the appearance of the collected PLF? (check all that apply)"
                    options={["Clear", "Cloudy", "Yellow", "Pink", "Red", "Other"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />

                  <RadioGroup
                    id="plfuploaded"
                    label="19. Please take a picture of the collected whole PLF an dupload it to your center's specific folder in NPSP SharePoint?"
                    options={["The picture of the PLF sample is uploaded to the SharePoint", "The picture of the PLF sample is NOT uploaded to the SharePoint"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={false}
                  />

                  <RadioGroup
                    id="plfcomplications"
                    label="20. Were there any complications when collecting the PLF?"
                    options={["Yes, there were issues while collecting PLF", "No, there were no complications during PLF collection"]}
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
                    label="21. Please verify the following sentences regarding dissected brain sections:"
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
                <div className="form-question" style={{ padding: '3px' }}>
                        <label>22. Please enter the email ID of the HQP collecting and dissecting brain tissue </label>
                        <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("braindissectid", { required: "This field is required." })} />
                        {errors.braindissectid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                  </div>
   


                  <RadioGroup
                    id="lungDissection"
                    label="23. Please verify the following sentences regarding dissected lung sections:"
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

                  <div className="form-question" style={{ padding: '3px' }}>
                        <label>24. Please enter the email ID of the HQP collecting and dissecting lung tissue </label>
                        <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("lungdissectid", { required: "This field is required." })} />
                        {errors.lungdissectid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                  </div>

                  <RadioGroup
                    id="heartDissection"
                    label="25. Please verify the following sentences regarding dissected heart sections:"
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
                  
                  <div className="form-question" style={{ padding: '3px' }}>
                        <label>26. Please enter the email ID of the HQP collecting and dissecting heart tissue </label>
                        <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("heartdissectid", { required: "This field is required." })} />
                        {errors.heartdissectid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                  </div>

                  <RadioGroup
                    id="liverDissection"
                    label="27. Please verify the following sentences regarding dissected liver sections:"
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

                  <div className="form-question" style={{ padding: '3px' }}>
                        <label>28. Please enter the email ID of the HQP collecting and dissecting liver tissue </label>
                        <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("liverdissectid", { required: "This field is required." })} />
                        {errors.liverdissectid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                  </div>

                  <RadioGroup
                    id="spleenDissection"
                    label="29.Please verify the following sentences regarding dissected spleen sections:"
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

                  <div className="form-question" style={{ padding: '3px' }}>
                        <label>30. Please enter the email ID of the HQP collecting and dissecting spleen tissue </label>
                        <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("spleendissectid", { required: "This field is required." })} />
                        {errors.spleendissectid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                  </div>

                  <RadioGroup
                    id="kidneyDissection"
                    label="31. Please verify the following sentences regarding dissected kidney sections:"
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
                    label="32. Did you decapsulate the kidneys?"
                    options={["Yes", "No"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={false}
                  />

                  <div className="form-question" style={{ padding: '3px' }}>
                        <label>33. Please enter the email ID of the HQP collecting and dissecting kidney tissue </label>
                        <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("kidneydissectid", { required: "This field is required." })} />
                        {errors.kidneydissectid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                  </div>


                  <RadioGroup
                    id="muscleDissection"
                    label="34. Please verify the following sentences regarding dissected muscle sections:"
                    options={[
                         "Left leg was used for muscle dissection",
                         "Gastrocnemius muscle was cut in half and medical section was stored in 10% formalin",
                         "Gastrocnemius muscle lateral section was stored in RNAlater",
                         "Soleus muscle was siddected and frozen immediately in liquid nitrogen"
                        ]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={false}
                  />

                  <div className="form-question" style={{ padding: '3px' }}>
                        <label>35. Please enter the email ID of the HQP collecting and dissecting muscle tissue </label>
                        <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("muscledissectid", { required: "This field is required." })} />
                        {errors.muscledissectid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                  </div>

                  <RadioGroup
                    id="cecalContents"
                    label="36. Please verify the following sentences regarding cecal contents collection:"
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

                  <div className="form-question" style={{ padding: '3px' }}>
                        <label>37. Please enter the email ID of the HQP collecting cecal contents </label>
                        <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("cecalcontentid", { required: "This field is required." })} />
                        {errors.cecalcontentid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                  </div>


                  <CheckboxGroup
                    id="biobankingcompletion"
                    label="38. Please indicate if the biobanking was completed for the following organs (select all that apply):"
                    options={[
                      "Blood", 
                      "PLF", 
                      "Brain", 
                      "Lung",
                      "Heart",
                      "liver", 
                      "Spleen", 
                      "Kidney", 
                      "Muscle(left leg)",
                      "Muscle(both legs)", 
                      "Cecal contents"
                    ]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={false}
                  />

                  <CheckboxGroup
                    id="dissectionComplications"
                    label="39. Please indicate if there were any complications while dissecting the following organs:"
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
{/* 
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
                  /> */}


                </AccordionTab>
                </Accordion>
                <Accordion>
                <AccordionTab header="FLUID PROCESSING AND STORAGE IMMEDIATELY AFTER BIOBANKING">
                  


                  <RadioGroup
                    id="centrifugeType"
                    label="40. What type of centrifuge was used for spinning blood and PLF samples after collection?"
                    options={["Refrigerated centrifuge set at 4°C", "Room temperature centrifuge"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={false}
                  />

                  <RadioGroup
                    id="centrifugeSpeedDuration"
                    label="41. Indicate the conditions for blood sample centrifugation after fresh outcome assessments: "
                    options={["500 x g for 10 minutes at 4˚C", "Other"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />


                  <RadioGroup
                    id="eveBiomarkerPrep"
                    label="42. Were you able to prepare samples for biomarkers analysis by EVE technology?"
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
                    label="43. Please indicate the number of collected plasma aliquots (excluding EVE technology samples):"
                    options={[
                      "Less than 20ul volume",
                      "20ul volume",
                      "50ul volume",
                      "100ul volume",
                      "Other (please specify)"
                      
                    ]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />

                  <RadioGroup
                    id="plfAliquots"
                    label="44. Indicate the number of aliquots of the whole peritoneal lavage fluid(PLF) samples collected before centrifugation"
                    options={["50uL volume", "Other", "Did not collect any whole PLF(uncentrifuges sample)"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />

                  <RadioGroup
                    id="plfCentrifuge"
                    label="45. Indicate the conditions for PLF centrifugation after fresh outcome assessments? "
                    options={["500 x g for 10 minutes at 4˚C", "Other"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />

                  <RadioGroup
                    id="plfSupernatantAliquots"
                    label="46. Please indicate the number of collected aloquots of PLF supernatant?"
                    options={["400uL volume", "Other"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />



                  <RadioGroup
                    id="RNAlatertemp"
                    label="47.At what temperature were the RNAlater tubes stored immediately after biobanking ?"
                    options={["Cold room/4°C", "Other"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />

                  <RadioGroup
                    id="RNAlatertransfer"
                    label="48.Did you transfer RNAlater tubes to -80°C freezer after 24hrs ?"
                    options={["Yes, RNAlater tubes were transferred to the -80°C freezer 24hrs after storing at 4°C", "No, RNAlater tubes are stored at Cold room/4°C"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />

                  <RadioGroup
                    id="RNAlatertransfer"
                    label="49.Where were snap freeze tubes stored immediatley after dissection  ?"
                    options={["Liquid Nitrogen", "Other"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />

                  <RadioGroup
                    id="RNAlatertransfer"
                    label="50.At what temperature were the falcon tubes of 10% formalin placed for fixation process ?"
                    options={["Cold room/4°C", "Other"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />


                <RadioGroup
                    id="RNAlatertransfer"
                    label="51.Are the 10% formalin falcon tubes placed on their side and on a shaker during the fixation process?"
                    options={["Yes, falcon tubes were shaken during fixation process", "No, falcon tubes were stored steadily"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={false}
                  />


                  <RadioGroup
                    id="RNAlatertransfer"
                    label="52.How long the tissue samples were kept in 10% formalin for fixation?"
                    options={["Yes, tissues were washed in PBS as indicated in the biobanking SOP", "No wash with PBS was perfromed after 24h fixation"]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={false}
                  />  

                    <CheckboxGroup
                    id="longtermstorageoptions"
                    label="53. Select the applicable options fro long-term storage of histology samples following 1XPBS wash"
                    options={[
                      "The brain was placed in sodium azide", 
                      "All other tissues were placed in 70% ethanol(EtOH)", 
                      "All histology samples were stored at cold room (4°C) for long-term storage", 
                      "Other"
                    
                    ]}
                    register={register}
                    watch={watch}
                    setValue={setValue}
                    errors={errors}
                    hasOther={true}
                  />


                  <RadioGroup
                    id="sampleStorageTemp"
                    label="At what temperature were the plasma, fresh PLF, PLF supernatant aliquots, and snap frozen samples stored after biobanking?"
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
                    options={["Yes, protocol deviations occured", "No, SOPs were followed fro biobanking and sample processing and storage"]}
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