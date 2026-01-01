import { useNavigate, useParams } from "react-router-dom";
import { useApiService } from "../../../../hook/data";
import { HtmlEditor } from "../../HtmlEditor";

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

export { CmsPage };