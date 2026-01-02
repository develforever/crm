import { NavLink } from "react-router-dom";



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


export { Dashboard };