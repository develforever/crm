import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiService } from "../../../../hook/data";
import { Button, ButtonGroup } from "../../../../components/SimpleUi";

interface CmsText {
    id: string | number;
    plainText: string;
}

const List = () => {

    const navigate = useNavigate();
    const { data, loading, error, refetch } = useApiService('/cms/contents/texts');

    const [deleteId, setDeleteId] = useState<string | number | null>(null);

    if (loading) return <div>Ładowanie danych...</div>;
    if (error) return <div>Wystąpił błąd: {error}</div>;

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const deleteText = async (id: string | number) => {
        setDeleteId(id);
        console.log(`Delete text ${id}`);

        await sleep(1500)
            .then(() => setDeleteId(null));
        console.log(`Deleted text ${id}`);
    }

    return (<div>

        <ButtonGroup>
            <Button to={`/cms/contents/texts/create`} >Create New Text Content</Button>
        </ButtonGroup>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Plain Text</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>

                {data?.map((item: CmsText) => {
                    return <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.plainText}</td>
                        <td>
                            <div className="d-flex gap-2">
                                {deleteId !== item.id ? (<ButtonGroup>
                                    <Button label="View" to={`/cms/contents/texts/${item.id}`} />
                                    <Button label="Delete" variant="danger" onClick={() => deleteText(item.id)} />
                                </ButtonGroup>)
                                    :
                                    <span>Deleting...</span>
                                }
                            </div>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>

    </div>)
}

export { List };