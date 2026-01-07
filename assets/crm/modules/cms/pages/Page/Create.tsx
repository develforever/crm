import { useNavigate, useParams } from "react-router-dom";
import { useApiService } from "../../../../hook/data";
import { HtmlEditor } from "../../HtmlEditor";
import { useState } from "react";
import { Button, ButtonGroup } from "../../../../components/SimpleUi";

interface FormData {
    id: number;
    title: string;
    slug: string;
    isActive: boolean;
    locale: string;
    content: string;
}

interface ChangeEvent {
    target: {
        name: string;
        value: string;
        type: string;
        checked: boolean;
    };
}

const CreatePage = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        id: -1,
        title: '',
        slug: '',
        isActive: false,
        locale: 'en',
        content: ''
    });
    const { data, loading, error, refetch } = useApiService();

    const onSave = async (content: string) => {
        setFormData({
            ...formData,
            content
        });
        await refetch(`/cms/pages/page`, { method: 'POST', body: JSON.stringify({ ...formData }) });
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

        <ButtonGroup>
            <Button href="#" onClick={() => navigate('/cms/pages')}><>&#8630;</> back</Button>
        </ButtonGroup>
        <div className="page-create">
            <label>Title:</label><br />
            <input type="text" name="title" value={formData.title} onChange={handleChange} /><br />
            <label>Slug:</label><br />
            <input type="text" name="slug" value={formData.slug} onChange={handleChange} /><br />
            <label>Active:</label><br />
            <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} /><br />

            <HtmlEditor initialContent={formData.content} onSave={onSave}></HtmlEditor>
            <p>Utworzono: {new Date(data?.createdAt).toLocaleString()}; Ostatnia zmiana: {new Date(data?.updatedAt).toLocaleString()}</p>
        </div>
    </div>);
}

export { CreatePage };