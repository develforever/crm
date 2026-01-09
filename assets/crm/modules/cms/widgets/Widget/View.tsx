import { useNavigate, useParams } from "react-router-dom";
import { Button, ButtonGroup } from "../../../../components/SimpleUi";
import { CmsWidgetApi, CmsWidgetItemApi } from "../../Types";
import { useApiService } from "../../../../hook/data";
import { SyntheticEvent, useState } from "react";

interface AddItemForm {
    position: number;
    type: string;
    plainText: string | null;
    content: string | null;
    alt: string | null;
    path: string | null;
}

const defaultStateAddItemForm: AddItemForm = {
    position: 0,
    type: 'text',
    plainText: null,
    content: null,
    alt: null,
    path: null,

};

const ViewWidget = () => {

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data, loading, error, refetch } = useApiService<CmsWidgetApi>(`/cms/widgets/${id}`);
    const { data: dataItems, loading: loadingItems, error: errorItems, refetch: refetchItems } = useApiService<CmsWidgetItemApi[]>(`/cms/widgets/${id}/items`);
    const { data: dataItem, loading: loadingItem, error: errorItem, refetch: refetchItem } = useApiService<CmsWidgetItemApi>();

    const [showAddForm, setShowAddForm] = useState(false);
    const [addItemForm, setAddItemForm] = useState<AddItemForm>({
        position: 0,
        type: 'text',
        plainText: null,
        content: null,
        alt: null,
        path: null,

    });

    const handleType = (e: { target: { value: string } }) => {
        setAddItemForm({ ...addItemForm, ...{ type: e.target.value } });
    };

    const addItem = async () => {
        await refetchItem(`/cms/widgets/${id}/item`, { method: 'POST', body: JSON.stringify({ ...addItemForm }) });
        setAddItemForm({ ...defaultStateAddItemForm });
        setShowAddForm(false);
        await refetchItems();
    };

    const handlePlaintext = (e: { target: { value: string } }) => {
        setAddItemForm({ ...addItemForm, ...{ plainText: e.target.value } })
    }

    if (!data && loading) return <div>Ładowanie danych...</div>;
    if (error) return <div>Wystąpił błąd: {error}</div>;
    if (!data) return <div>Brak danych</div>;

    return (<div>
        <ButtonGroup>
            <Button href="#" onClick={() => navigate('/cms/widgets')}><>&#8630;</> back</Button>
            <Button to={`edit`} >Edit</Button>
        </ButtonGroup>

        <div className="cmspage-form">
            <form className="form">
                <label htmlFor="cmspage_title" className="form__label">Title: {data.title}</label>
                <label htmlFor="cmspage_name" className="form__label">Name: {data.name}</label>
            </form>


            <form action="#" className="form">

                <Button type="button" onClick={() => setShowAddForm(!showAddForm)}>&#43;</Button>

                {showAddForm && <div>
                    <label className="form__label">Type</label>
                    <select name="type" className="form__input" value={`${addItemForm.type}`} onChange={handleType}>
                        <option value="text">Text</option>
                        <option value="html" disabled>Html</option>
                        <option value="image" disabled>Image</option>
                    </select>

                    {addItemForm.type == 'text' && <div>
                        <label className="form__label">Plain text</label>
                        <input type="text" className="form__input" onChange={handlePlaintext} value={`${addItemForm.plainText || ''}`} />
                    </div>}

                    <Button type="button" onClick={addItem} >Zapisz</Button>

                </div>}

                {dataItems && <table className="table">
                    {loadingItems && <tbody>
                        <tr>
                            <td>Loading...</td>
                        </tr>
                    </tbody>}
                    {!loadingItems && <tbody>
                        {dataItems.map((e, i) => {
                            return <tr key={`${e.id}${i}`}>
                                <td>{i + 1}</td>
                                <td>{e.position}</td>
                                <td>{e.type}</td>
                                <td>
                                    {e.content.plainText}
                                </td>
                            </tr>
                        })}
                    </tbody>
                    }
                </table>}

            </form>
        </div>
    </div>);
}
export { ViewWidget };