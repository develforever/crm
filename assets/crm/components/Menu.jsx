import { NavLink, useLocation } from "react-router-dom";
import './Menu.scss';

export const Menu = ({
    intranetUrl = "/en",
    items = [
        { label: 'Home', to: '/' },
        { label: 'CMS', to: '/cms' },
    ],
    activePath = undefined,
    ...props
}) => {

    return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">CRM</a>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href={intranetUrl}>Intranet</a>
                    </li>
                    {items.map(item => (
                        <li className="nav-item" key={`${item.to}-${item.label}`}>
                            <NavLink to={item.to} className="nav-link">{item.label}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </nav>
    );
}