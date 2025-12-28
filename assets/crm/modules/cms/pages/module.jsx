import { useApiService } from "../../../hook/data";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import HtmlEditor from "../HtmlEditor";

const CmsPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { data, loading, error, refetch } = useApiService(`/cms/pages/page/${id}`);

    const onSave = async (htmlContnet) => {

        await refetch(`/cms/pages/page/${id}`, { method: 'PUT', body: JSON.stringify({ htmlContnet }) });
    }

    if (loading) return <div>Ładowanie danych...</div>;
    if (error) return <div>Wystąpił błąd: {error}</div>;

    return (<div>

        <a href="#" className="link" onClick={() => navigate('/cms/pages')}><>&#8630;</> back</a><br />

        <label>Title: {data.title}</label><br />
        <label>Slug: {data.slug}</label><br />
        <label>Active: {data.isActive ? 'Y' : 'N'}</label><br />

        <HtmlEditor initialContent={data.content} onSave={onSave}></HtmlEditor>

        <p>Utworzono: {new Date(data.createdAt).toLocaleString()}</p>
        <p>Ostatnia zmiana: {new Date(data.updatedAt).toLocaleString()}</p>

    </div>);
}

const CmsList = () => {

    const { data, loading, error, refetch } = useApiService('/cms/pages');

    if (loading) return <div>Ładowanie danych...</div>;
    if (error) return <div>Wystąpił błąd: {error}</div>;

    return (<div>
        <table className="table">

            <tbody>
                {data.map(page => {
                    return <tr key={page.id}>
                        <td>{page.id}</td>
                        <td>{page.title}</td>
                        <td>
                            <NavLink to={`page/${page.id}`} relative={true} className="nav-link">View</NavLink>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
    );
}

const CmsPages = () => {


    return (
        <Routes>
            <Route name="cms_page_list" path="/" element={<CmsList />} />
            <Route name="cms_page_view" path="/page/:id" element={<CmsPage />} />
        </Routes>);
};



export default CmsPages;