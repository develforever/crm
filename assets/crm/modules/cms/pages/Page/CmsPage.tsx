import { useNavigate, useParams } from "react-router-dom";
import { useApiService } from "../../../../hook/data";
import { useState } from "react";
import { Button, ButtonGroup } from "../../../../components/SimpleUi";
import { CmsPageApi } from "../../Types";


const CmsPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: -1,
        title: '',
        slug: '',
        isActive: false,
        locale: 'en',
        content: ''
    });
    const { data, loading, error, refetch } = useApiService<CmsPageApi>(`/cms/pages/page/${id}`);

    const onSave = async (content: string) => {

        await refetch(`/cms/pages/page/${id}`, { method: 'PATCH', body: JSON.stringify({ ...formData }) });
    }

    if (loading) return <div>Ładowanie danych...</div>;
    if (error) return <div>Wystąpił błąd: {error}</div>;
    if (!data) return <div>Brak danych</div>;

    return (<div>

        <ButtonGroup>
            <Button href="#" onClick={() => navigate('/cms/pages')}><>&#8630;</> back</Button>
            <Button to={`edit`} >Edit</Button>
        </ButtonGroup>

        <div className="page-view">
            <label>Title: {data.title}</label><br />
            <label>Slug: {data.slug}</label><br />
            <label>Active: {data.isActive ? 'Y' : 'N'}</label><br />

            <div>
                HTML: {data.content}
            </div>

            <p>Utworzono: {new Date(data.createdAt).toLocaleString()}; Ostatnia zmiana: {new Date(data.updatedAt).toLocaleString()}</p>
        </div>
    </div>);
}

export { CmsPage };