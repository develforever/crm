import './styles/app.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { NavLink } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Menu } from './components/Menu';
import { Dashboard } from './components/Dashboard';
import { CMS } from './modules/cms/Cms';


const App = () => {
    return (
        <BrowserRouter basename="/crm">
            <div className='container'>


                <Menu intranetUrl={window.AppConfig?.intranetUrl} ></Menu>

                <Routes>
                    <Route name="crm" path="/" element={<Dashboard />} />
                    <Route name="cms" path="/cms/*" element={<CMS />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);