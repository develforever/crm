import './styles/app.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { NavLink } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Dashboard = () => {

    return (
        <div>
            <h1>Dashboard</h1>
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
            <a href={window.AppConfig.intranetUrl}>Intranet</a>
            <NavLink to="/">Home</NavLink>
            <NavLink to="clients">Clients</NavLink>
            <Routes>
                <Route name="crm" path="/" element={<Dashboard />} />
                <Route name="clients" path="/clients" element={<Klienci />} />
            </Routes>
        </BrowserRouter>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);