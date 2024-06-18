import React from 'react';
import { useForm } from 'react-hook-form';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Fieldset } from 'primereact/fieldset';
import "../styles.css";
import "../Formstyle.css";

const RadioGroup = ({ id, label, options, register, watch, setValue, errors, hasOther }) => {
  const selectedValue = watch(id);
  const onValueChange = (value) => {
    setValue(id, value);
    if (hasOther && value !== 'Other') {
      setValue(`other${id}`, "");
    }
  };

  return (
    <div className="form-question" style={{ padding: '3px' }}>
      <label>{label}</label>
      {options.map(option => (
        <div className="radio-option" key={option}>
          <RadioButton
            inputId={`${id}_${option}`}
            name={id}
            value={option}
            {...register(id, { required: "This field is required." })}
            checked={selectedValue === option}
            onChange={() => onValueChange(option)}
          />
          <label htmlFor={`${id}_${option}`} className="p-radiobutton-label">{option}</label>
        </div>
      ))}
      {hasOther && selectedValue === 'Other' && (
        <InputText
          {...register(`other${id}`, { required: "This field is required." })}
          id={`other${id}`}
          placeholder="Specify...."
        />
      )}
      {errors[id] && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
      {hasOther && errors[`other${id}`] && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
    </div>
  );
};

const CheckboxGroup = ({ id, label, options, register, watch, setValue, errors, hasOther }) => {
  const selectedValues = watch(id) || [];
  const onCheckboxChange = (value, checked) => {
    if (checked) {
      setValue(id, [...selectedValues, value]);
    } else {
      setValue(id, selectedValues.filter(v => v !== value));
    }
    if (hasOther && value === 'Other' && !checked) {
      setValue(`other${id}`, "");
    }
  };

  return (
    <div className="form-question" style={{ padding: '3px' }}>
      <label>{label}</label>
      {options.map(option => (
        <div className="radio-option" key={option}>
          <Checkbox
            inputId={`${id}_${option}`}
            value={option}
            checked={selectedValues.includes(option)}
            onChange={(e) => onCheckboxChange(option, e.checked)}
          />
          <label htmlFor={`${id}_${option}`} className="p-checkbox-label">{option}</label>
        </div>
      ))}
      {hasOther && selectedValues.includes('Other') && (
        <InputText
          {...register(`other${id}`, { required: "This field is required." })}
          id={`other${id}`}
          placeholder="Specify...."
        />
      )}
      {errors[id] && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
      {hasOther && errors[`other${id}`] && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
    </div>
  );
};

const RegisterHqp = () => {
  const { control, register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="Headings">
      <div className="body-content" style={{ padding: '5px' }}>
        <ScrollPanel style={{ width: '100%', height: '1000px' }}>
          <Fieldset legend="BIOBANKING FORM" className="fieldset-legend">
            <form onSubmit={handleSubmit(onSubmit)} className='p-formgrid p-grid'>
              <Card title="Personnel Information" className="mb-3">
                <div className="form-question" style={{ padding: '3px' }}>
                  <label htmlFor="firstName">First Name</label>
                  <InputText id="firstName" {...register("firstName", { required: "First name is required." })} />
                  {errors.firstName && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*{errors.firstName.message}*</p>}
                </div>

                <div className="form-question" style={{ padding: '3px' }}>
                  <label htmlFor="lastName">Last Name</label>
                  <InputText id="lastName" {...register("lastName", { required: "Last name is required." })} />
                  {errors.lastName && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*{errors.lastName.message}*</p>}
                </div>

                <div className="form-question" style={{ padding: '3px' }}>
                  <label htmlFor="email">Email Address (work)</label>
                  <InputText id="email" {...register("email", { required: "Email is required." })} />
                  {errors.email && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*{errors.email.message}*</p>}
                </div>

                <div className="form-question" style={{ padding: '3px' }}>
                  <label htmlFor="password">Password</label>
                  <InputText id="password" type="password" {...register("password", { required: "Password is required." })} />
                  {errors.password && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*{errors.password.message}*</p>}
                </div>

                <div className="form-question" style={{ padding: '3px' }}>
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <InputText id="confirmPassword" type="password" {...register("confirmPassword", { required: "Please confirm your password.", validate: value => value === watch('password') || 'Passwords do not match.' })} />
                  {errors.confirmPassword && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*{errors.confirmPassword.message}*</p>}
                </div>
              </Card>

              <Card title="Additional Information" className="mb-3">
                <RadioGroup
                  id="site"
                  label="Site you work at"
                  options={["Ottawa-Lalu", "Ottawa-Thebaud", "McMaster-Liaw", "Western-Gill", "Manitoba-Mendelson", "Alberta-Bourque-Macala", "Calgary-McDonald", "McGill-Kristof", "TorontoZhang"]}
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  hasOther={false}
                />

                <RadioGroup
                  id="gender"
                  label="Gender"
                  options={["Male", "Female", "Other"]}
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  hasOther={true}
                />

                <RadioGroup
                  id="sexAtBirth"
                  label="Sex at Birth"
                  options={["Male", "Female", "Other"]}
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  hasOther={true}
                />

                <RadioGroup
                  id="age"
                  label="Age"
                  options={["Under 18", "Between 18 and 25", "Between 26 and 35", "Between 36 and 45", "Between 46 and 55", "56 and up"]}
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  hasOther={false}
                />

                <CheckboxGroup
                  id="experiment"
                  label="Experiment you are a part of"
                  options={["NPSP", "ALI"]}
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  hasOther={false}
                />

                <RadioGroup
                  id="occupation"
                  label="Occupation"
                  options={["Undergrad student", "Post doctorate fellow", "Research Associate", "MSc student", "Research Technician", "PhD student", "Animal Technician", "Research Assistant", "Principal investigator", "Data entry", "Other"]}
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  hasOther={true}
                />

                {watch('occupation')?.includes('student') && (
                  <div className="form-question" style={{ padding: '3px' }}>
                    <label htmlFor="studentYear">If student, which year</label>
                    <InputText id="studentYear" {...register("studentYear", { required: "This field is required." })} />
                    {errors.studentYear && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
                  </div>
                )}

                <div className="form-question" style={{ padding: '3px' }}>
                  <Checkbox inputId="leadHQP" {...register("leadHQP")} />
                  <label htmlFor="leadHQP" className="p-checkbox-label">I am the lead HQP</label>
                </div>

                <RadioGroup
                  id="animalHandlingExperience"
                  label="Experience of animal handling"
                  options={["No experience", "Less than 2 years of experience", "2-5 years of experience", "5-10 years of experience", "over 10 years of experience"]}
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  hasOther={false}
                />

                <RadioGroup
                  id="labExperience"
                  label="Experience of working in lab"
                  options={["No experience", "Less than 2 years of experience", "2-5 years of experience", "5-10 years of experience", "over 10 years of experience"]}
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  hasOther={false}
                />

                <RadioGroup
                  id="sepsisModelExperience"
                  label="NPSP version: Have you worked with in vivo sepsis models before?"
                  options={["Yes", "No"]}
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  hasOther={false}
                />

                <RadioGroup
                  id="aliModelExperience"
                  label="ALI version: Have you worked with in vivo ALI models before?"
                  options={["Yes", "No"]}
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  hasOther={false}
                />

                <CheckboxGroup
                  id="animalSpeciesWorkedWith"
                  label="Which animal species have you worked with?"
                  options={["Mice", "Rats", "Others"]}
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  hasOther={true}
                />

                <div className="form-question" style={{ padding: '3px' }}>
                  <label htmlFor="sepsisModelType">NPSP version: What kind of sepsis model(s) did/have you work with?</label>
                  <InputText id="sepsisModelType" {...register("sepsisModelType")} />
                </div>

                <div className="form-question" style={{ padding: '3px' }}>
                  <label htmlFor="aliModelType">ALI version: What kind of ALI model(s) did/have you work with?</label>
                  <InputText id="aliModelType" {...register("aliModelType")} />
                </div>

                <div className="form-question" style={{ padding: '3px' }}>
                  <label htmlFor="modelExperience">Experience working with that/those model(s)?</label>
                  <InputText id="modelExperience" {...register("modelExperience")} />
                </div>

                <RadioGroup
                  id="dataUsageConsent"
                  label="Do you allow the team to use the data above for future analysis?"
                  options={["Yes", "No"]}
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  hasOther={false}
                />

                <CheckboxGroup
                  id="completedSOPs"
                  label="Kindly select the list of SOPs or training(s) that you have completed"
                  options={[
                    "reagent preparation SOP",
                    "pre-study preparation procedures",
                    "induction protocol",
                    "wellness check & treatment protocol",
                    "biobanking SOP",
                    "core temperature protocol",
                    "epoc protocol",
                    "cell count & fluid processing",
                    "animal experimental details",
                    "modified MSS SOP",
                    "brain dissection video",
                    "carotid cut video",
                    "cecal content collection",
                    "core temperature video",
                    "kidney collection",
                    "plf collection",
                    "spleen collection",
                    "muscle dissection video",
                    "mouse sepsis scoring training videos",
                    "epoc use video"
                  ]}
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  hasOther={false}
                />

                <CheckboxGroup
                  id="leadHQPTasks"
                  label="Specific for Lead HQP: Have you completed the following tasks in preparation for NPSP studies?"
                  options={[
                    "Uploading PLF culturing pictures (minimum 3 plates) in the database/SharePoint folder",
                    "WBC counts data table (minimum 2 samples)"
                  ]}
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                  hasOther={false}
                />
              </Card>

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

export default RegisterHqp;
