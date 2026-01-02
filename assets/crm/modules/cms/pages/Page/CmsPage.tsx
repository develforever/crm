import { useNavigate, useParams } from "react-router-dom";
import { useApiService } from "../../../../hook/data";
import { useState } from "react";


export interface CmsPage {
    content: string;
    locale: string;
    createdAt: string;
    deletedAt: string | null;
    id: number;
    isActive: boolean;
    slug: string;
    title: string;
    updatedAt: string;
}

const CmsPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: -1,
        title: '',
        slug: '',
        isActive: false,
        locale: 'en',
        htmlContnet: ''
    });
    const { data, loading, error, refetch } = useApiService<CmsPage>(`/cms/pages/page/${id}`);

    const onSave = async (htmlContnet: string) => {

        await refetch(`/cms/pages/page/${id}`, { method: 'PATCH', body: JSON.stringify({ ...formData, htmlContnet }) });
    }

    if (loading) return <div>Ładowanie danych...</div>;
    if (error) return <div>Wystąpił błąd: {error}</div>;
    if (!data) return <div>Brak danych</div>;

    return (<div>

        <a href="#" className="link" onClick={() => navigate('/cms/pages')}><>&#8630;</> back</a><br />

        <label>Title: {data.title}</label><br />
        <label>Slug: {data.slug}</label><br />
        <label>Active: {data.isActive ? 'Y' : 'N'}</label><br />

        <div>
            HTML: {data.content}
        </div>

        <p>Utworzono: {new Date(data.createdAt).toLocaleString()}; Ostatnia zmiana: {new Date(data.updatedAt).toLocaleString()}</p>

    </div>);
}

export { CmsPage };