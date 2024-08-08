import React from "react";
import { useForm, Controller } from "react-hook-form";
import { InputTextarea } from 'primereact/inputtextarea';
import { Panel } from 'primereact/panel';
import { Fieldset } from 'primereact/fieldset';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { RadioGroup, CheckboxGroup } from './FormsComponents';
import "../styles.css";
import "../Formstyle.css";

function WBCCountForm() {

  const { control, register, handleSubmit, formState: { errors }, setValue, watch, clearErrors } = useForm();
  const selectedDyeName = watch('dyename');
  const selectedSampleObservation = watch('sampleobservation');
  const selectedDeviceUsedToCount = watch('deviceusedtocount');

  const cellCount1 = watch('cellCount1', 0);
  const cellCount2 = watch('cellCount2', 0);
  const cellCount3 = watch('cellCount3', 0);
  const cellCount4 = watch('cellCount4', 0);
  const totalCells = Number(cellCount1) + Number(cellCount2) + Number(cellCount3) + Number(cellCount4);
  const cellConcentration = (totalCells / 4) * 40 * Math.pow(10, 4);

  const onSubmit = (data) => {
    console.log(data);
  };

  const onDyeNameChange = (value) => {
    setValue('dyename', value);
    if (value !== "Other") {
      setValue("otherdyename", "")
    }
  };

  const onSampleObservationChange = (value) => {
    setValue('sampleobservation', value);
  };

  const onDeviceUsedToCountChange = (value) => {
    setValue('deviceusedtocount', value);
  };

  return (
    <div className="Headings">
      <div className="body-content" style={{ padding: '5px' }}>
        <ScrollPanel style={{ width: '100%', height: '1000px' }}>
          <Fieldset legend="White Blood Cell Count Form" className="fieldset-legend">

            <Panel header="For any inquiries please contact Dr.Forough Jahandideh at fjahandideh@ohri.ca" toggleable>
              <h3 style={{ marginTop: '0', marginBottom: '0' }}>Instructions: </h3>
              <ul style={{ marginTop: '0', marginBottom: '0' }}>
                <li>1) Read the cell count & fluid processing SOP. Print and complete the “White Blood Cell Count Check” table. This table should be actively filled while counting the white blood cells for every mouse in each experimental date.</li>
              </ul>
              <ul style={{ marginTop: '0', marginBottom: '0' }}>
                <li>2) Use the completed “White Blood Cell Count Check” table to answer the questions below and picture of the referenced filled table needs to be uploaded to your center's specific folder in the NPSP SharePoint.</li>
              </ul>
            </Panel>

            <form onSubmit={handleSubmit(onSubmit)} className='p-formgrid p-grid' style={{ padding: '5px' }}>
              <div className="form-question" style={{ padding: '3px' }}>
                <label>Please enter the email ID of the HQP completing the data entry: </label>
                <InputText className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("dataentry", { required: "This field is required." })} />
                {errors.dataentry && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
              </div>

              <div className="form-question" style={{ padding: '3px' }}>
                <label>Please enter the email ID of the HQP that completed the "White Blood Cell Count" table: </label>
                <InputText className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("wbccounthqp", { required: "This field is required." })} />
                {errors.wbccounthqp && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
              </div>

              <div className="p-field form-question p-col-12" style={{ padding: '3px' }}>
                <label>What time was the white blood cell count performed? (Military time)</label>
                <InputText type="time" {...register("bloodagartime", { required: "This field is required." })} />
                {errors.bloodagartime && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
              </div>

              <RadioGroup
                id="dyename"
                label="What dye was used to stain the white blood cells?"
                options={["Acetic acid with methylene blue", "Other"]}
                register={register}
                watch={watch}
                setValue={setValue}
                clearErrors={clearErrors}
                errors={errors}
                hasOther={true}
              />

              <RadioGroup
                id="sampleobservation"
                label="When taking 5uL of whole blood, how did the sample look like?"
                options={["Blood Clotted", "Blood was normal"]}
                register={register}
                watch={watch}
                setValue={setValue}
                clearErrors={clearErrors}
                errors={errors}
                hasOther={false}
              />

              <CheckboxGroup
                id="confirmations"
                label="Please confirm the following:"
                options={[
                  "I confirm that I followed the NPSP SOP regarding sample preparation and execution",
                  "We made changes to the WBC protocol in our laboratory",
                  "I am not sure",
                  "We could not count any WBC for this sample"
                ]}
                register={register}
                watch={watch}
                setValue={setValue}
                clearErrors={clearErrors}
                errors={errors}
                hasOther={false}
              />

              <RadioGroup
                id="deviceusedtocount"
                label="What was used to count the white blood cells?"
                options={["Hemocytometer", "Automatic cell counter"]}
                register={register}
                watch={watch}
                setValue={setValue}
                clearErrors={clearErrors}
                errors={errors}
                hasOther={false}
              />

              <div className="p-fluid form-question p-formgrid p-grid" style={{ padding: "3px" }}>
                <div className="p-field p-col-12 p-md-3">
                  <label htmlFor="cellCount1">Cell count (corner 1):</label>
                  <Controller name="cellCount1" control={control} defaultValue={0} render={({ field }) => (
                    <InputText id="cellCount1" {...field} type="number" />
                  )} />
                </div>
                <div className="p-field form-question p-col-12 p-md-3" style={{ padding: "3px" }}>
                  <label htmlFor="cellCount2">Cell count (corner 2):</label>
                  <Controller name="cellCount2" control={control} defaultValue={0} render={({ field }) => (
                    <InputText id="cellCount2" {...field} type="number" />
                  )} />
                </div>
                <div className="p-field form-question p-col-12 p-md-3" style={{ padding: "3px" }}>
                  <label htmlFor="cellCount3">Cell count (corner 3):</label>
                  <Controller name="cellCount3" control={control} defaultValue={0} render={({ field }) => (
                    <InputText id="cellCount3" {...field} type="number" />
                  )} />
                </div>
                <div className="p-field form-question p-col-12 p-md-3" style={{ padding: "3px" }}>
                  <label htmlFor="cellCount4">Cell count (corner 4):</label>
                  <Controller name="cellCount4" control={control} defaultValue={0} render={({ field }) => (
                    <InputText id="cellCount4" {...field} type="number" />
                  )} />
                </div>
              </div>

              <div className="p-field form-question p-col-12" style={{ padding: "3px" }}>
                <label htmlFor="totalCells">Total number of counted cells in all four corners (cells): </label>
                <InputText id="totalCells" value={totalCells} readOnly />
              </div>

              <div className="p-field form-question p-col-12" style={{ padding: "3px" }}>
                <label htmlFor="cellConcentration">Cell Concentration (cells/mL): </label>
                <InputText id="cellConcentration" value={cellConcentration.toFixed(2)} readOnly />
              </div>

              <div className="p-field form-question" style={{ padding: "3px" }}>
                <label htmlFor="deviations">Were there any deviations from the protocol when counting the white blood cells?</label>
                <div className="p-col">
                  <InputTextarea id="deviations" {...register("deviations")} autoResize />
                </div>
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
        </ScrollPanel>
      </div>
    </div>
  )
}

export default WBCCountForm;
