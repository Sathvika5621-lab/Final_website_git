import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';


const NavBar = () => {
    let navigate = useNavigate();

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => { navigate('/home'); }
        },
        {
            label: 'Mouse Details',
            icon: 'pi pi-fw pi-plus',
            command: () => { navigate('/home-page'); }
        }
    ];

    return (
        <div>
            <Menubar model={items} />
        </div>
    );
}

export default NavBar;
