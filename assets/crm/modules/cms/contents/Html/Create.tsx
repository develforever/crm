import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "../../../../components/SimpleUi";
import { useState } from "react";
import { useApiService } from "../../../../hook/data";


interface HtmlFormProps {
    onSave?: (data: any) => void;
}

const HtmlForm = ({
    onSave = () => { console.log('onSave not implemented') }
}: HtmlFormProps) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        content: ''
    });
    const { data, loading, error, refetch } = useApiService();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSave) {
            await onSave(formData);
        }

        await refetch(`/cms/contents/htmls`, { method: 'POST', body: JSON.stringify({ ...formData }) });

        navigate('/cms/contents/htmls');
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (<div>
        <form onSubmit={onSubmit} className="form">
            <div className="form__group">
                <label className="form__label">Name:</label>
                <input type="text" className="form__input" name="content" value={formData.content} onChange={handleChange} />
            </div>
            <ButtonGroup>
                <Button type="submit">Create</Button>
                <Button type="button" onClick={() => navigate('/cms/contents/htmls')}>Cancel</Button>
            </ButtonGroup>
        </form>
    </div>);

};

const Create = () => {

    return (<div>
        <h1>Text Create</h1>

        <HtmlForm />

    </div>);
}

export { Create };