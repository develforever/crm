import { useNavigate, useParams } from "react-router-dom";
import { useApiService } from "../../../../hook/data";
import { HtmlEditor } from "../../HtmlEditor";
import { useEffect, useState } from "react";
import { CmsWidgetApi } from "../../Types";
import { Button, ButtonGroup } from "../../../../components/SimpleUi";

interface FormData {
    id: number;
    title: string;
    name: string;
}

interface ChangeEvent {
    target: {
        name: string;
        value: string;
        type: string;
        checked: boolean;
    };
}

const EditWidget = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<FormData>({
        id: -1,
        title: '',
        name: '',
    });

    const [status, setStatus] = useState<string>('');
    const [statusInt, setStatusInt] = useState<NodeJS.Timeout>();

    const { data, loading, error, refetch } = useApiService<CmsWidgetApi>(`/cms/widgets/${id}`);
    

    useEffect(() => {
        if (data) {
            setFormData({ ...data });
            setStatusInt(setTimeout(() => setStatus(''), 5000));
        }
    }, [data]);

    const onSave = async () => {
        clearTimeout(statusInt);
        setStatus('Saving...');
        await refetch(undefined, { method: 'PUT', body: JSON.stringify({ ...formData }) });
    }

    const handleChange = (e: ChangeEvent) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const addItem = () => {

    };

    if (!data && loading) return <div>Ładowanie danych...</div>;
    if (error) return <div>Wystąpił błąd: {error}</div>;
    if (!data) return <div>Brak danych</div>;

    return (<div>

        <ButtonGroup>
            <Button href="#" onClick={() => navigate('/cms/widgets')}><>&#8630;</> Back</Button>
        </ButtonGroup>

        <div className="cmspage-form">
            <form className="form" onSubmit={(e) => { e.preventDefault(); onSave(); }}>
                <label htmlFor="cmspage_title" className="form__label">Title:</label>
                <input type="text" className="form__input" id={`cmspage_title`} name="title" value={formData.title} onChange={handleChange} />

                <label htmlFor="cmspage_slug" className="form__label">Name:</label>
                <input type="text" className="form__input" id={`cmspage_slug`} name="name" value={formData.name} onChange={handleChange} />
                <Button type="submit">Zapisz</Button>
            </form>

            
        </div>
    </div>);
}

export { EditWidget };