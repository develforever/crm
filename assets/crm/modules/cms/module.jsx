import { NavLink } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import CmsPages from "./pages/module";



const CMS = () => {
    return (<div>
        <h1>CMS</h1>
        <div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="pages" className="nav-link">Pages</NavLink>
                </li>
            </ul>
        </div>

        <Routes>
            <Route name="cms_pages" path="/pages/*" element={<CmsPages />} />
        </Routes>
    </div>);
}


export default CMS;