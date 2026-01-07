import { useNavigate } from "react-router-dom";
import { useApiService } from "../../../../hook/data";
import { useState } from "react";
import { Button, ButtonGroup } from "../../../../components/SimpleUi";

interface CmsMenu {
    id: string | number;
    name: string;
    title: string;
}

const ListWidget = () => {

    const navigate = useNavigate();
    const { data, loading, error, refetch } = useApiService('/cms/widgets');

    const [deleteId, setDeleteId] = useState<string | number | null>(null);

    if (loading) return <div>Ładowanie danych...</div>;
    if (error) return <div>Wystąpił błąd: {error}</div>;

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const deleteWidget = async (id: string | number) => {
        setDeleteId(id);
        console.log(`Delete widget ${id}`);

        await sleep(1500)
            .then(() => setDeleteId(null));
        console.log(`Deleted widget ${id}`);
    }

    return (<div>

        <ButtonGroup>
            <Button to={`/cms/widgets/create`} >Create New Widget</Button>
        </ButtonGroup>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>

                {data?.map((item: CmsMenu) => {
                    return <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.title}</td>
                        <td>
                            <div className="d-flex gap-2">
                                {deleteId !== item.id ? (<ButtonGroup>
                                    <Button label="View" to={`/cms/widgets/${item.id}`} />
                                    <Button label="Delete" variant="danger" onClick={() => deleteWidget(item.id)} />
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
};

export { ListWidget };