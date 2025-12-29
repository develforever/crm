import './styles/app.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { NavLink } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CMS from './modules/cms/module';
import { Menu } from './components/Menu';

const Dashboard = () => {

    return (
        <div>
            <h1>Dashboard</h1>

            <div className='d-flex'>
                <div className='border'>
                    <NavLink to="cms" className="link">CMS</NavLink>
                </div>
            </div>
        </div>
    );
}


const Klienci = () => {
    return (<div>
        <h1>Klienci</h1>
    </div>);
}


const App = () => {
    return (
        <BrowserRouter basename="/crm">
            <Menu intranetUrl={window.AppConfig?.intranetUrl}></Menu>

            <Routes>
                <Route name="crm" path="/" element={<Dashboard />} />
                <Route name="clients" path="/clients" element={<Klienci />} />
                <Route name="cms" path="/cms/*" element={<CMS />} />
            </Routes>
        </BrowserRouter>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);