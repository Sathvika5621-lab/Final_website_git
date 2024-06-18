import React, {useState} from "react";
import ReactDOM from "react-dom";
import { useForm,Controller, set } from "react-hook-form";
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from "primereact/calendar";
import { Panel } from 'primereact/panel';
import { Checkbox } from 'primereact/checkbox';
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


function BacterialCountafter24() {
    const {control, register, handleSubmit, formState: { errors }, setValue, watch} = useForm();
    const selectedColoniesCountableFromBloodSample = watch ('coloniescountablefrombloodsample');
    const selectedColoniesCountableFromPLF = watch ('coloniescountablefromplf');
    const selectedPlfSampleReplaced = watch ('plfsamplereplaced');
    const selectedDilutionsBlood = watch('dilutionsBlood', []);
    const selectedDilutionsPlf = watch('dilutionsPlf', []);
    const [selectedImage, setSelectedImage] = useState(null);

    const [colonyCountsBlood, setColonyCountsBlood] = useState({});
    const [highestDilutionBlood, setHighestDilutionBlood] = useState(null);

    const [colonyCountsPlf, setColonyCountsPlf] = useState({});
    const [highestDilutionPlf, setHighestDilutionPlf] = useState(null);
  
    const selectedReplatePlfSample = watch("replatePlfSample");
  

    const onSubmit = (data) =>
        {
          console.log(data);
        };

        const onColoniesCountableFromBloodSample = (value) =>
            {
              setValue('coloniescountablefrombloodsample', value);
              if(value != "Other"){
                setValue("othercoloniescountablefrombloodsample", "")
               }
            };


            const onColoniesCountableFromPLF = (value) =>
                {
                  setValue('coloniescountablefromplf', value);
                  if(value != "Other"){
                    setValue("othercoloniescountablefromplf", "")
                   }
                };

                const onPlfSampleReplaced = (value) =>
                    {
                      setValue('plfsamplereplaced', value);
                      
                    };
                    const onDilutionChangeBlood = (value, checked) => {
                      const newSelections = checked
                          ? [...selectedDilutionsBlood.filter(item => item !== 'Other'), value]
                          : selectedDilutionsBlood.filter(item => item !== value);
              
                      setValue('dilutionsBlood', newSelections);
              
                      if (checked && (!highestDilutionBlood || parseInt(value.replace('10^', '')) > parseInt(highestDilutionBlood.replace('10^', '')))) {
                          setHighestDilutionBlood(value);
                      }
                  };
              
                  const onColonyCountChangeBlood = (dilution, count) => {
                      setColonyCountsBlood(prev => ({ ...prev, [dilution]: count }));
                  };
              
                  const cfuPerMlBlood = highestDilutionBlood && colonyCountsBlood[highestDilutionBlood]
                      ? (colonyCountsBlood[highestDilutionBlood] / (3 * 10 * (1 / parseInt(highestDilutionBlood.replace('10^', ''))))) * 1000
                      : 0;
              
                  const onDilutionChangePlf = (value, checked) => {
                      const newSelections = checked
                          ? [...selectedDilutionsPlf.filter(item => item !== 'Other'), value]
                          : selectedDilutionsPlf.filter(item => item !== value);
              
                      setValue('dilutionsPlf', newSelections);
              
                      if (checked && (!highestDilutionPlf || parseInt(value.replace('10^', '')) > parseInt(highestDilutionPlf.replace('10^', '')))) {
                          setHighestDilutionPlf(value);
                      }
                  };
              
                  const onColonyCountChangePlf = (dilution, count) => {
                      setColonyCountsPlf(prev => ({ ...prev, [dilution]: count }));
                  };
              
                  const cfuPerMlPlf = highestDilutionPlf && colonyCountsPlf[highestDilutionPlf]
                      ? (colonyCountsPlf[highestDilutionPlf] / (3 * 10 * (1 / parseInt(highestDilutionPlf.replace('10^', ''))))) * 1000
                      : 0;
                  

                      const onReplatePlfSampleChange = (value) => {
                        setValue("replatePlfSample", value);
                      };

                      const handleImageChange = (e) => {
                        const file = e.target.files[0];
                        if (file) {
                            setSelectedImage(URL.createObjectURL(file));
                            setValue("photo", file);
                        }
                    };



  return (
    <div className = "Headings">
      <div className="body-content" style={{padding :'5px'}}>
         <ScrollPanel style={{width : '100%', height: '1000px'}}>
         <Fieldset legend = "Bacterial count form" className="fieldset-legend">
         <form onSubmit = {handleSubmit(onSubmit)} className = 'p-formgrid p-grid'>


         <div className="form-question" style={{ padding: '3px' }}>
            <label htmlFor="coloniescounteddate"> Date the colonies were counted (YYYY-MM-DD): </label>
            <Calendar
              id="coloniescounteddate"
              inputId="coloniescounteddate" // Ensure the inputId matches the id for proper label association
              dateFormat="yy-mm-dd"
              className='custom-calendar'
              {...register("coloniescounteddate", { required: "This field is required." })}
            />
            {errors.coloniescounteddate && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label> Time the colonies were counted? (Military time) </label>
          <input type = "time" {...register("coloniescounted", { required: "This field is required." })} />
          {errors.coloniescounted && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div className="form-question" style={{ padding: '3px' }}>
              <label>HQP counting colonies </label>
              <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("hqpcountingcolonies", { required: "This field is required." })} />
               {errors.hqpcountingcolonies && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

       
        <div className="p-field form-question" style={{ padding: '3px' }}>
                                <label>At which dilution(s) were you able to count discrete colonies from the whole blood samples? Please select all that apply.</label>
                                {['10^1X', '10^2X', '10^3X', '10^4X', 'Other', 'Discrete colonies were not observed in any of the tested dilutions'].map(dilution => (
                                    <div key={dilution} className="radio-option">
                                        <Checkbox
                                            inputId={dilution}
                                            value={dilution}
                                            checked={selectedDilutionsBlood.includes(dilution)}
                                            onChange={(e) => onDilutionChangeBlood(dilution, e.checked)}
                                        />
                                        <label htmlFor={dilution} className="p-checkbox-label">{dilution}</label>
                                        {selectedDilutionsBlood.includes(dilution) && dilution !== 'Discrete colonies were not observed in any of the tested dilutions' && (
                                            <InputText
                                                placeholder="Specify number of colonies"
                                                onChange={(e) => onColonyCountChangeBlood(dilution, e.target.value)}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="p-field form-question" style={{ padding: '3px' }}>
                                <label>Number of colony forming units for the blood sample (CFU/mL): </label>
                                <InputText value={cfuPerMlBlood.toFixed(2)} readOnly />
                            </div>

                            <div className="p-field form-question" style={{ padding: '3px' }}>
                                <label>At which dilution(s) were you able to count discrete colonies from the whole peritoneal fluid lavage (PLF) samples? Please select all that apply.</label>
                                {['10^2X', '10^3X', '10^4X', '10^5X', '10^6X', '10^7X', '10^8X', '10^9X', '10^10X'].map(dilution => (
                                    <div key={dilution} className="radio-option">
                                        <Checkbox
                                            inputId={dilution}
                                            value={dilution}
                                            checked={selectedDilutionsPlf.includes(dilution)}
                                            onChange={(e) => onDilutionChangePlf(dilution, e.checked)}
                                        />
                                        <label htmlFor={dilution} className="p-checkbox-label">{dilution}</label>
                                        {selectedDilutionsPlf.includes(dilution) && (
                                            <InputText
                                                placeholder="Specify number of colonies"
                                                onChange={(e) => onColonyCountChangePlf(dilution, e.target.value)}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="p-field form-question" style={{ padding: '3px' }}>
                                <label>Number of colony forming units for the PLF sample (CFU/mL): </label>
                                <InputText value={cfuPerMlPlf.toFixed(2)} readOnly />
                            </div>

                          <div className="form-question" style={{ padding: '3px' }}>
                          <label>Did you have to re-plate the PLF sample due to lack of discrete colonies in any of the dilutions tried last time?</label>
                          <div>
                            <RadioButton
                              inputId="yesReplate"
                              name="replatePlfSample"
                              value="Yes, the reported CFU/mL derived from the analysis of a frozen whole PLF aliquot"
                              {...register("replatePlfSample", { required: "This field is required." })}
                              checked={selectedReplatePlfSample === "Yes, the reported CFU/mL derived from the analysis of a frozen whole PLF aliquot"}
                              onChange={() => onReplatePlfSampleChange("Yes, the reported CFU/mL derived from the analysis of a frozen whole PLF aliquot")}
                            />
                            <label htmlFor="yesReplate" className="p-radiobutton-label">Yes, the reported CFU/mL derived from the analysis of a frozen whole PLF aliquot</label>
                          </div>
                          <div>
                            <RadioButton
                              inputId="noReplate"
                              name="replatePlfSample"
                              value="No, discrete colonies were countable in the initial unfrozen whole PLF sample"
                              {...register("replatePlfSample", { required: "This field is required." })}
                              checked={selectedReplatePlfSample === "No, discrete colonies were countable in the initial unfrozen whole PLF sample"}
                              onChange={() => onReplatePlfSampleChange("No, discrete colonies were countable in the initial unfrozen whole PLF sample")}
                            />
                            <label htmlFor="noReplate" className="p-radiobutton-label">No, discrete colonies were countable in the initial unfrozen whole PLF sample</label>
                          </div>
                          {errors.replatePlfSample && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                        </div>


                     <div className="form-question" style={{ padding: '3px' }}>
                        <label>Please upload a properly labelled picture of the whole blood culture plate and the PLF culture plate for this mouse subject. </label>
                          <input type="file" accept="image/*" onChange={handleImageChange} />
                           {selectedImage && <img src={selectedImage} alt="Selected" style={{ marginTop: '10px', maxWidth: '100%' }} />}
                      </div>


          <div className = "form-question p-field" style={{padding: "3px"}} >
          <label htmlFor="deviations" > Are there any other deviations from the protocol when performing the bacterial culture? Please specify</label>
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

export default BacterialCountafter24