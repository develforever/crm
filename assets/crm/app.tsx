import './styles/app.scss';
import { createRoot } from 'react-dom/client';
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
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/cms/*" element={<CMS />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

const container = document.getElementById('root');

if (!container) {
    throw new Error('Root container not found');
}

const root = createRoot(container);
root.render(<App />);