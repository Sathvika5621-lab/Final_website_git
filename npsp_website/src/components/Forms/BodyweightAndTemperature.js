import React from "react";
import { useForm, Controller } from "react-hook-form";
import { InputTextarea } from 'primereact/inputtextarea';
import { Panel } from 'primereact/panel';
import { Fieldset } from 'primereact/fieldset';
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Divider } from 'primereact/divider';
import { Checkbox } from 'primereact/checkbox';
// Assume Header, styles.css, and Formstyle.css are properly imported as before.

function BodyweightAndTemperature() {
  const { control, register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    defaultValues: {
      humaneEndpoint :false,
      criteria :{}
    }
  });
  const selectedTemperatureDevice = watch('temperatureDevice');
  const selectedLubricant = watch('lubricant');
  const selectedComplication = watch('complication');
  const selectedThermometerCleaned = watch('thermometerCleaned');
  const selectedHumaneEndpoint = watch('humaneEndpoint');
  const criteria = watch('criteria');

  const timePoints = [
    { label: 'T = -1', value: 'T = -1' },
    { label: 'T = 4', value: 'T = 4' },
    { label: 'T = 8', value: 'T = 8' },
  ];

  const onSubmit = (data) => {
    console.log(data);
  };

  const OnSelectedTemperatureDeviceChange = (value) =>
  {
     setValue('temperatureDevice', value);
     if (value != "Other"){
         setValue ("otherTemperatureDeviceSpecified", "")
     }
  }; 

  const onSelectedLubricantChange = (value) =>
  {
    setValue('lubricant', value);
    if (value != "Other"){
       setValue ("otherLubricant", "")
    }
  };

  const onSelectedComplicationChange = (value) =>
  {
    setValue('complication', value);
  }

  const onSelectedThermometerCleanedChange = (value) =>
  {
    setValue('thermometerCleaned', value);
  }

  const onSelectedHumaneEndpointChange = (value) =>
  {
    setValue ('humaneEndpoint', value);
  }

  const onSelectedCriteriaChange = (name) =>
  {
    const newCriteria = {...criteria, [name]: !criteria[name]};
    setValue('criteria', newCriteria);
  }
  return (
    <div className="Headings">
      <div className="body-content" style={{ padding: '5px' }}>
        <Fieldset legend="BODY WEIGHT AND TEMPERATURE FORM" className="fieldset-legend">
        <Panel header="For any inquiries please contact Dr.Forough Jahandideh at fjahandideh@ohri.ca"  toggleable >
         <h3 style={{marginTop:'0', marginBottom:'0'}}>Instructions: </h3>
         <ul style={{marginTop:'0', marginBottom:'0'}}>
            1) Read the wellness check & treatment protocol. Read the core temperature protocol. Print and complete the “BW and T Check” table as well as the "Modified MSS". These tables should be filled at T = -1, T = 4 and T = 8 during mouse wellness checks.
        </ul>
        <ul style={{marginTop:'0', marginBottom:'0'}}>
            2) Use the answers from the "BW and T Check" and "Modified MSS" tables to answer the questions below and upload a picture or scan a copy of the referenced filled table.
       </ul>
      </Panel>
          
          <form onSubmit={handleSubmit(onSubmit)} className='p-formgrid p-grid' style = {{ padding : '5px'}}>

          <div className="form-question" style={{ padding: '3px' }}>
        <label htmlFor="assessmentTimePoint">Assessment Time Point: </label>
        <Controller
          name="assessmentTimePoint"
          control={control}
          rules={{ required: "This field is required." }}
          render={({ field }) => (
            <Dropdown
              id="assessmentTimePoint"
              options={timePoints}
              onChange={(e) => field.onChange(e.value)}
              value={field.value}
              placeholder="Select a Time Point"
            />
          )}
        />
        {errors.assessmentTimePoint && <p style={{ color: 'red' }}>{errors.assessmentTimePoint.message}</p>}
      </div>

            {/* Section for Wellness Scores
            <div className="form-question" style={{ padding: '3px' }}>
              <label htmlFor="wellnessScores">Wellness Scores (HQP 1, HQP 2, HQP 3...):</label>
              <InputTextarea id="wellnessScores" {...register("wellnessScores")} autoResize />
            </div> */}

            {/* Body Weight */}
            <div className="form-question" style={{ padding: '3px' }}>
              <label htmlFor="bodyWeight">What was the body weight of this mouse ? (g):</label>
              <InputText id="bodyWeight" {...register("bodyWeight", { required: "This field is required." })} />
              {errors.bodyWeight && <p style={{ color: 'red' }}>*This field is required*</p>}
            </div>

            {/* Core Temperature */}
            <div className="form-question" style={{ padding: '3px' }}>
              <label htmlFor="coreTemperature">What was the core temperature of this mouse ? (°C):</label>
              <InputText id="coreTemperature" {...register("coreTemperature", { required: "This field is required." })} />
              {errors.coreTemperature && <p style={{ color: 'red' }}>*This field is required*</p>}
            </div>

            {/* Temperature Measurement Device */}
            <div className="form-question" style={{ padding: '3px' }}>
              <label>Which device was used to take the core temperature of this mouse ? </label>
              <div className="radio-option">
                <RadioButton
                  inputId="intellibioThermometer"
                  name="temperatureDevice"
                  value="Intellibio Thermometer with Metal Rectal Probe"
                  {...register("temperatureDevice", { required: "This field is required." })}
                  checked={selectedTemperatureDevice === "Intellibio Thermometer with Metal Rectal Probe"}
                  onChange={() => OnSelectedTemperatureDeviceChange ("Intellibio Thermometer with Metal Rectal Probe")}
                />
                <label htmlFor="intellibioThermometer" className="p-radiobutton-label" >Intellibio Thermometer with Metal Rectal Probe (A-2303-00469) provided by the Ottawa site</label>
              </div>
              <div className="radio-option">
                <RadioButton
                  inputId="otherTemperatureDevice"
                  name="temperatureDevice"
                  value="Other"
                  {...register("temperatureDevice", { required: "This field is required." })}
                  checked={selectedTemperatureDevice === "Other"}
                  onChange={() => OnSelectedTemperatureDeviceChange("Other")}
                />
                <label htmlFor="otherTemperatureDevice" className="p-radiobutton-label">Other</label>
                </div>
                <div style = {{ padding : '3px'}}>
                {selectedTemperatureDevice === "Other" && (
                  <InputText
                    {...register("otherTemperatureDeviceSpecified", { required: "This field is required." })}
                    id = "otherTemperatureDeviceSpecified"
                    placeholder="Specify the device..."
                  />
                )}
              </div>
              {errors.temperatureDevice && <p style={{ color: 'red' }}>*This field is required*</p>}
              {errors.otherTemperatureDeviceSpecified && <p style={{ color: 'red' }}>*This field is required*</p>}
            </div>

            {/* Lubricant Used */}
            <div className="form-question" style={{ padding: '3px' }}>
              <label>What was used as the lubricant for the temperature probe before taking the core temperature of this mouse: </label>
              <div className="radio-option">
                <RadioButton
                  inputId="medlineJelly"
                  name="lubricant"
                  value="Medline Lubricating Jelly"
                  {...register("lubricant", { required: "This field is required." })}
                  checked={selectedLubricant === "Medline Lubricating Jelly"}
                  onChange={() =>onSelectedLubricantChange("Medline Lubricating Jelly")}
                />
                <label htmlFor="medlineJelly" className="p-radiobutton-label">Medline Lubricating Jelly (MDS032280H) provided by the Ottawa site</label>
              </div>
              <div className="radio-option">
                <RadioButton
                  inputId="otherLubricant"
                  name="lubricant"
                  value="Other"
                  {...register("lubricant", { required: "This field is required." })}
                  checked={selectedLubricant === "Other"}
                  onChange={() => onSelectedLubricantChange("Other")}
                />
                <label htmlFor="otherLubricant" className="p-radiobutton-label">Other </label>
              </div>
              <div style={{ padding : '3px'}}>
                {selectedLubricant === "Other" && (
                  <InputText
                    {...register("otherLubricantSpecified", { required: "This field is required." })}
                    id = "otherLubricantSpecified"
                    placeholder="Specify..."
                  />
                )}
              </div>
              <div className="radio-option">
                <RadioButton
                  inputId="notsure"
                  name="lubricant"
                  value="I am not sure"
                  {...register("lubricant", { required: "This field is required." })}
                  checked={selectedLubricant === "I am not sure"}
                  onChange={() =>onSelectedLubricantChange("I am not sure")}
                />
                <label htmlFor="notsure" className="p-radiobutton-label">I am not sure</label>
              </div>
              {errors.lubricant && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
              {errors.otherLubricantSpecified && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
               
            </div>


            <div className="form-question" style={{ padding: '3px' }}>
              <label> Were there any complications encountered while taking the core temperature of this mouse? </label>
              <div className="radio-option">
                <RadioButton
                  inputId="nocomplications"
                  name="complication"
                  value="No Complications"
                  {...register("complication", { required: "This field is required." })}
                  checked={selectedComplication === "No Complications"}
                  onChange={() =>onSelectedComplicationChange("No Complications")}
                />
                <label htmlFor="nocomplications" className="p-radiobutton-label">No, there was no observed complications while taking body temperature using the rectal probe.</label>
              </div>
              <div className="radio-option">
                <RadioButton
                  inputId="internalbleedinh"
                  name="complication"
                  value="Internal Bleeding"
                  {...register("complication", { required: "This field is required." })}
                  checked={selectedComplication === "Internal Bleeding"}
                  onChange={() => onSelectedComplicationChange("Internal Bleeding")}
                />
                <label htmlFor="internalbleeding" className="p-radiobutton-label">Yes, there was an indication of potential internal damange as bleeding was observed. </label>
              </div>
            
              <div className="radio-option">
                <RadioButton
                  inputId="notsure"
                  name="complication"
                  value="I am not sure"
                  {...register("complication", { required: "This field is required." })}
                  checked={selectedComplication === "I am not sure"}
                  onChange={() =>onSelectedComplicationChange("I am not sure")}
                />
                <label htmlFor="notsure" className="p-radiobutton-label">I am not sure</label>
              </div>
              {errors.complication && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
            </div>

            <div className="form-question" style={{ padding: '3px' }}>
              <label> Was the thermometer cleaned after taking the core temperature of this mouse? </label>
              <div className="radio-option">
                <RadioButton
                  inputId="yescleaned"
                  name="thermometerCleaned"
                  value="Probe was wiped with 70% ethanol"
                  {...register("thermometerCleaned", { required: "This field is required." })}
                  checked={selectedThermometerCleaned === "Probe was wiped with 70% ethanol"}
                  onChange={() =>onSelectedThermometerCleanedChange("Probe was wiped with 70% ethanol")}
                />
                <label htmlFor="yescleaned" className="p-radiobutton-label"> Yes, the probe was wiped with 70% ethanol. </label>
              </div>
              <div className="radio-option">
                <RadioButton
                  inputId="notcleaned"
                  name="thermometerCleaned"
                  value="Probe was not cleaned"
                  {...register("thermometerCleaned", { required: "This field is required." })}
                  checked={selectedThermometerCleaned === "Probe was not cleaned"}
                  onChange={() => onSelectedThermometerCleanedChange("Probe was not cleaned")}
                />
                <label htmlFor="notcleaned" className="p-radiobutton-label"> No, the probe was not cleaned.</label>
              </div>
              {errors.thermometerCleaned && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
            </div>

            <div className="form-question" style={{ padding: '3px' }}>
              <label> Did the mouse reach humane endpoint? </label>
              <div className="radio-option">
                <RadioButton
                  inputId="yes"
                  name="humaneEndpoint"
                  value="Yes"
                  {...register("humaneEndpoint", { required: "This field is required." })}
                  checked={selectedHumaneEndpoint === "Yes"}
                  onChange={() =>onSelectedHumaneEndpointChange("Yes")}
                />
                <label htmlFor="yes" className="p-radiobutton-label"> Yes </label>
              </div>
              <div className="radio-option">
                <RadioButton
                  inputId="no"
                  name="humaneEndpoint"
                  value="No"
                  {...register("humaneEndpoint", { required: "This field is required." })}
                  checked={selectedHumaneEndpoint === "No"}
                  onChange={() => onSelectedHumaneEndpointChange("No")}
                />
                <label htmlFor="no" className="p-radiobutton-label"> No </label>
              </div>
              {errors.humaneEndpoint && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
            </div>

            {selectedHumaneEndpoint == 'Yes' && (
                <div className="form-question">
                    <h4>If yes, please indicate the pre-determined endpoint criteria reached:</h4>
                    {[" CumulativeMSS", " Response To Stimuli", " Posture", " Piloerection", " Orbital Tightening", " Labored Breathing", " HindLeg Tremors", " Weight Decrease", " Temperature Reduction"].map((item) => (
                        <div key={item}>
                          <Checkbox
                            inputId={item}
                            onChange={() => onSelectedCriteriaChange(item)}
                            checked={criteria[item] || false}
                          />
                          <label htmlFor={item}>{item}</label>
                        </div>
                      ))}

                    {/* <div><Checkbox {...register("criteria.cumulativeMSS")} /> 
                    <label htmlFor="cumulativeMSS">  Cumulative MSS of 11, score of 3 for at least 2 criteria  </label> </div>
                    <div><Checkbox {...register("criteria.responseToStimuli")} /> 
                    <label htmlFor="responseToStimuli">  Response to stimuli  </label> </div>
                    <div><Checkbox {...register("criteria.posture")} /> 
                    <label htmlFor="posture">  Posture  </label> </div>
                    <div><Checkbox {...register("criteria.piloerection")} /> 
                    <label htmlFor="piloerection">  Piloerection  </label> </div>
                    <div><Checkbox {...register("criteria.orbitalTightening")} /> 
                    <label htmlFor="orbitalTightening">  Orbital tightening  </label> </div>
                    <div><Checkbox {...register("criteria.laboredBreathing")} /> 
                    <label htmlFor="laboredBreathing">  Labored breathing  </label> </div>
                    <div><Checkbox {...register("criteria.hindLegTremors")} /> 
                    <label htmlFor="hindLegTremors">  Hind leg tremors  </label> </div>
                    <div><Checkbox {...register("criteria.weightDecrease")} /> 
                    <label htmlFor="weightDecrease">  Body weight decrease exceeding 10% from baseline  </label> </div>
                    <div><Checkbox {...register("criteria.temperatureReduction")} /> 
                    <label htmlFor="temperatureReduction">  Core temperature reduction surpassing 20% from baseline  </label> </div> */}
                </div>
            )}

            <div className="p-field form-question " style={{padding: "3px"}} >
          <label htmlFor="deviations" >Were there any other deviations from the protocol when performing the above tasks? </label>
          <div className="p-col">
               <InputTextarea id="deviations" {...register("deviations")}  autoResize />
          </div>
        </div>

        <div className="p-field form-question " style={{padding: "3px"}} >
          <label htmlFor="comments" >Did you have any comments to add?</label>
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
      </div>
    </div>
  );
}

export default BodyweightAndTemperature;
