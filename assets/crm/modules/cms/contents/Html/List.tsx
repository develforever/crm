import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiService } from "../../../../hook/data";
import { Button, ButtonGroup } from "../../../../components/SimpleUi";

interface CmsHtml {
    id: string | number;
    content: string;
}

const List = () => {

    const navigate = useNavigate();
    const { data, loading, error, refetch } = useApiService('/cms/contents/htmls');

    const [deleteId, setDeleteId] = useState<string | number | null>(null);

    if (loading) return <div>Ładowanie danych...</div>;
    if (error) return <div>Wystąpił błąd: {error}</div>;

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const deleteHtml = async (id: string | number) => {
        setDeleteId(id);
        console.log(`Delete html ${id}`);

        await sleep(1500)
            .then(() => setDeleteId(null));
        console.log(`Deleted html ${id}`);
    }

    return (<div>

        <ButtonGroup>
            <Button to={`/cms/contents/htmls/create`} >Create New Html Content</Button>
        </ButtonGroup>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Content</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>

                {data?.map((item: CmsHtml) => {
                    return <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.content}</td>
                        <td>
                            <div className="d-flex gap-2">
                                {deleteId !== item.id ? (<ButtonGroup>
                                    <Button label="View" to={`/cms/contents/htmls/${item.id}`} />
                                    <Button label="Delete" variant="danger" onClick={() => deleteHtml(item.id)} />
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