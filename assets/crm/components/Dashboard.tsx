import { NavLink } from "react-router-dom";
import './Dashboard.scss';


const Dashboard = () => {

    return (
        <div>
            <h1>Dashboard</h1>

            <div className="flex">
                <div className='dashboard-card'>
                    <div className='dashboard-card__wrapper'>
                        <NavLink to="cms" className="dashboard-card__wrapper__link">CMS</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}


export { Dashboard };