import React from "react";
import { useForm } from "react-hook-form";
import { InputTextarea } from 'primereact/inputtextarea';
import { Panel } from 'primereact/panel';
import { Fieldset } from 'primereact/fieldset';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { RadioGroup } from './FormsComponents';
import '../styles.css';
import '../Formstyle.css';

function TreatmentInjectionForm() {
  const {control, register, handleSubmit, formState: { errors }, setValue, watch, clearErrors} = useForm();

  const selectedInjectionDone = watch("injectiondone");

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="Headings">
      <div className="body-content" style={{ padding: '5px' }}>
        <ScrollPanel style={{ width: '100%', height: '1000px' }}>
          <Fieldset legend="TREATMENT INJECTION" className="fieldset-legend">
            <Panel header="For any inquiries please contact Dr.Forough Jahandideh at fjahandideh@ohri.ca" toggleable className='custom-panel-fieldset'>
              <h3 style={{ marginTop: '0', marginBottom: '0' }}>Instructions:</h3>
              <ul style={{ marginTop: '0', marginBottom: '0' }}>
                <li>1) Read the wellness check & treatment protocol.</li>
                <li>2) Fill in the "Treatment check" form.</li>
                <li>3) Fill out the form below using the data from the "Treatment check" table and upload a picture or scan a copy of the table on the website.</li>
              </ul>
            </Panel>
          
            <form onSubmit={handleSubmit(onSubmit)} className='p-formgrid p-grid' style={{ padding: '10px' }}>

            <div className="form-question" style={{ padding: '3px' }}>
                <label>Please enter the email ID of the HQP completing the data entry:</label>
                <InputText className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("dataentryid", { required: "This field is required." })} />
                {errors.dataentryid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
              </div>

              <div className="form-question" style={{ padding: '3px' }}>
                <label>Please enter the email ID of the HQP that completed the "Treatment check" table:</label>
                <InputText className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("treatmentcheckid", { required: "This field is required." })} />
                {errors.treatmentcheckid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
              </div>

              <div className="form-question" style={{ padding: '3px' }}>
                <label>Please enter the user ID of the HQP who prepared the treatment syringes:</label>
                <InputText className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("treatmentsyringeprepid", { required: "This field is required." })} />
                {errors.treatmentsyringeprepid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
              </div>

              <div className="form-question" style={{ padding: '3px' }}>
                <label>Treatment syringe number (This should be identical to the mouse number):</label>
                <InputText className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("syringenumber", { required: "This field is required." })} />
                {errors.syringenumber && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
              </div>

              <div className="form-question" style={{ padding: '3px' }}>
                <label>Please enter the email ID of the HQP who injected this mouse with the treatment syringe:</label>
                <InputText className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("injectedHQP", { required: "This field is required." })} />
                {errors.injectedHQP && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
              </div>

              <div className="form-question" style={{ padding: '3px' }}>
                <label htmlFor='mouseinjectedtime'>Time the mouse got injected with the treatment syringe (military time)</label>
                <InputText type="time" className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("mouseinjectedtime", { required: "This field is required." })} />
                {errors.mouseinjectedtime && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
              </div>

              <RadioGroup
                id="syringeadministration"
                label="1. How was the treatment syringe administered to the mouse?"
                options={[
                  "The mouse received the injection while awake at T=4",
                  "The mouse was anesthetized before the injection at T=4"
                ]}
                register={register}
                watch={watch}
                setValue={setValue}
                clearErrors={clearErrors}
                errors={errors}
                hasOther={false}
              />

              <RadioGroup
                id="treatmentroute"
                label="2. What was the route of treatment administration?"
                options={[
                  "Subcutaneous (SC)",
                  "Other"
                ]}
                register={register}
                watch={watch}
                setValue={setValue}
                clearErrors={clearErrors}
                errors={errors}
                hasOther={true}
              />

              <RadioGroup
                id="injectiondone"
                label="3. Was the subcutaneous treatment injection done properly? (If not, please state what happened e.g. technical difficulties, partial leakage of syringe content, etc.)"
                options={[
                  "Yes, the injection was done properly, no concerns",
                  "No, the injection did not go ok"
                ]}
                register={register}
                watch={watch}
                setValue={setValue}
                clearErrors={clearErrors}
                errors={errors}
                hasOther={false}
              />
              {selectedInjectionDone === "No, the injection did not go ok" && (
                <div className="form-question" style={{ padding: '3px' }}>
                  <InputText
                    {...register('injectiondonereason', { required: "This field is required." })}
                    id="injectiondonereason"
                    placeholder="What went wrong......."
                  />
                  {errors.injectiondonereason && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                </div>
              )}

              <RadioGroup
                id="syringetype"
                label="4. What type of syringe was used for treatment injections?"
                options={[
                  "0.3mL insulin syringe or 0.5mL insulin syringe",
                  "Other"
                ]}
                register={register}
                watch={watch}
                setValue={setValue}
                clearErrors={clearErrors}
                errors={errors}
                hasOther={true}
              />

              <div className="form-question" style={{ padding: '3px' }}>
                <label htmlFor="deviations">Were there any other deviations to the protocol?</label>
                <InputTextarea id="deviations" {...register("deviations")} autoResize />
              </div>

              <div className="form-question" style={{ padding: '3px' }}>
                <label htmlFor="comments">Do you have any comments?</label>
                <InputTextarea id="comments" {...register("comments")} autoResize />
              </div>

              <div className="flex md:justify-content-end flex-wrap flex-container">
                <div className="flex-order-0 flex align-items-center justify-content-center">
                  <Button label="SAVE AND EXIT" className="p-button-lg form-blue-button-sm save-and-exit-btn" />
                </div>
                <div className="flex-order-1 flex align-items-center justify-content-center" style={{ width: '8rem' }}>
                  <Button label="SUBMIT" className="p-button-lg form-blue-button-sm" />
                </div>
              </div>
            </form>
          </Fieldset>
        </ScrollPanel>
      </div>
    </div>
  );
}

export default TreatmentInjectionForm;