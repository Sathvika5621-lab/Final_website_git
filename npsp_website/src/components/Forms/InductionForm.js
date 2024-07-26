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

function InductionForm({ addMouseDetails }) {
    const { register, handleSubmit, formState: { errors }, setValue, watch, clearErrors } = useForm();
    
    const selectedStaggeringDone = watch('staggeringdone');

    const onSubmit = data => {
        addMouseDetails(data);
        console.log(data);
    };

    return (
        <div className="form-container">
            <div className="body-content" style={{ padding: '5px' }}>
                <ScrollPanel style={{ width: '100%', height: '1000px' }}>
                    <Fieldset legend="INDUCTION FORM" className="fieldset-legend custom-panel-fieldset">
                        <Panel header="For any inquiries please contact Dr.Forough Jahandideh at fjahandideh@ohri.ca" toggleable className='custom-panel-fieldset'>
                            <h3 style={{ marginTop: '0', marginBottom: '0' }}>Instructions:</h3>
                            <ul style={{ marginTop: '0', marginBottom: '0' }}>
                                <li>1) Read the induction protocol.</li>
                                <li>2) Fill in the "Induction Form" at time zero.</li>
                                <li>3) Fill out the form below using the data from the "Induction Check" tabel and upload a picture or scan a copy of the table on the website.</li>
                            </ul>
                        </Panel>
                        <form onSubmit={handleSubmit(onSubmit)} className='p-formgrid p-grid' style={{ padding: '10px' }}>
                            <div className="form-question" style={{ padding: '3px' }}>
                                <label>Please enter the email ID of the HQP completing the data entry: </label>
                                <InputText className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("daatentryid", { required: "This field is required." })} />
                                {errors.daatentryid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                            </div>
                            <div className="form-question" style={{ padding: '3px' }}>
                                <label>Please enter the email ID(s) of the HQP(s) that completed the "Induction Check" table: </label>
                                <InputText className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("inductioncheckid", { required: "This field is required." })} />
                                {errors.inductioncheckid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                            </div>
                            <div className="form-question" style={{ padding: '3px' }}>
                                <label>Please enter the email ID of the HQP who prepared the syringes: </label>
                                <InputText className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("syringeprepid", { required: "This field is required." })} />
                                {errors.syringeprepid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                            </div>

                            <div className="form-question" style={{ padding: '3px' }}>
                                <label>Please enter the email ID(s) of the HQP(s) who completed the wellness check at T-1:</label>
                                <InputText className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("syringeprepid", { required: "This field is required." })} />
                                {errors.wellnesscheckid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                            </div>

                            <div className="form-question" style={{ padding: '3px' }}>
                                <label>Please enter the email ID(s) of the HQP who injected the mouse at T=0: </label>
                                <InputText className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("mouseinjectid", { required: "This field is required." })} />
                                {errors.mouseinjectid && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                            </div>

                            <div className="form-question" style={{ padding: '3px' }}>
                                <label>Sepsis induction syringe number (This should be identical to the mouse number):</label>
                                <InputText className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("syringenum", { required: "This field is required." })} />
                                {errors.syringenum && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                            </div>

                            <RadioGroup
                                id="anesthesia"
                                label="1. Was the mouse anesthetized before the induction of the fecal slurry?"
                                options={[
                                    "The mouse was anesthetized with 5% isoflurane as indicated in the SOP",
                                    "The mouse was anesthetized but with another agent (other than isoflurane)",
                                    "The mouse was not anesthetized before fecal slurry injection"
                                ]}
                                register={register}
                                watch={watch}
                                setValue={setValue}
                                clearErrors={clearErrors}
                                errors={errors}
                                hasOther={false}
                            />

                            <RadioGroup
                                id="massagedone"
                                label="2. Was the abdomen massaged after injection of the fecal slurry?"
                                options={[
                                    "For approximately 10 seconds",
                                    "The abdomen was not massaged after fecal slurry injection"
                                ]}
                                register={register}
                                watch={watch}
                                setValue={setValue}
                                clearErrors={clearErrors}
                                errors={errors}
                                hasOther={false}
                            />

                            <div className="form-question" style={{ padding: '3px' }}>
                                <label>3. Time of sepsis induction (injection of fecal slurry)? (Military time)</label>
                                <InputText type="time" {...register("sepsisinductiontime", { required: "This field is required." })} />
                                {errors.sepsisinductiontime && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                            </div>

                            <RadioGroup
                                id="injectionsite"
                                label="4. Was the injection administered into the intra-peritoneal(IP) cavity or was it a subcutaneous(SC) injection?"
                                options={[
                                    "Peritoneal cavity injection – with no observed leakages/skin bulge",
                                    "Subcutaneous injection – A noticeable bulge was observed post-injection",
                                    "Partial subcutaneous injection – There might have been a partial subcutaneous injection, as evidenced by slight leakage or a skin bulge",
                                    "Not sure but something went wrong during injection and the animal is not ok"
                                ]}
                                register={register}
                                watch={watch}
                                setValue={setValue}
                                clearErrors={clearErrors}
                                errors={errors}
                                hasOther={false}
                            />

                            <RadioGroup
                                id="inductionobservation"
                                label="5. When injecting fecal slurry into the peritoneal cavity and retracting the syringe plunger, what observations were made?"
                                options={[
                                    "Blood was drawn into the syringe",
                                    "Fluid other than blood was drawn into the syringe",
                                    "No fluid was drawn into the syringe",
                                    "Plunger was not pulled back before injection"
                                ]}
                                register={register}
                                watch={watch}
                                setValue={setValue}
                                clearErrors={clearErrors}
                                errors={errors}
                                hasOther={false}
                            />

                            <RadioGroup
                                  id = "issuesnoticed"
                                  label = "6. Did you encounter any issues while the mouse was anesthetized and fecal slurry or the vehicle was injected?"
                                  options={[
                                    "No, the mouse emerged from anesthesia within normal time and sent back to its cage",
                                    "Yes, the mouse was very sick and lethargic after anesthesia and did not improve over time",
                                    "Yes, the mouse never emerged from anesthesia and was euthanized",
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
                                id="staggeringdone"
                                label="7. Were the mice injections staggered?"
                                options={[
                                    "Yes",
                                    "No, all mice were injected with fecal slurry at the same time one after each"
                                ]}
                                register={register}
                                watch={watch}
                                setValue={setValue}
                                clearErrors={clearErrors}
                                errors={errors}
                                hasOther={false}
                            />
                            {selectedStaggeringDone === "Yes" && (
                                <div className="form-question" style={{ padding: '3px' }}>
                                    <label>Please indicate how much time in between the next mouse injection:</label>
                                    <InputText {...register('staggeringtimedifference', { required: "This field is required." })} placeholder="Specify...." />
                                    {errors.staggeringtimedifference && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                                </div>
                            )}

                            <RadioGroup
                                id="needlecolor"
                                label="8. What is the color of the needle used for the injection (fecal slurry or dextrose-glycerol)?"
                                options={[
                                    "Beige",
                                    "Clear",
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
                                id="mouseplacement"
                                label="9. After the injection of fecal slurry, where was the mouse placed?"
                                options={[
                                    "The mouse was housed in a clean standard cage (shoe box, non-ventilated) with similar bedding and housing materials from the original cage, excluding the cardboard hut",
                                    "Mouse was returned to its original (ventilated) cage",
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
                                id="cagetemperature"
                                label="10. How was the cage maintained after induction"
                                options={[
                                    "At a warm temperature half of the bottom of the cage was positioned on a warming blanket/pad attached to a circulating water bath.",
                                    "The cage was left on the bench without external heating"
                                ]}
                                register={register}
                                watch={watch}
                                setValue={setValue}
                                clearErrors={clearErrors}
                                errors={errors}
                                hasOther={false}
                            />

                        <div className="p-field form-question" style={{ padding: "3px" }}>
                            <label htmlFor="deviations">Were there any other deviations from the protocol when performing the above tasks?</label>
                            <div className="p-col">
                                <InputTextarea id="deviations" {...register("deviations")} autoResize />
                            </div>
                        </div>

                        <div className="p-field form-question" style={{ padding: "3px" }}>
                            <label htmlFor="comments">Did you have any comments to add?</label>
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
                </ScrollPanel>
            </div>
        </div>
    );
}

export default InductionForm;
