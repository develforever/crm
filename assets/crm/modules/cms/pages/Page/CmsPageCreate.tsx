import { useNavigate, useParams } from "react-router-dom";
import { useApiService } from "../../../../hook/data";
import { HtmlEditor } from "../../HtmlEditor";
import { useState } from "react";

interface FormData {
    id: number;
    title: string;
    slug: string;
    isActive: boolean;
    locale: string;
    htmlContnet: string;
}

interface ChangeEvent {
    target: {
        name: string;
        value: string;
        type: string;
        checked: boolean;
    };
}

const CmsPageCreate = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        id: -1,
        title: '',
        slug: '',
        isActive: false,
        locale: 'en',
        htmlContnet: ''
    });
    const { data, loading, error, refetch } = useApiService();

    const onSave = async (htmlContnet: string) => {

        await refetch(`/cms/pages/page`, { method: 'PUT', body: JSON.stringify({ ...formData, htmlContnet }) });
    }



    const handleChange = (e: ChangeEvent) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    if (loading) return <div>Ładowanie danych...</div>;
    if (error) return <div>Wystąpił błąd: {error}</div>;

    return (<div>

        <a href="#" className="link" onClick={() => navigate('/cms/pages')}><>&#8630;</> back</a><br />

        <label>Title:</label><br />
        <input type="text" name="title" value={formData.title} onChange={handleChange} /><br />
        <label>Slug:</label><br />
        <input type="text" name="slug" value={formData.slug} onChange={handleChange} /><br />
        <label>Active:</label><br />
        <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} /><br />

        <HtmlEditor initialContent={formData.htmlContnet} onSave={onSave}></HtmlEditor>
        <p>Utworzono: {new Date(data?.createdAt).toLocaleString()}; Ostatnia zmiana: {new Date(data?.updatedAt).toLocaleString()}</p>

    </div>);
}

export { CmsPageCreate };