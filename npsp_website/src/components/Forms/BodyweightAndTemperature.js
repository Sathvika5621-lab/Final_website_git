import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Fieldset } from 'primereact/fieldset';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioGroup, CheckboxGroup } from './FormsComponents';
import { Checkbox } from "primereact/checkbox";
import '../styles.css';
import '../Formstyle.css';

function BodyweightAndTemperature({ addMouseDetails }) {
    const { control, register, handleSubmit, formState: { errors }, setValue, watch, clearErrors } = useForm({
        defaultValues: {
            humaneEndpoint: false,
            criteria: {}
        }
    });

    const criteria = watch('criteria');
    const selectedHumaneEndpoint = watch('humaneEndpoint');

    const timePoints = [
        { label: 'T = -1', value: 'T = -1' },
        { label: 'T = 4', value: 'T = 4' },
        { label: 'T = 8', value: 'T = 8' },
    ];

    const onSubmit = data => {
        addMouseDetails(data);
        console.log(data);
    };

    const onSelectedCriteriaChange = (name) => {
        const newCriteria = { ...criteria, [name]: !criteria[name] };
        setValue('criteria', newCriteria);
    };

    return (
        <div className="form-container">
            <div className="body-content" style={{ padding: '5px' }}>
                <Fieldset legend="BODY WEIGHT AND TEMPERATURE FORM" className="fieldset-legend custom-panel-fieldset">
                    <Panel header="For any inquiries please contact Dr.Forough Jahandideh at fjahandideh@ohri.ca" toggleable className='custom-panel-fieldset'>
                        <h3 style={{ marginTop: '0', marginBottom: '0' }}>Instructions:</h3>
                        <ul style={{ marginTop: '0', marginBottom: '0' }}>
                            <li>Read the wellness check & treatment protocol. Read the core temperature protocol. Print and complete the “BW and T Check” table as well as the "Modified MSS". These tables should be filled at T = -1, T = 4 and T = 8 during mouse wellness checks.</li>
                            <li>Use the answers from the "BW and T Check" and "Modified MSS" tables to answer the questions below and upload a picture or scan a copy of the referenced filled table.</li>
                        </ul>
                    </Panel>
                    <form onSubmit={handleSubmit(onSubmit)} className='p-formgrid p-grid' style={{ padding: '10px' }}>
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

                        <div className="form-question" style={{ padding: '3px' }}>
                            <label htmlFor="bodyWeight">1. What was the body weight of this mouse ? (g):</label>
                            <InputText id="bodyWeight" {...register("bodyWeight", { required: "This field is required." })} />
                            {errors.bodyWeight && <p style={{ color: 'red' }}>*This field is required*</p>}
                        </div>

                        <div className="form-question" style={{ padding: '3px' }}>
                            <label htmlFor="coreTemperature">2. What was the core temperature of this mouse ? (°C):</label>
                            <InputText id="coreTemperature" {...register("coreTemperature", { required: "This field is required." })} />
                            {errors.coreTemperature && <p style={{ color: 'red' }}>*This field is required*</p>}
                        </div>

                        <RadioGroup
                            id="temperatureDevice"
                            label="3. Which device was used to take the core temperature of this mouse?"
                            options={["Intellibio Thermometer with Metal Rectal Probe", "Other"]}
                            register={register}
                            watch={watch}
                            setValue={setValue}
                            clearErrors={clearErrors}
                            errors={errors}
                            hasOther={true}
                        />

                        <RadioGroup
                            id="lubricant"
                            label="4. What was used as the lubricant for the temperature probe before taking the core temperature of this mouse?"
                            options={["Medline Lubricating Jelly", "Other", "I am not sure"]}
                            register={register}
                            watch={watch}
                            setValue={setValue}
                            clearErrors={clearErrors}
                            errors={errors}
                            hasOther={true}
                        />

                        <RadioGroup
                            id="complication"
                            label="5. Were there any complications encountered while taking the core temperature of this mouse?"
                            options={["No Complications", "Internal Bleeding", "I am not sure"]}
                            register={register}
                            watch={watch}
                            setValue={setValue}
                            clearErrors={clearErrors}
                            errors={errors}
                            hasOther={false}
                        />

                        <RadioGroup
                            id="thermometerCleaned"
                            label="6. Was the thermometer cleaned after taking the core temperature of this mouse?"
                            options={["Probe was wiped with 70% ethanol", "Probe was not cleaned"]}
                            register={register}
                            watch={watch}
                            setValue={setValue}
                            clearErrors={clearErrors}
                            errors={errors}
                            hasOther={false}
                        />

                        <RadioGroup
                            id="humaneEndpoint"
                            label="7. Did the mouse reach humane endpoint?"
                            options={["Yes", "No"]}
                            register={register}
                            watch={watch}
                            setValue={setValue}
                            clearErrors={clearErrors}
                            errors={errors}
                            hasOther={false}
                        />

                        {selectedHumaneEndpoint === "Yes" && (
                            <div className="form-question">
                                <h4>If yes, please indicate the pre-determined endpoint criteria reached:</h4>
                                {["Cumulative MSS", "Response To Stimuli", "Posture", "Piloerection", "Orbital Tightening", "Labored Breathing", "Hind Leg Tremors", "Weight Decrease", "Temperature Reduction"].map((item) => (
                                    <div key={item}>
                                        <Checkbox
                                            inputId={item}
                                            onChange={() => onSelectedCriteriaChange(item)}
                                            checked={criteria[item] || false}
                                        />
                                        <label htmlFor={item}>{item}</label>
                                    </div>
                                ))}
                            </div>
                        )}

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
            </div>
        </div>
    );
}

export default BodyweightAndTemperature;
