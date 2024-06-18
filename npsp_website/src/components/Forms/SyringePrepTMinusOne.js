
import React, { useState } from 'react';
import { useForm,Controller } from "react-hook-form";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { RadioButton } from "primereact/radiobutton";
import { ScrollPanel } from 'primereact/scrollpanel';   
import { InputTextarea } from 'primereact/inputtextarea';
import "../styles.css";
import "../Formstyle.css";

function SyringePrepTMinusOne() {
    const {control, register, handleSubmit, formState: { errors }, setValue, watch} = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };
    const selectedfecalslurry = watch ('fecalslurry')
    const selectedFSConcentration = watch ('fsconcentration')
    const selectedvehicle = watch ('vehicle')
    const selectedcontainermixed = watch ('containermixed')
    const selectedvolume = watch ('volume')
    const selectedfsshaken = watch ('fsshaken')
    const selectedneedleattachment = watch ('needleattachment')
    const selectedsyringesize = watch ('syringesize')
    const selectedneedlecolor = watch ('needlecolor')
    const selectedsyringecover = watch ('syringecover')
    const selectedlabelledcorrectly = watch ('labelledcorrectly')
    const selectedneedledeadspacetechnique = watch ('needledeadspacetechnique')
    
    const onFecalSlurryChange = (value) =>
    {
        setValue ('fecalslurry', value) ; 
        if (value != "Other"){
            setValue ("otherfecalslurry", "")
        }
    };

    const onFSConcentrationChange = (value) =>
    {
        setValue ('fsconcentration', value) ; 
        if (value != "Other"){
            setValue ("otherfsconcentration", "")
        }
    };

    const onVehicleChange = (value) =>
    {
        setValue ('vehicle', value);
        if (value != "Other"){
            setValue("othervehicle", "")
        }
    };

    const onContainerMixedChange = (value) =>
    {
        setValue ('containermixed', value);
    };

    const onVolumeChange = (value) => 
    {
        setValue('volume', value);
        if (value != "Other"){
            setValue ("othervolume", "")
        }
    };

    const onFSShakenChange = (value) =>
    {
        setValue ('fsshaken', value);
    }

    const onNeedleAttachmentChange = (value) =>
    {
        setValue ('needleattachment', value);
    };

    const onSyringeSizeChange = (value) =>
    {
        setValue('syringesize', value);
        if (value != "Other"){
            setValue ("othersyringesize", "")
        }
    }; 

    const onNeedleColorChange = (value) =>
    {
        setValue ('needlecolor', value);
        if (value != "Other"){
            setValue ("otherneedlecolor", "")
        }
    };
    
    const onSyringeCoverChange = (value) =>
    {
        setValue ('syringecover', value);
    }


    const onLabelledCorrectlyChange = (value) =>
    {
        setValue('labelledcorrectly', value);
    };

    const onNeedleDeadSpaceTechniqueChange = (value) =>
    {
        setValue('needledeadspacetechnique', value);    
    };

    const createEmptyRow = () => ({
        mouseNumber: '',
        biologicalSex: '',
        mouseID: '',
        cageID: '',
        mouseWeight: '',
        fecalSlurryDose: '',
        fecalSlurryVolume: '',
        dextroseGlycerolVolume: '',
        syringeNumber: ''
    });
    const [rows, setRows] = useState([createEmptyRow()]);

    const onEditorValueChange = (rowIndex, field, value) => {
        let updatedRows = [...rows];
        updatedRows[rowIndex][field] = value;
        updatedRows = calculateVolumes(updatedRows, rowIndex);
        setRows(updatedRows);
    };

    const calculateVolumes = (updatedRows, rowIndex) => {
        const row = updatedRows[rowIndex];
        const { mouseWeight, fecalSlurryDose } = row;
        if (mouseWeight && fecalSlurryDose) {
            const fecalSlurryVolume = ((fecalSlurryDose * mouseWeight) / 50) * 1000;
            const dextroseGlycerolVolume = 1000 - fecalSlurryVolume;
            row.fecalSlurryVolume = fecalSlurryVolume.toFixed(2);
            row.dextroseGlycerolVolume = dextroseGlycerolVolume.toFixed(2);
        }
        return updatedRows;
    };

    const textEditor = (options) => (
        <InputText
            value={options.value}
            onChange={(e) => onEditorValueChange(options.rowIndex, options.field, e.target.value)}
            type={options.field.includes('Weight') || options.field.includes('Dose') ? 'number' : 'text'}
        />
    );

    const addNewRow = () => {
        setRows([...rows, createEmptyRow()]);
    };

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)} className='p-formgrid p-grid'>
        <div className="form-question" style={{ padding: '3px' }}>
        <div className="flex-order-1 flex align-items-center justify-content-center" style={{ width: '8rem'}}>
           <Button label="Add Mice" onClick={addNewRow} className="p-button-lg form-blue-button-sm" />
         </div>
         <div className='form-question' style={{ padding:' 3px '}}>
            <DataTable value={rows} scrollable scrollHeight="flex">
                <Column field="mouseNumber" header="Mouse Number" editor={(options) => textEditor(options)}></Column>
                <Column field="biologicalSex" header="Biological Sex" editor={(options) => textEditor(options)}></Column>
                <Column field="mouseID" header="Mouse ID" editor={(options) => textEditor(options)}></Column>
                <Column field="cageID" header="Cage ID" editor={(options) => textEditor(options)}></Column>
                <Column field="mouseWeight" header="Mouse Weight @ -1T (g)" editor={(options) => textEditor(options)}></Column>
                <Column field="fecalSlurryVolume" header="Fecal Slurry (µL)" editor={(options) => textEditor(options)}></Column>
                <Column field="dextroseGlycerolVolume" header=" dDextrose-glycerol (µL)" editor={(options) => textEditor(options)}></Column>
                <Column field="syringeNumber" header="Syringe Number" editor={(options) => textEditor(options)}></Column>
            </DataTable>
        </div>
        <div  className = "form-question" style={{ padding: '3px' }}>
          <label> 1. What is the source of fecal slurry used for the experiment? </label>
          <div className="radio-option">
            <RadioButton
              inputId="npsp2022"
              name="fecalslurry"
              value="NPSP 2022 fecal slurry batch sent by Ottawa/McMaster"
              {...register("fecalslurry", { required: "This field is required." })}
              checked={selectedfecalslurry === "NPSP 2022 fecal slurry batch sent by Ottawa/McMaster"}
              onChange={() => onFecalSlurryChange("NPSP 2022 fecal slurry batch sent by Ottawa/McMaster")}
            />
            <label htmlFor="npsp2022" className="p-radiobutton-label">NPSP 2022 fecal slurry batch sent by Ottawa/McMaster</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="lab"
              name="fecalslurry"
              value="Fecal slurry made in our laboratory using NPSP protocols"
              {...register("fecalslurry", { required: "This field is required." })}
              checked={selectedfecalslurry === "Fecal slurry made in our laboratory using NPSP protocols"}
              onChange={() => onFecalSlurryChange("Fecal slurry made in our laboratory using NPSP protocols")}
            />
            <label htmlFor="lab" className="p-radiobutton-label">Fecal slurry made in our laboratory using NPSP protocols</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="other"
              name="fecalslurry"
              value="Other"
              {...register("fecalslurry", { required: "This field is required." })}
              checked={selectedfecalslurry === "Other"}
              onChange={() => onFecalSlurryChange("Other")}
            />
            <label htmlFor="other" className="p-radiobutton-label">Other:</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectedfecalslurry === "Other" && (
            <InputText 
            {...register('otherfecalslurry ', {required:"This field is required."})}
            id="otherfecalslurry"
            placeholder="Specify...."
          />
          )}
          </div>
          {errors.fecalslurry && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.otherfecalslurry && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>
          

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>2. What is the concentration of original fecal slurry vial(s) used for the study?</label>
          <div className="radio-option">
            <RadioButton
              inputId="100"
              name="fsconcentration"
              value="100mg/mL"
              {...register("fsconcentration", { required: "This field is required." })}
              checked={selectedFSConcentration === "100mg/mL"}
              onChange={() => onFSConcentrationChange("100mg/mL")}
            />
            <label htmlFor="100" className="p-radiobutton-label">100mg/mL</label>
          </div>
         
          <div className="radio-option">
            <RadioButton
              inputId="other"
              name="fsconcentration"
              value="Other"
              {...register("fsconcentration", { required: "This field is required." })}
              checked={selectedFSConcentration === "Other"}
              onChange={() => onFSConcentrationChange("Other")}
            />
            <label htmlFor="other" className="p-radiobutton-label">Other:</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectedFSConcentration === "Other" && (
            <InputText 
            {...register('otherfsconcentration ', {required:"This field is required."})}
            id="otherfsconcentration"
            placeholder="Specify...."
          />
          )}
          </div>
          {errors.fsconcentration && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.otherfsconcentration && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>


        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>4. What was used as the vehicle for the study?</label>
          <div className="radio-option">
            <RadioButton
              inputId="dextroseglycerol"
              name="vehicle"
              value="5% dextrose-glycerol solution"
              {...register("vehicle", { required: "This field is required." })}
              checked={selectedvehicle === "5% dextrose-glycerol solution"}
              onChange={() => onVehicleChange("5% dextrose-glycerol solution")}
            />
            <label htmlFor="dextroseglycerol" className="p-radiobutton-label">5% dextrose-glycerol solution</label>
          </div>
         
          <div className="radio-option">
            <RadioButton
              inputId="other"
              name="vehicle"
              value="Other"
              {...register("vehicle", { required: "This field is required." })}
              checked={ selectedvehicle === "Other"}
              onChange={() => onVehicleChange("Other")}
            />
            <label htmlFor="other" className="p-radiobutton-label">Other:</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectedvehicle === "Other" && (
            <InputText 
            {...register("othervehicle ", {required:"This field is required."})}
            id="othervehicle"
            placeholder="Specify...."
          />
          )}
          </div>
          {errors.vehicle && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.othervehicle && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>5. How many vials of frozen dextrose-glycerol have been used? </label>
          <input className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary" {...register("vialsofFDG", { required: "This field is required." })} />
          {errors.vialsofFDG && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>


        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>6. If more than one vial of fecal slurry was used, were the contents of all vials mixed into one bigger container before filling the syringes? </label>
          <div className="radio-option">
            <RadioButton
              inputId="yes"
              name="containermixed"
              value="Yes, contents of all vials were mixed in a single container before filling the syringes"
              {...register("containermixed", { required: "This field is required." })}
              checked={selectedcontainermixed === "Yes, contents of all vials were mixed in a single container before filling the syringes"}
              onChange={() => onContainerMixedChange("Yes, contents of all vials were mixed in a single container before filling the syringes")}
            />
            <label htmlFor="yes" className="p-radiobutton-label">Yes, contents of all vials were mixed in a single container before filling the syringes</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="no"
              name="containermixed"
              value="No, syringes were filled from individual vials without mixing them all into one vial"
              {...register("containermixed", { required: "This field is required." })}
              checked={selectedcontainermixed === "No, syringes were filled from individual vials without mixing them all into one vial"}
              onChange={() => onContainerMixedChange("No, syringes were filled from individual vials without mixing them all into one vial")}
            />
            <label htmlFor="no" className="p-radiobutton-label">No, syringes were filled from individual vials without mixing them all into one vial</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="notapplicable"
              name="containermixed"
              value="Not applicable - only one vial of fecal slurry was used"
              {...register("containermixed", { required: "This field is required." })}
              checked={selectedcontainermixed === "Not applicable - only one vial of fecal slurry was used"}
              onChange={() => onContainerMixedChange("Not applicable - only one vial of fecal slurry was used")}
            />
            <label htmlFor="notapplicable" className="p-radiobutton-label">Not applicable - only one vial of fecal slurry was used</label>
          </div>
          {errors.containermixed && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>What was the ratio of fecal slurry to dextrose-glycerol before drawing the required volume into syringe?</label>
          <div className="radio-option">
            <RadioButton
              inputId="ratio1:1"
              name="volume"
              value="1:1 ratio"
              {...register("volume", { required: "This field is required." })}
              checked={selectedvolume === "1:1 ratio"}
              onChange={() => onVolumeChange("1:1 ratio")}
            />
            <label htmlFor="ratio1:1" className="p-radiobutton-label">1:1 ratio</label>
          </div>
         
          <div className="radio-option">
            <RadioButton
              inputId="other"
              name="volume"
              value="Other"
              {...register("volume", { required: "This field is required." })}
              checked={ selectedvolume === "Other"}
              onChange={() => onVolumeChange("Other")}
            />
            <label htmlFor="other" className="p-radiobutton-label">Other:</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectedvolume === "Other" && (
            <InputText 
            {...register("othervolume ", {required:"This field is required."})}
            id="othervolume"
            placeholder="Specify...."
          />
          )}
          </div>
          {errors.volume && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.othervolume && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>


        <div  className = "form-question" style={{ padding: '3px' }}>
          <label> Was the diluted fecal slurry (after mixing with dextrose-glycerol) shaken/inverted right before filling the syringe?</label>
          <div className="radio-option">
            <RadioButton
              inputId="yes"
              name="fsshaken"
              value="Yes, I inverted the diluted fecal slurry container before filling each syringe"
              {...register("fsshaken", { required: "This field is required." })}
              checked={selectedfsshaken === "Yes, I inverted the diluted fecal slurry container before filling each syringe"}
              onChange={() => onFSShakenChange("Yes, I inverted the diluted fecal slurry container before filling each syringe")}
            />
            <label htmlFor="yes" className="p-radiobutton-label">Yes, I inverted the diluted fecal slurry container before filling each syringe</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="once"
              name="fsshaken"
              value= "No, I only inverted/shook the vial once after preparation and did not invert it right before filling the syringe "
              {...register("fsshaken", { required: "This field is required." })}
              checked={selectedfsshaken === "No, I only inverted/shook the vial once after preparation and did not invert it right before filling the syringe"}
              onChange={() => onFSShakenChange("No, I only inverted/shook the vial once after preparation and did not invert it right before filling the syringe")}
            />
            <label htmlFor="once" className="p-radiobutton-label">No, I only inverted/shook the vial once after preparation and did not invert it right before filling the syringe</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="no"
              name="fsshaken"
              value="No, I did not shake the diluted fecal slurry container at all"
              {...register("fsshaken", { required: "This field is required." })}
              checked={selectedfsshaken === "No, I did not shake the diluted fecal slurry container at all"}
              onChange={() => onFSShakenChange("No, I did not shake the diluted fecal slurry container at all")}
            />
            <label htmlFor="no" className="p-radiobutton-label">No, I did not shake the diluted fecal slurry container at all</label>
          </div>
          {errors.fsshaken && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>


        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>Did you load the syinge with diluted fecal slurry without attaching the needle? </label>
          <div className="radio-option">
            <RadioButton
              inputId="needlenotattached"
              name="needleattachment"
              value="Yes, I did not attach the needle to the syringe before drawing the fecal slurry into it"
              {...register("needleattachment", { required: "This field is required." })}
              checked={selectedneedleattachment === "Yes, I did not attach the needle to the syringe before drawing the fecal slurry into it"}
              onChange={() => onNeedleAttachmentChange("Yes, I did not attach the needle to the syringe before drawing the fecal slurry into it")}
            />
            <label htmlFor="needlenotattached" className="p-radiobutton-label">Yes, I did not attach the needle to the syringe before drawing the fecal slurry into it</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="needleisattached"
              name="needleattachment"
              value="No, the syringe was filled with fecal slurry with the needle attached to it"
              {...register("needleattachment", { required: "This field is required." })}
              checked={selectedneedleattachment === "No, the syringe was filled with fecal slurry with the needle attached to it"}
              onChange={() => onNeedleAttachmentChange("No, the syringe was filled with fecal slurry with the needle attached to it")}
            />
            <label htmlFor="needleattachment" className="p-radiobutton-label">No, the syringe was filled with fecal slurry with the needle attached to it</label>
          </div>
        
          {errors.needleattachment && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>What size of syringe and needle was used for the injection at T=0(fecal slurry or dextrose-glycerol injection)</label>
          <div className="radio-option">
            <RadioButton
              inputId="1mlsyringe"
              name="syringesize"
              value="1 mL syringe with a 26G (0.45mm x 13mm)"
              {...register("syringesize", { required: "This field is required." })}
              checked={selectedsyringesize === "1 mL syringe with a 26G (0.45mm x 13mm)"}
              onChange={() => onSyringeSizeChange("1 mL syringe with a 26G (0.45mm x 13mm)")}
            />
            <label htmlFor="1mlsyringe" className="p-radiobutton-label">1 mL syringe with a 26G (0.45mm x 13mm) </label>
          </div>
         
          <div className="radio-option">
            <RadioButton
              inputId="other"
              name="syringesize"
              value="Other"
              {...register("syringesize", { required: "This field is required." })}
              checked={ selectedsyringesize === "Other"}
              onChange={() => onSyringeSizeChange("Other")}
            />
            <label htmlFor="other" className="p-radiobutton-label">Other:</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectedvolume === "Other" && (
            <InputText 
            {...register("othersyringesize ", {required:"This field is required."})}
            id="othersyringesize"
            placeholder="Specify...."
          />
          )}
          </div>
          {errors.syringesize && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.othersyringesize && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>What color of needle was used for T0 injection?</label>
          <div className="radio-option">
            <RadioButton
              inputId="beige"
              name="needlecolor"
              value="Beige"
              {...register("needlecolor", { required: "This field is required." })}
              checked={selectedneedlecolor === "Beige"}
              onChange={() => onNeedleColorChange("Beige")}
            />
            <label htmlFor="beige" className="p-radiobutton-label"> Beige </label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="clear"
              name="needlecolor"
              value="Clear"
              {...register("needlecolor", { required: "This field is required." })}
              checked={selectedneedlecolor === "Clear"}
              onChange={() => onNeedleColorChange("Clear")}
            />
            <label htmlFor="clear" className="p-radiobutton-label"> Clear </label>
          </div>
         
          <div className="radio-option">
            <RadioButton
              inputId="other"
              name="needlecolor"
              value="Other"
              {...register("needlecolor", { required: "This field is required." })}
              checked={ selectedneedlecolor === "Other"}
              onChange={() => onNeedleColorChange("Other")}
            />
            <label htmlFor="other" className="p-radiobutton-label">Other:</label>
          </div>
          <div style={{ padding: '3px' }}>
          {selectedneedlecolor === "Other" && (
            <InputText 
            {...register("otherneedlecolor ", {required:"This field is required."})}
            id="otherneedlecolor"
            placeholder="Specify...."
          />
          )}
          </div>
          {errors.needlecolor && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
          {errors.otherneedlecolor && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>How was the syringe covered to ensure the content is not visible? </label>
          <div className="radio-option">
            <RadioButton
              inputId="taped"
              name="syringecover"
              value="Taped around the syringe"
              {...register("syringecover", { required: "This field is required." })}
              checked={selectedsyringecover === "Taped around the syringe"}
              onChange={() => onSyringeCoverChange("Taped around the syringe")}
            />
            <label htmlFor="taped" className="p-radiobutton-label">Taped around the syringe</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="nottaped"
              name="syringecover"
              value="Syringe was not taped, and its content was visible"
              {...register("syringecover", { required: "This field is required." })}
              checked={selectedsyringecover === "Syringe was not taped, and its content was visible"}
              onChange={() => onSyringeCoverChange("Syringe was not taped, and its content was visible")}
            />
            <label htmlFor="nottaped" className="p-radiobutton-label">Syringe was not taped, and its content was visible</label>
          </div>
        
          {errors.syringecover && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>


        <div  className = "form-question" style={{ padding: '3px' }}>
          <label>Were the syringes labelled according to the allocation list and mouse numbers? (These numbers are identical) </label>
          <div className="radio-option">
            <RadioButton
              inputId="labelsyes"
              name="labelledcorrectly"
              value="Yes"
              {...register("labelledcorrectly", { required: "This field is required." })}
              checked={selectedlabelledcorrectly === "Yes"}
              onChange={() => onLabelledCorrectlyChange("Yes")}
            />
            <label htmlFor="labelsyes" className="p-radiobutton-label">Yes</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="notlabelledcorrectly"
              name="labelledcorrectly"
              value="No"
              {...register("labelledcorrectly", { required: "This field is required." })}
              checked={selectedlabelledcorrectly === "No"}
              onChange={() => onLabelledCorrectlyChange("No")}
            />
            <label htmlFor="notlabelledcorrectly" className="p-radiobutton-label">No</label>
          </div>
        
          {errors.labelledcorrectly && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>
        

        <div  className = "form-question" style={{ padding: '3px' }}>
          <label> What technique was used to account for the needle dead space?</label>
          <div className="radio-option">
            <RadioButton
              inputId="airbubble"
              name="needledeadspacetechnique"
              value="Air bubble technique"
              {...register("needledeadspacetechnique", { required: "This field is required." })}
              checked={selectedneedledeadspacetechnique === "Air bubble technique"}
              onChange={() => onNeedleDeadSpaceTechniqueChange("Air bubble technique")}
            />
            <label htmlFor="airbubble" className="p-radiobutton-label">Air bubble technique</label>
          </div>
          <div className="radio-option">
            <RadioButton
              inputId="overfilling"
              name="needledeadspacetechnique"
              value="Overfilling the syringe and filling the needle hub"
              {...register("needledeadspacetechnique", { required: "This field is required." })}
              checked={selectedneedledeadspacetechnique === "Overfilling the syringe and filling the needle hub"}
              onChange={() => onNeedleDeadSpaceTechniqueChange("Overfilling the syringe and filling the needle hub")}
            />
            <label htmlFor="overfilling" className="p-radiobutton-label">No</label>
          </div>

          <div className="radio-option">
            <RadioButton
              inputId="none"
              name="needledeadspacetechnique"
              value="None"
              {...register("needledeadspacetechnique", { required: "This field is required." })}
              checked={selectedneedledeadspacetechnique === "None"}
              onChange={() => onNeedleDeadSpaceTechniqueChange("None")}
            />
            <label htmlFor="none" className="p-radiobutton-label">None</label>
          </div>
        
          {errors.needledeadspacetechnique && <p style={{ color: 'red', marginTop: '0', marginBottom: '0' }}>*This field is required*</p>}
        </div>
        
        <div className="flex md:justify-content-end flex-wrap flex-container">
        <div className="flex-order-0 flex align-items-center justify-content-center" >
         <Button label="SAVE AND EXIT" className="p-button-lg form-blue-button-sm save-and-exit-btn " />
        </div>
        <div className="flex-order-1 flex align-items-center justify-content-center" style={{ width: '8rem'}}>
           <Button label="SUBMIT" className="p-button-lg form-blue-button-sm" />
         </div>
         </div> 
         </div>
     </form>
    </div>
  )
}

export default SyringePrepTMinusOne