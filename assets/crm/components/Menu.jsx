import { NavLink, useLocation } from "react-router-dom";
import './Menu.scss';

export const Menu = ({
    intranetUrl = "/en",
    ...props
}) => {

    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">CRM</a>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href={intranetUrl}>Intranet</a>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="cms" className={`nav-link ${isActive('/cms') ? 'active' : ''}`}>CMS</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
}