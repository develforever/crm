import { NavLink } from "react-router-dom";


export default function Menu() {

    return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">CRM</a>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href={window.AppConfig.intranetUrl}>Intranet</a>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="cms" className="nav-link">CMS</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="clients" className="nav-link">Clients</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    );
}