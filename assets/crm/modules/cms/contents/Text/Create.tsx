import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "../../../../components/SimpleUi";
import { useState } from "react";
import { useApiService } from "../../../../hook/data";


interface TextFormProps {
    onSave?: (data: any) => void;
}

const TextForm = ({
    onSave = () => { console.log('onSave not implemented') }
}: TextFormProps) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        plainText: ''
    });
    const { data, loading, error, refetch } = useApiService();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSave) {
            await onSave(formData);
        }

        await refetch(`/cms/contents/texts`, { method: 'POST', body: JSON.stringify({ ...formData }) });

        navigate('/cms/contents/texts');
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (<div>
        <form onSubmit={onSubmit} className="form">
            <div className="form__group">
                <label className="form__label">Name:</label>
                <input type="text" className="form__input" name="plainText" value={formData.plainText} onChange={handleChange} />
            </div>
            <ButtonGroup>
                <Button type="submit">Create</Button>
                <Button type="button" onClick={() => navigate('/cms/widgets')}>Cancel</Button>
            </ButtonGroup>
        </form>
    </div>);

};

const Create = () => {

    return (<div>
        <h1>Text Create</h1>

        <TextForm ></TextForm>

    </div>);
}

export { Create };