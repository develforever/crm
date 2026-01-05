import { NavLink } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { CmsPages } from "./pages/CmsPages";

const CMS = () => {
    return (<div>
        <h2>CMS</h2>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="/cms/pages" className="nav-link">Pages</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/cms/widgets" className="nav-link">Widgets</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/cms/menus" className="nav-link">Menus</NavLink>
                </li>
            </ul>
        </nav>

        <Routes>
            <Route path="/pages/*" element={<CmsPages />} />
        </Routes>
    </div>);
}


export { CMS };