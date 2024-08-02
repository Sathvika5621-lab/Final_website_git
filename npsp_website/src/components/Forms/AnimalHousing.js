import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputTextarea } from 'primereact/inputtextarea';
import { Panel } from 'primereact/panel';
import { Fieldset } from 'primereact/fieldset';
import { ScrollPanel } from "primereact/scrollpanel";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Header from "../Header";
import "../styles.css";
import "../Formstyle.css";
import { useNavigate } from 'react-router-dom';
import { RadioGroup, CheckboxGroup } from './FormsComponents.js';

const AnimalHousing = ({ addMouseDetails }) => {
    const { register, handleSubmit, formState: { errors }, watch, setValue, clearErrors } = useForm();
    const [experimentNumbers, setExperimentNumbers] = useState(() => {
        const storedData = localStorage.getItem('experimentNumbers');
        return storedData ? JSON.parse(storedData) : {
            '1-P': {}, '1-S': {}, '2-P': {}, '2-S': {}, 
            '3-P': {}, '3-S': {}, '4-P': {}, '4-S': {}, 
            '5-P': {}, '5-S': {}, '6-P': {}, '6-S': {}
        };
    });

    const [lastMouseNumber, setLastMouseNumber] = useState(() => {
        const storedData = localStorage.getItem('lastMouseNumber');
        return storedData ? JSON.parse(storedData) : {
            '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0
        };
    });
    
    let navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('experimentNumbers', JSON.stringify(experimentNumbers));
    }, [experimentNumbers]);

    useEffect(() => {
        localStorage.setItem('lastMouseNumber', JSON.stringify(lastMouseNumber));
    }, [lastMouseNumber]);

    const onSubmit = (data) => {
        const { malemice, femalemice, deliverydate, site, studydates, slurrydose, endpoint, studytype } = data;
        const newMouseDetails = [];
        const centerCodes = {
            Ottawa: '1', McMaster: '2', Western: '3', Manitoba: '4', Alberta: '5', Calgary: '6'
        };

        const centerCode = centerCodes[site];
        const studyTypeCode = studytype === "Pilot study" ? 'P' : 'S';
        const studyDate = new Date(studydates).toISOString().split('T')[0];
        const experimentKey = `${centerCode}-${studyTypeCode}`;

        // Initialize or update experiment day count based on study date
        let experimentInfo = { ...experimentNumbers[experimentKey] };

        if (!experimentInfo[studyDate]) {
            experimentInfo[studyDate] = Object.keys(experimentInfo).length + 1;
        }

        // Update experiment numbers state
        setExperimentNumbers(prevState => ({
            ...prevState,
            [experimentKey]: experimentInfo
        }));

        const experimentDayCode = String(experimentInfo[studyDate]).padStart(2, '0');
        const mousePrefix = `NPSP-C${centerCode}-${studyTypeCode}${experimentDayCode}`;

        // Get the last mouse number used for this site, and start from the next number
        let mouseCount = lastMouseNumber[centerCode] + 1;

        for (let i = 0; i < parseInt(malemice); i++) {
            newMouseDetails.push({
                mouse_id: `${mousePrefix}-M${String(mouseCount).padStart(2, '0')}`,
                site,
                sex: 'Male',
                shipmentdate: deliverydate,
                studydates,
                slurrydose,
                endpoint,
                studytype
            });
            mouseCount++;
        }

        for (let i = 0; i < parseInt(femalemice); i++) {
            newMouseDetails.push({
                mouse_id: `${mousePrefix}-F${String(mouseCount).padStart(2, '0')}`,
                site,
                sex: 'Female',
                shipmentdate: deliverydate,
                studydates,
                slurrydose,
                endpoint,
                studytype
            });
            mouseCount++;
        }

        // Update the last mouse number used for this site
        setLastMouseNumber(prevState => ({
            ...prevState,
            [centerCode]: mouseCount - 1
        }));

        addMouseDetails(newMouseDetails);
        navigate('/home-page');
    };

    return (
        <div className="Headings">
            <Header userName="Jane Doe" />
            <div className="body-content" style={{ padding: '5px' }}>
                <ScrollPanel style={{ width: '100%', height: '1000px' }}>
                    <Fieldset legend="ANIMAL HOUSING FORM" className="fieldset-legend">
                        <form onSubmit={handleSubmit(onSubmit)} className='p-formgrid p-grid'>
                            <Panel header="For any inquiries please contact Dr.Forough Jahandideh at fjahandideh@ohri.ca" toggleable>
                                <h3 style={{ marginTop: '0', marginBottom: '0' }}>Instructions: </h3>
                                <ul style={{ marginTop: '0', marginBottom: '0' }}>
                                    <li>Print and complete the “Animal and Housing Check” table. This table should be filled when mice arrive at the facility (i.e., 2-4 weeks prior to planned study date).</li>
                                    <li>Use the answers of the “Animal and Housing Check” table to answer the questions below and upload a picture or scan a copy of the referenced filled table within 24 hours.</li>
                                </ul>
                            </Panel>
                            <Panel header="PERSONAL AND EXPERIMENT INFORMATION" style={{ padding: '2px' }}>
                                {/* <div className="form-question" style={{ padding: '3px' }}>
                                    <label>1. Please enter the email ID of the HQP completing the data entry in the online database: </label>
                                    <InputText className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("dataentry", { required: "This field is required." })} />
                                    {errors.dataentry && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                                </div>

                                <div className="form-question" style={{ padding: '3px' }}>
                                    <label>2. Please enter the email ID of the HQP that manually completed “Animal Housing Check” table: </label>
                                    <InputText className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("housingcheck", { required: "This field is required." })} />
                                    {errors.housingcheck && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                                </div> */}

                                <RadioGroup
                                    id="site"
                                    label="3. Please select the site "
                                    options={["Ottawa", "McMaster", "Western", "Manitoba", "Alberta", "Calgary"]}
                                    register={register}
                                    watch={watch}
                                    setValue={setValue}
                                    clearErrors={clearErrors}
                                    errors={errors}
                                    hasOther={true}
                                />

                                <div className="p-field form-question p-col-12" style={{ padding: '3px' }}>
                                    <label>4. Animal delivery date (YYYY-MM-DD): </label>
                                    <InputText type="date" {...register("deliverydate", { required: "This field is required." })} />
                                    {errors.deliverydate && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                                </div>

                                <div className="form-question" style={{ padding: '3px' }}>
                                    <label>5. Number of male mice in this shipment: </label>
                                    <InputText type="number" {...register("malemice", { required: "This field is required." })} />
                                    {errors.malemice && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                                </div>

                                <div className="form-question" style={{ padding: '3px' }}>
                                    <label>6. Number of female mice in this shipment: </label>
                                    <InputText type="number" {...register("femalemice", { required: "This field is required." })} />
                                    {errors.femalemice && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                                </div>

                                <div className="form-question" style={{ padding: '3px' }}>
                                    <label>7. Planned study date(s) (YYYY-MM-DD): </label>
                                    <InputText type="date" {...register("studydates", { required: "This field is required." })} />
                                    {errors.studydates && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                                </div>
                                <div className="form-question" style={{ padding: '3px' }}>
                                    <label>8. Fecal slurry dose (mg of slurry/g of mouse): </label>
                                    <InputText className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("slurrydose", { required: "This field is required." })} />
                                    {errors.slurrydose && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                                </div>

                                <div className="form-question" style={{ padding: '3px' }}>
                                    <label>9. Study endpoint (hours): </label>
                                    <InputText className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("endpoint", { required: "This field is required." })} />
                                    {errors.endpoint && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                                </div>

                                <RadioGroup
                                    id="studytype"
                                    label="10. Type of the Study"
                                    options={["Pilot study", "Main study"]}
                                    register={register}
                                    watch={watch}
                                    setValue={setValue}
                                    clearErrors={clearErrors}
                                    errors={errors}
                                    hasOther={true}
                                />
{/* 
                                <RadioGroup
                                    id="strain"
                                    label="11. What is the strain of the mice?"
                                    options={["C57BL/6", "Other"]}
                                    register={register}
                                    watch={watch}
                                    setValue={setValue}
                                    errors={errors}
                                    clearErrors={clearErrors}
                                    hasOther={true}
                                />

                                <RadioGroup
                                    id="animalprovider"
                                    label="12. What is the source/animal provider?"
                                    options={["Charles River(CR)Center-NPSP arrangements", "Charles River(CR)Center-other than NPSP arrangements", "Other"]}
                                    register={register}
                                    watch={watch}
                                    setValue={setValue}
                                    errors={errors}
                                    clearErrors={clearErrors}
                                    hasOther={true}
                                />

                                <RadioGroup
                                    id="cagetype"
                                    label="13. What is the type of cage are the mice being held in?"
                                    options={["Ventilated", "Non-Ventilated", "Other"]}
                                    register={register}
                                    watch={watch}
                                    setValue={setValue}
                                    errors={errors}
                                    clearErrors={clearErrors}
                                    hasOther={true}
                                />

                                <RadioGroup
                                    id="treatedwater"
                                    label="14. What type of treated water is being fed to the mice?"
                                    options={["Ad Libitum RO Water", "Other"]}
                                    register={register}
                                    watch={watch}
                                    setValue={setValue}
                                    errors={errors}
                                    clearErrors={clearErrors}
                                    hasOther={true}
                                />

                                <RadioGroup
                                    id="typeoffood"
                                    label="15. What type of food is being fed to the mice?"
                                    options={["Irradiated Envigo 2919 chow", "Other"]}
                                    register={register}
                                    watch={watch}
                                    setValue={setValue}
                                    errors={errors}
                                    clearErrors={clearErrors}
                                    hasOther={true}
                                />

                                <CheckboxGroup
                                    id="enrichmentmaterials"
                                    label="15. Does the cages have the following enrichment materials? (Select all that apply)"
                                    options={["Cardboard Hut", "Nestlet", "Loose Crinkle Paper", "Aspen wood chip bedding", "Other"]}
                                    register={register}
                                    watch={watch}
                                    setValue={setValue}
                                    errors={errors}
                                    clearErrors={clearErrors}
                                    hasOther={true}
                                />

                                <div className="form-question" style={{ padding: '3px' }}>
                                    <label>16. What is the humidity of the room the mice are housed in? (%)</label>
                                    <InputText className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("humidity", { required: "This field is required." })} />
                                    {errors.humidity && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                                </div>

                                <div className="form-question" style={{ padding: '3px' }}>
                                    <label>17. What is the temperature of the room the mice are housed in? (°C)</label>
                                    <InputText className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("temperature", { required: "This field is required." })} />
                                    {errors.temperature && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                                </div>

                                <RadioGroup
                                    id="noiselevel"
                                    label="18. What is the noise level at your animal facility?"
                                    options={["Low Noise Area", "Medium Noise Area", "High Noise Area"]}
                                    register={register}
                                    watch={watch}
                                    setValue={setValue}
                                    errors={errors}
                                    clearErrors={clearErrors}
                                    hasOther={false}
                                />

                                <RadioGroup
                                    id="racksarrangement"
                                    label="19. How are the individual ventilated cage racks for mice arranged in your animal facility?"
                                    options={["Individual PODs within a room", "small single PI rooms", "Large multi-PI rooms", "Other"]}
                                    register={register}
                                    watch={watch}
                                    setValue={setValue}
                                    errors={errors}
                                    clearErrors={clearErrors}
                                    hasOther={true}
                                />

                                <div className="form-question" style={{ padding: '3px' }}>
                                    <label>20. Please indicate the start time of the light cycle (military time)</label>
                                    <InputText type="time" {...register("lightcyclestarttime", { required: "This field is required." })} />
                                    {errors.lightcyclestarttime && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                                </div>

                                <RadioGroup
                                    id="lightcycle"
                                    label="21. What type of light cycle is used?"
                                    options={["Non-Reverse", "Reverse"]}
                                    register={register}
                                    watch={watch}
                                    setValue={setValue}
                                    errors={errors}
                                    clearErrors={clearErrors}
                                    hasOther={false}
                                />

                                <div className="form-question" style={{ padding: '3px' }}>
                                    <label>
                                        <input type="checkbox" {...register("applicabletoall", { required: "This field is required." })} />
                                        Animal housing information is applicable to all mice in this shipment (if not, please fill out the form for every mouse).
                                    </label>
                                    {errors.applicabletoall && <p style={{ color: 'red' }}>{errors.applicabletoall.message}</p>}
                                </div>

                                <div className="form-question" style={{ padding: '3px' }}>
                                    <label>
                                        <input type="checkbox" {...register("housingPerCage", { required: "This field is required." })} />
                                        Mice are housed 2 or 3 per cage.
                                    </label>
                                    {errors.housingPerCage && <p style={{ color: 'red' }}>{errors.housingPerCage.message}</p>}
                                </div>

                                <div className="form-question" style={{ padding: '3px' }}>
                                    <label>
                                        <input type="checkbox" {...register("npspCoordinatorCommunication", { required: "This field is required." })} />
                                        I confirm that we have communicated with NPSP coordinator about our scheduled experiments.
                                    </label>
                                    {errors.npspCoordinatorCommunication && <p style={{ color: 'red' }}>{errors.npspCoordinatorCommunication.message}</p>}
                                </div> */}

                                {/* <div className="form-question p-field" style={{ padding: "3px" }}>
                                    <label htmlFor="deviations">Are there any other deviations from the protocol during enrollment?</label>
                                    <div className="p-col">
                                        <InputTextarea id="deviations" {...register("deviations")} autoResize />
                                    </div>
                                </div>

                                <div className="form-question p-field" style={{ padding: "3px" }}>
                                    <label htmlFor="comments">Do you have any comments to add?</label>
                                    <div className="p-col">
                                        <InputTextarea id="comments" {...register("comments")} autoResize />
                                    </div>
                                </div> */}

                                <div className="flex md:justify-content-end flex-wrap flex-container">
                                    <div className="flex-order-0 flex align-items-center justify-content-center">
                                        <Button label="SAVE AND EXIT" className="p-button-lg form-blue-button-sm save-and-exit-btn" />
                                    </div>
                                    <div className="flex-order-1 flex align-items-center justify-content-center" style={{ width: '8rem' }}>
                                        <Button label="SUBMIT" className="p-button-lg form-blue-button-sm" />
                                    </div>
                                </div>
                            </Panel>
                        </form>
                    </Fieldset>
                </ScrollPanel>
            </div>
        </div>

    );
}

export default AnimalHousing;
