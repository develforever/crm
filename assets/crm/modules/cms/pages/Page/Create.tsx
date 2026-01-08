import { useNavigate, useParams } from "react-router-dom";
import { useApiService } from "../../../../hook/data";
import { HtmlEditor } from "../../HtmlEditor";
import { useEffect, useState } from "react";
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

    useEffect(() => {
        if (data && data.id) {
            navigate(`/cms/pages/page/${data.id}`)
        }
    }, [data]);

    const onSave = async (content: string) => {
        setFormData({
            ...formData,
            content
        });
        await refetch(`/cms/pages/page`, { method: 'POST', body: JSON.stringify({ ...formData, content }) });
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
            <form className="form">
                <label className="form__label">Title:</label><br />
                <input className="form__input" type="text" name="title" value={formData.title} onChange={handleChange} /><br />
                <label className="form__label">Slug:</label><br />
                <input className="form__input" type="text" name="slug" value={formData.slug} onChange={handleChange} /><br />
                <label className="form__label">Active:</label><br />
                <input className="form_input" type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} /><br />

                <HtmlEditor initialContent={formData.content} onSave={onSave}></HtmlEditor>
                <p>Utworzono: {new Date(data?.createdAt).toLocaleString()}; Ostatnia zmiana: {new Date(data?.updatedAt).toLocaleString()}</p>
            </form>
        </div>
    </div>);
}

export { CreatePage };