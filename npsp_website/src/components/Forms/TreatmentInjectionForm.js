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

function TreatmentInjectionForm() {
  const {control, register, handleSubmit, formState: { errors }, setValue, watch} = useForm();

  const onSubmit = (data) =>
  {
    console.log(data);
  };

  const selectedsyringeadministration = watch("syringeadministration");
  const selectedtreatmentroute = watch("treatmentroute");
  const selectedinjectiondone = watch ("injectiondone");
  const selectedsyringetype = watch ("syringetype")

  const onSelectedSyringeAdministrationChange = (value) =>
  {
    setValue('syringeadministration', value);
  }

  const onSelectedTreatmentRouteChange = (value) =>
  {
    setValue('treatmentroute', value);
    if (value != "Other"){
      setValue("otherTreatmentRoute", "")
    }
  };

  const onSelectedInjectionDoneChange = (value) =>
  {
    setValue('injectiondone', value);
    if (value != "No"){
      setValue("injectiondonereason", "")
    }
 
  }

  const onSelectedSyringeTypeChange = (value) =>
  {
    setValue ('syringetype', value);
    if (value != "Other") {
      setValue("otherSyringeType", "")
    }
  };


  return (
    <div className = "Headings">
    <div className = "body-content" style = {{padding : '5px'}}>
    <ScrollPanel style={{width : '100%', height: '1000px'}}>
      <Fieldset legend= "TREATMENT INJECTION" className="fieldset-legend">
      <form onSubmit={handleSubmit(onSubmit)} className='p-formgrid p-grid'>
          <div className="form-question" style = {{padding : '5px'}}>
          <label>Please enter the user ID of the HQP who prepared the treatment syringes:</label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("treatmentsyringeprepid", { required: "This field is required." })} />
          {errors.treatmentsyringeprepid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
            </div>

            <div className="form-question" style = {{padding : '5px'}}>
          <label>Treatment syringe number(This should be identical to the mouse number): </label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("syringenumber", { required: "This field is required." })} />
          {errors.syringenumber && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
            </div>

            <div className="form-question" style = {{padding : '5px'}}>
          <label>Please enter the user ID of the HQP who injected this mouse with the treatment syringe: </label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("injectedHQP", { required: "This field is required." })} />
          {errors.injectedHQP && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
            </div>


          <div className="form-question" style={{ padding: '3px' }}>
          <label htmlFor='mouseinjectedtime'>Time the mouse got injected with the treatment syringe (military time) </label>
          <input type = "time" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"{...register("mouseinjectedtime", { required: "This field is required." })} />
          {errors.mouseinjectedtime && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
         </div>


         <div  className = "form-question" style={{ padding: '3px' }}>
          <label>How was the treatment syringe administered to the mouse? </label>
          <div className="radio-option">
            <RadioButton
              inputId="awake"
              name="syringeadministration"
              value="The mouse received the injection while awake at T=4"
              {...register("syringeadministration", { required: "This field is required." })}
              checked={selectedsyringeadministration === "The mouse received the injection while awake at T=4"}
              onChange={() => onSelectedSyringeAdministrationChange("The mouse received the injection while awake at T=4")}
            />
            <label htmlFor="awake" className="p-radiobutton-label">The mouse received the injection while awake at T=4</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="anesthetized"
              name="syringeadministration"
              value="The mouse was anesthetized before the injection at T=4"
              {...register("syringeadministration", { required: "This field is required." })}
              checked={selectedsyringeadministration === "The mouse was anesthetized before the injection at T=4"}
              onChange={() => onSelectedSyringeAdministrationChange("The mouse was anesthetized before the injection at T=4")}
            />
            <label htmlFor="anesthetized" className="p-radiobutton-label">The mouse was anesthetized before the injection at T=4</label>
          </div>
          
          {errors.anesthetized && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>What was the route of treatment administration?</label>
          <div className="radio-option">
            <RadioButton
              inputId="subcutaneous"
              name="treatmentroute"
              value="Subcutaneous (SC)"
              {...register("treatmentroute", { required: "This field is required." })}
              checked={selectedtreatmentroute === "Subcutaneous (SC)"}
              onChange={() => onSelectedTreatmentRouteChange("Subcutaneous (SC)")}
            />
            <label htmlFor="subcutaneous" className="p-radiobutton-label">Subcutaneous (SC)</label>
          </div>
          
          <div className="radio-option">
            <RadioButton
              inputId="other"
              name="treatmentroute"
              value="Other"
              {...register("treatmentroute", { required: "This field is required." })}
              checked={selectedtreatmentroute === "Other"}
              onChange={() => onSelectedTreatmentRouteChange("Other")}
            />
            <label htmlFor="other" className="p-radiobutton-label">Other:</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectedtreatmentroute === "Other" && (
            <InputText 
            {...register('otherTreatmentRoute ', {required:"This field is required."})}
            id="otherTreatmentRoute"
            placeholder="Specify...."
          />
          )}
          </div>
          {errors.treatmentroute && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.otherTreatmentRoute && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>


        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>Was the subcutaneous treatment injection done correctly? (If not, please state what happened e.g. technical difficulties, partial leakage of syringe content, etc. )</label>
          <div className="radio-option">
            <RadioButton
              inputId="donecorrectly"
              name="injectiondone"
              value="Yes, the injection was done correctly"
              {...register("injectiondone", { required: "This field is required." })}
              checked={selectedinjectiondone === "Yes, the injection was done correctly"}
              onChange={() => onSelectedInjectionDoneChange("Yes, the injection was done correctly")}
            />
            <label htmlFor="injectiondone" className="p-radiobutton-label">Yes, the injection was done correctly</label>
          </div>
          
          <div className="radio-option">
            <RadioButton
              inputId="no"
              name="injectiondone"
              value="No"
              {...register("injectiondone", { required: "This field is required." })}
              checked={selectedinjectiondone === "No"}
              onChange={() => onSelectedInjectionDoneChange("No")}
            />
            <label htmlFor="no" className="p-radiobutton-label">No</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectedinjectiondone === "No" && (
            <InputText 
            {...register('injectiondonereason ', {required:"This field is required."})}
            id="injectiondonereason"
            placeholder="What went wrong......."
          />
          )}
          </div>
          {errors.injectiondone && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.injectiondonereason && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>


        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>What type of syringe was used for treatment injections?</label>
          <div className="radio-option">
            <RadioButton
              inputId="insulinsyringe"
              name="syringetype"
              value="0.3mL insulin syringe or 0.5mL insulin syringe"
              {...register("syringetype", { required: "This field is required." })}
              checked={selectedsyringetype === "0.3mL insulin syringe or 0.5mL insulin syringe"}
              onChange={() => onSelectedSyringeTypeChange("0.3mL insulin syringe or 0.5mL insulin syringe")}
            />
            <label htmlFor="insulinsyringe" className="p-radiobutton-label">0.3mL insulin syringe or 0.5mL insulin syringe</label>
          </div>
          
          <div className="radio-option">
            <RadioButton
              inputId="other"
              name="syringetype"
              value="Other"
              {...register("syringetype", { required: "This field is required." })}
              checked={selectedsyringetype === "Other"}
              onChange={() => onSelectedSyringeTypeChange("Other")}
            />
            <label htmlFor="other" className="p-radiobutton-label">Other:</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectedsyringetype === "Other" && (
            <InputText 
            {...register('otherSyringeType ', {required:"This field is required."})}
            id="otherSyringeType"
            placeholder="Specify...."
          />
          )}
          </div>
          {errors.syringetype && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.otherSyringeType && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div className="p-field form-question " style={{padding: "3px"}} >
          <label htmlFor="deviations" >Were there any other deviations to the protocol? </label>
          <div className="p-col">
               <InputTextarea id="deviations" {...register("deviations")}  autoResize />
          </div>
        </div>
    
        <div className="p-field form-question" style={{padding: "3px"}}>
          <label htmlFor="comments">Do you have any comments?</label>
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

export default TreatmentInjectionForm