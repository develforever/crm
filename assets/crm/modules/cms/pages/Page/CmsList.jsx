import { NavLink, useNavigate } from "react-router-dom";
import { useApiService } from "../../../../hook/data";



const CmsList = () => {

    const navigate = useNavigate();
    const { data, loading, error, refetch } = useApiService('/cms/pages');

    if (loading) return <div>Ładowanie danych...</div>;
    if (error) return <div>Wystąpił błąd: {error}</div>;

    return (<div>
        <a href="#" className="link" onClick={() => navigate('/cms')}><>&#8630;</> back</a><br />
        <table className="table">

            <tbody>
                {data.map(page => {
                    return <tr key={page.id}>
                        <td>{page.id}</td>
                        <td>{page.slug}</td>
                        <td>{page.title}</td>
                        <td>
                            <NavLink to={`page/${page.id}`} relative={true} className="nav-link">Edit</NavLink>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
    );
}

export { CmsList };