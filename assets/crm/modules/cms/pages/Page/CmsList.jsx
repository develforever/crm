import { NavLink, useNavigate } from "react-router-dom";
import { useApiService } from "../../../../hook/data";
import { useState } from "react";



const CmsList = () => {

    const navigate = useNavigate();
    const { data, loading, error, refetch } = useApiService('/cms/pages');
    const { dataDelete, loadingDelete, errorDelete, refetchDelete } = useApiService();
    const [deleteId, setDeleteId] = useState(null);

    if (loading) return <div>Ładowanie danych...</div>;
    if (error) return <div>Wystąpił błąd: {error}</div>;

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const deletePage = async (id) => {
        setDeleteId(id);
        //await refetch(`/cms/pages/page/${id}`, { method: 'DELETE' });
        console.log(`Delete page ${id}`);

        await sleep(1500)
            .then(() => setDeleteId(null));
        console.log(`Deleted page ${id}`);
    }

    return (<div>
        <a href="#" className="link" onClick={() => navigate('/cms')}><>&#8630;</> back</a><br />

        <NavLink to={`page/create`} className="nav-link">Create New Page</NavLink>

        <table className="table">
            <tbody>
                {data.map(page => {
                    return <tr key={page.id}>
                        <td>{page.id}</td>
                        <td>{page.slug}</td>
                        <td>{page.title}</td>
                        <td>
                            <div className="d-flex gap-2">
                                {deleteId !== page.id ? (<>
                                    <NavLink to={`page/${page.id}`} className="nav-link">View</NavLink>
                                    <NavLink onClick={() => deletePage(page.id)} className="nav-link">Delete</NavLink>
                                </>)
                                    :
                                    <span>Deleting...</span>
                                }
                            </div>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
    );
}

export { CmsList };