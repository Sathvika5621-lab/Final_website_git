import React from "react";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";

export const RadioGroup = ({ id, label, options, register, watch, setValue, clearErrors, errors, hasOther, hasYes }) => {
    const selectedValue = watch(id);
    const onValueChange = (value) => {
        setValue(id, value);
        if (hasOther && value !== 'Other' && value !== 'Yes') {
            setValue(`other${id}`, "");
            clearErrors(`other${id}`);
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
            {(hasOther && (selectedValue === 'Other' || selectedValue === 'Yes')) && (
                <InputText
                    {...register(`other${id}`, { required: "This field is required." })}
                    id={`other${id}`}
                    placeholder="   Specify...."
                />
            )}
            {errors[id] && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
            {(hasOther && errors[`other${id}`]) && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>
    );
};

export const CheckboxGroup = ({ id, label, options, register, watch, setValue, clearErrors, errors, hasOther }) => {
    const selectedValues = watch(id) || [];
    const onCheckboxChange = (value, checked) => {
        if (checked) {
            setValue(id, [...selectedValues, value]);
        } else {
            setValue(id, selectedValues.filter(v => v !== value));
        }
        if (hasOther && value === 'Other' && !checked) {
            setValue(`other${id}`, "");
            clearErrors(`other${id}`);
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
