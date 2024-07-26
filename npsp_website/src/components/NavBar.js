import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import './styles.css'; 

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
            <Menubar model={items} className="menubar-right" />
        </div>
    );
}

export default NavBar;
