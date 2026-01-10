import { useNavigate, useParams } from "react-router-dom";
import { Button, ButtonGroup, EditableDiv } from "../../../../components/SimpleUi";
import { CmsWidgetApi, CmsWidgetItemApi, CmsWidgetMetaApi } from "../../Types";
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
    const { data, meta, loading, error, refetch } = useApiService<CmsWidgetApi, CmsWidgetMetaApi>(`/cms/widgets/${id}`);
    const { data: dataItems, setData: setDataItems, loading: loadingItems, error: errorItems, refetch: refetchItems } = useApiService<CmsWidgetItemApi[]>(`/cms/widgets/${id}/items`);
    const { data: dataItem, loading: loadingItem, error: errorItem, refetch: refetchItem } = useApiService<CmsWidgetItemApi>();
    const { data: dataItemPatch, loading: loadingItemPatch, error: errorItemPatch, refetch: refetchItemPatch } = useApiService<CmsWidgetItemApi>();

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

    const handleItemAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddItemForm({ ...addItemForm, ...{ [e.currentTarget.name]: e.currentTarget.value } })
    }

    const handlePositionChange = (index: number) => (e: SyntheticEvent<HTMLInputElement>) => {
        const value = parseInt(e.currentTarget.value);
        if (isNaN(value)) return;

        setDataItems(prev => {
            if (!prev) return prev;
            const newItems = [...prev];
            newItems[index] = { ...newItems[index], ...{ position: value } };
            return newItems;
        });

        refetchItemPatch(`/cms/widgets/${id}/item/${dataItems?.[index].id}`,
            { method: 'PATCH', body: JSON.stringify({ position: value }) })
            .then(() => {
                refetchItems();
            });

    };

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

                        {meta?.items.types.map(type => <option key={type} value={type}>{type}</option>)}

                    </select>

                    {addItemForm.type == 'text' && <div>
                        <label className="form__label">Plain text</label>
                        <input type="text" name="plainText" className="form__input" required onChange={handleItemAdd} value={`${addItemForm.plainText || ''}`} />
                    </div>}

                    {addItemForm.type == 'html' && <div>
                        <label className="form__label">Content</label>
                        <input type="text" name="content" className="form__input" required onChange={handleItemAdd} value={`${addItemForm.content || ''}`} />
                    </div>}

                    {addItemForm.type == 'image' && <div>
                        <label className="form__label">Alt</label>
                        <input type="text" name="alt" className="form__input" required onChange={handleItemAdd} value={`${addItemForm.alt || ''}`} />
                        <label className="form__label">Path</label>
                        <input type="text" name="path" className="form__input" required onChange={handleItemAdd} value={`${addItemForm.path || ''}`} />
                    </div>}


                    <Button type="button" onClick={addItem} >Zapisz</Button>

                </div>}

                {dataItems && <table className="table">

                    {dataItems && <tbody>
                        {dataItems.map((e, i) => {
                            return <tr key={`${e.id}${i}`}>
                                <td>{i + 1}</td>
                                <td>
                                    <input className="form__input" type="number" name="position" onChange={handlePositionChange(i)} step="1" min="0" max="9" value={`${e.position}`} />
                                </td>
                                <td>{e.type}</td>
                                <td>
                                    {e.content.plainText && <EditableDiv
                                        content={e.content.plainText || ''}
                                        onChange={(newContent) => {
                                            refetchItemPatch(`/cms/widgets/${id}/item/${e.id}`,
                                            { method: 'PATCH', body: JSON.stringify({ plainText: newContent }) })
                                            .then(() => {
                                                refetchItems();
                                            });
                                        }}
                                    />}
                                    {e.content.content && <EditableDiv
                                        content={e.content.content || ''}
                                        onChange={(newContent) => {
                                            refetchItemPatch(`/cms/widgets/${id}/item/${e.id}`,
                                            { method: 'PATCH', body: JSON.stringify({ content: newContent }) })
                                            .then(() => {
                                                refetchItems();
                                            });
                                        }}
                                    />}

                                    {e.content.path &&  
                                    <img src={e.content.path} alt={e.content.alt || ''} style={{ maxWidth: '200px', display: 'block', marginBottom: '10px' }} />}
                                    {e.content.path &&
                                    <EditableDiv
                                        content={e.content.path || ''}
                                        onChange={(newContent) => {
                                            refetchItemPatch(`/cms/widgets/${id}/item/${e.id}`,
                                            { method: 'PATCH', body: JSON.stringify({ path: newContent }) })
                                            .then(() => {
                                                refetchItems();
                                            });
                                        }}
                                    />}
                                    {e.content.alt && <EditableDiv
                                        content={e.content.alt || ''}
                                        onChange={(newContent) => {
                                            refetchItemPatch(`/cms/widgets/${id}/item/${e.id}`,
                                            { method: 'PATCH', body: JSON.stringify({ alt: newContent }) })
                                            .then(() => {
                                                refetchItems();
                                            });
                                        }}
                                    />}
                                </td>
                                <td>
                                    <ButtonGroup>
                                        <Button type="button" variant="danger" onClick={async () => {
                                            await refetchItem(`/cms/widgets/${id}/item/${e.id}`, { method: 'DELETE' });
                                            await refetchItems();
                                        }}>Delete</Button>
                                    </ButtonGroup>
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