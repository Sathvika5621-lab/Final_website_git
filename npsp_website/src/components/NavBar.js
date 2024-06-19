import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';

const NavBar = () => {
    let navigate = useNavigate();

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            command: () => { navigate('/home-page'); }
        },
        {
            label: 'Next Mouse Details',
            icon: 'pi pi-fw pi-plus',
            command: () => { navigate('/next-mouse-details'); }
        }
    ];

    return (
        <div>
            <Menubar model={items} />
        </div>
    );
}

export default NavBar;
