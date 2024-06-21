import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Column } from 'primereact/column';
import Header from './Header';
import NavBar from './NavBar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './styles.css';

function HomePage({ mousedetails }) {
    let navigate = useNavigate();

    const [experiment, setExperiment] = React.useState('');
    const [selectedMice, setSelectedMice] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: 'contains' },
        site: { value: null, matchMode: 'contains' },
        shipmentdate: { value: null, matchMode: 'contains' }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const experimentOptions = [
        { label: 'ALI', value: 'ALI' },
        { label: 'NPSP', value: 'NPSP' },
    ];

    const handleAddMiceClick = () => {
        navigate('/animal-housing');
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        setFilters((prevFilters) => ({
            ...prevFilters,
            global: { ...prevFilters.global, value }
        }));
        setGlobalFilterValue(value);
    };

    const onFilterChange = (field) => (e) => {
        const value = e.target.value;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [field]: { ...prevFilters[field], value }
        }));
    };

    const handleSyringePrepClick = () => {
        // Navigate to the syringe prep form with selected mice
        navigate('/syringe-prep-form', { state: { selectedMice } });
    };

    const header = (
        <div className="flex justify-content-end">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </span>
        </div>
    );

    const siteFilterElement = (
        <InputText
            value={filters.site.value || ''}
            onChange={onFilterChange('site')}
            placeholder="Search by site"
            className="p-column-filter"
        />
    );

    const shipmentDateFilterElement = (
        <InputText
            value={filters.shipmentdate.value || ''}
            onChange={onFilterChange('shipmentdate')}
            placeholder="Search by shipment date"
            className="p-column-filter"
        />
    );

    const actionTemplate = (rowData) => (
        <div className='button-container'>
             <Button label="Forms" onClick={() => navigate(`/formslist?mouse_id=${rowData.mouse_id}`)} />
             <Button label="Edit" className="p-button-secondary" onClick={() => navigate(`/edit?mouse_id=${rowData.mouse_id}`)} />
        </div>
    );

    return (
        <div className='p-grid'>
            <Header userName='Jane Doe' />
            <NavBar />
            <div className="form-question p-col-12 p-md-6 p-lg-4" style={{ padding: '5px' }}>
                <label>Select an experiment to enter the data for:</label>
                <Dropdown value={experiment} options={experimentOptions} onChange={(e) => setExperiment(e.value)} placeholder="Select an Experiment" />
            </div>
       <div className='flex'>
            <div className="flex-order-1 flex align-items-center justify-content-center" style={{ width: '10rem' }}>
                <Button label="ADD MICE" className="p-button-lg form-blue-button-sm" onClick={handleAddMiceClick} />
           </div> 
            <div className="flex-order-1 flex align-items-center justify-content-center" style={{ width: '20rem' }}>
                <Button label="Fill Syringe Prep Form" className="p-button-lg form-blue-button-sm" onClick={handleSyringePrepClick} disabled={!selectedMice.length} />
            </div>
          </div>
            <div className="card" style={{ maxWidth: '1500px', margin: '0px auto', padding: '3px' }}>
                <DataTable value={mousedetails} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} stripedRows  tableStyle={{ minWidth: '30rem' }} filters={filters} globalFilterFields={['mouse_id', 'site', 'sex', 'dateofbirth', 'shipmentdate', 'cageid']} header={header} selection={selectedMice} onSelectionChange={(e) => setSelectedMice(e.value)} selectionMode="multiple">
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
                    <Column field="mouse_id" header="Mouse ID" />
                    <Column field="site" header="Site" filter filterElement={siteFilterElement} />
                    <Column field="sex" header="Sex" />
                    <Column field="dateofbirth" header="Date of Birth" />
                    <Column field="shipmentdate" header="Shipment Date" filter filterElement={shipmentDateFilterElement} />
                    <Column field="cageid" header="Cage-id" />
                    <Column field="Forms" header="Forms" body={actionTemplate} />
                </DataTable>
            </div>
        </div>
    );
}

export default HomePage;
