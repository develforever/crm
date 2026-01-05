import { useNavigate, useParams } from "react-router-dom";
import { useApiService } from "../../../../hook/data";
import { HtmlEditor } from "../../HtmlEditor";
import { useEffect, useState } from "react";
import { CmsPageApi } from "../../Types";
import { Button, ButtonGroup } from "../../../../components/SimpleUi";

interface FormData {
    id: number;
    title: string;
    slug: string;
    isActive: boolean;
    locale: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

interface ChangeEvent {
    target: {
        name: string;
        value: string;
        type: string;
        checked: boolean;
    };
}

const CmsPageEdit = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        id: -1,
        title: '',
        slug: '',
        isActive: false,
        locale: 'en',
        content: '',
        createdAt: '',
        updatedAt: ''
    });

    const { data, loading, error, refetch } = useApiService<CmsPageApi>(`/cms/pages/page/${id}`);

    useEffect(() => {
        if (data) {
            setFormData({ ...data });
        }
    }, [data]);

    const onSave = async (content: string) => {

        await refetch(undefined, { method: 'PUT', body: JSON.stringify({ ...formData, content }) });
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
    if (!data) return <div>Brak danych</div>;

    return (<div>

        <ButtonGroup>
            <Button href="#" onClick={() => navigate('/cms/pages')}><>&#8630;</> back</Button>
        </ButtonGroup>

        <div className="cmspage-form">
            <form className="form" onSubmit={(e) => { e.preventDefault(); onSave(formData.content); }}>
                <label htmlFor="cmspage_title" className="form__label">Title:</label>
                <input type="text" className="form__input" id={`cmspage_title`} name="title" value={formData.title} onChange={handleChange} />

                <label htmlFor="cmspage_slug" className="form__label">Slug:</label>
                <input type="text" className="form__input" id={`cmspage_slug`} name="slug" value={formData.slug} onChange={handleChange} />

                <label htmlFor="cmspage_isActive" className="form__label">Active:</label>
                <input type="checkbox" className="form__checkbox" id={`cmspage_isActive`} name="isActive" checked={formData.isActive} onChange={handleChange} />
                <HtmlEditor initialContent={formData.content} onSave={onSave}></HtmlEditor>
                <p>Utworzono: {new Date(formData?.createdAt).toLocaleString()}; Ostatnia zmiana: {new Date(formData?.updatedAt).toLocaleString()}</p>
            </form>
        </div>
    </div>);
}

export { CmsPageEdit };