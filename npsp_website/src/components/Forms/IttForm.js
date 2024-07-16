import React from 'react';
import { useForm } from 'react-hook-form';
import { Fieldset } from 'primereact/fieldset';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioGroup, CheckboxGroup } from './FormsComponents';
import '../styles.css';
import '../Formstyle.css';

function IttForm({ addMouseDetails }) {
    const { register, handleSubmit, formState: { errors }, setValue, watch, clearErrors } = useForm();

    const splitIntoCage = watch('splitintocage'); 

    const onSubmit = data => 
      {
        addMouseDetails(data); 
        console.log(data);
      }
    return (
        <div className="form-container">
            <div className="body-content" style={{ padding: '5px' }}>
                <Fieldset legend="ITT Form" className="fieldset-legend custom-panel-fieldset">
                    <Panel header="For any inquiries please contact Dr.Forough Jahandideh at fjahandideh@ohri.ca" toggleable className='custom-panel-fieldset'>
                        <h3 style={{ marginTop: '0', marginBottom: '0' }}>Instructions:</h3>
                        <ul style={{ marginTop: '0', marginBottom: '0' }}>
                            <li>Print and complete the “ITT Check” form. This form should be filled 48 hours prior to experiment day.</li>
                            <li>Use the answers of the “ITT Check” table to answer the questions below and upload a picture or scan a copy of the referenced filled table within 24 hours.</li>
                        </ul>
                    </Panel>
                    <form onSubmit={handleSubmit(onSubmit)} className='p-formgrid p-grid' style={{ padding: '10px' }}>
                        <div className="form-question" style={{ padding: '5px' }}>
                            <label>Please enter the user ID of the HQP completing the data entry:</label>
                            <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("syringeprepid", { required: "This field is required." })} />
                            {errors.syringeprepid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                        </div>

                        <div className="form-question" style={{ padding: '3px' }}>
                            <label>Please enter the user ID of the HQP that completed the "ITT Check" table:</label>
                            <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("wellnesscheckid", { required: "This field is required." })} />
                            {errors.wellnesscheckid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                        </div>

                        {/* <RadioGroup
                            id="experimentsite"
                            label="Please select a site"
                            options={["Ottawa", "McMaster", "Western", "Manitoba", "Alberta", "Calgary"]}
                            register={register}
                            watch={watch}
                            setValue={setValue}
                            errors={errors}
                            clearErrors={clearErrors}
                            hasOther={false}
                        />

                        <div className="form-question" style={{ display: 'flex', justifyContent: 'space-between', padding: '3px' }}>
                            <div style={{ display: 'flex', flex: '1', marginRight: '10px', alignItems: 'center' }}>
                                <label htmlFor="fecalslurrydose" style={{ marginRight: '8px' }}>Fecal slurry dose (mg of slurry/g of mouse):</label>
                                <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("fecalslurrydose", { required: "This field is required." })} />
                                {errors.fecalslurrydose && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                            </div>
                        </div>

                        <div className="form-question" style={{ padding: '3px' }}>
                            <label>How many mice will be used on the planned study date?</label>
                            <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("noofmice", { required: "This field is required." })} />
                            {errors.noofmice && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                        </div>

                        <div className="form-question" style={{ padding: '3px' }}>
                            <label>How many male mice will be used on the study date?</label>
                            <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("malemice", { required: "This field is required." })} />
                            {errors.malemice && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                        </div>

                        <div className="form-question" style={{ padding: '3px' }}>
                            <label>How many female mice will be used on the study date?</label>
                            <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("femalemice", { required: "This field is required." })} />
                            {errors.femalemice && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                        </div> */}

                        <RadioGroup
                            id="sexofmice"
                            label="1. What is the biological sex of this mouse?"
                            options={["Male", "Female"]}
                            register={register}
                            watch={watch}
                            setValue={setValue}
                            errors={errors}
                            clearErrors={clearErrors}
                            hasOther={false}
                        />

                          <div className="p-field form-question p-col-12" style={{ padding: '3px' }}>
                              <label>2. What is the date of birth (DOB) for this mouse? </label>
                              <InputText type="date" {...register("dateofbirth", { required: "This field is required." })} />
                              {errors.dateofbirth && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                          </div>



                        <div className="form-question" style={{ padding: '3px' }}>
                            <label>3. What is the cage ID of the cage this mouse is being held in?</label>
                            <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("cageid", { required: "This field is required." })} />
                            {errors.cageid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                        </div>

                        <div className="p-field form-question p-col-12" style={{ padding: '3px' }}>
                              <label>4. Date this mouse was received? </label>
                              <InputText type="date" {...register("mousereceived", { required: "This field is required." })} />
                              {errors.mousereceived && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                          </div>



                     
                        <RadioGroup
                              id="exclusioncriteria"
                              label="5. Does this mouse meet the exclusion criteria for the study (BW < 16g or >30g, labored breathing, hind limb tremor, or other serious health concerns?)"
                              options={["Yes", "No"]}
                              register={register}
                              watch={watch}
                              setValue={setValue}
                              errors={errors}
                              clearErrors={clearErrors}
                              hasOther={true} 
                          />

                          <RadioGroup
                            id="removedfromstudy"
                            label="6. If the mouse met the exclusion criteria, was it removed from the study (sacrificed)?"
                            options={["Yes", "No"]}
                            register={register}
                            watch={watch}
                            setValue={setValue}
                            errors={errors}
                            clearErrors={clearErrors}
                            hasOther={false}
                        />

                        <RadioGroup
                            id="splitintocage"
                            label="7. Was this mouse split into a new cage due to fighting?"
                            options={["Yes", "No"]}
                            register={register}
                            watch={watch}
                            setValue={setValue}
                            errors={errors}
                            clearErrors={clearErrors}
                            hasOther={false}
                        />

                        {splitIntoCage === "Yes" && (
                            <div className="p-field form-question p-col-12" style={{ padding: '3px' }}>
                                <label> Date the mouse was split into a new cage (single caged) </label>
                                <InputText type="date" {...register("cagesplitdate", { required: "This field is required." })} />
                                {errors.cagesplitdate && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                            </div>
                        )}


                        <RadioGroup
                            id="noofmiceincage"
                            label=". How many mice are in the cage this mouse is held in?"
                            options={["Two", "Three", "Other"]}
                            register={register}
                            watch={watch}
                            setValue={setValue}
                            errors={errors}
                            clearErrors={clearErrors}
                            hasOther={true}
                        />

                        

                        <div className="form-question" style={{ padding: '3px' }}>
                            <label>
                                <input type="checkbox" {...register("communicatedwithcoordinator", { required: "This field is required." })} />
                                I confirm that we have communicated with NPSP coordinator about our scheduled experiments
                            </label>
                            {errors.communicatedwithcoordinator && <p style={{ color: 'red' }}>{errors.communicatedwithcoordinator.message}</p>}
                        </div>

                        <div className="p-field form-question" style={{ padding: "3px" }}>
                            <label htmlFor="comments">Do you have any comments to add?</label>
                            <div className="p-col">
                                <InputTextarea id="comments" {...register("comments")} autoResize />
                            </div>
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
            </div>
        </div>
    );
}

export default IttForm;
