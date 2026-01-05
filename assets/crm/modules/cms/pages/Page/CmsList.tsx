import { NavLink, useNavigate } from "react-router-dom";
import { useApiService } from "../../../../hook/data";
import { useState } from "react";
import { Button, ButtonGroup } from "../../../../components/SimpleUi";


interface CmsPage {
    id: string | number;
    slug: string;
    title: string;
}

const CmsList = () => {

    const navigate = useNavigate();
    const { data, loading, error, refetch } = useApiService('/cms/pages');
    // const { dataDelete, loadingDelete, errorDelete, refetchDelete } = useApiService();
    const [deleteId, setDeleteId] = useState<string | number | null>(null);

    if (loading) return <div>Ładowanie danych...</div>;
    if (error) return <div>Wystąpił błąd: {error}</div>;

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const deletePage = async (id: string | number) => {
        setDeleteId(id);
        //await refetch(`/cms/pages/page/${id}`, { method: 'DELETE' });
        console.log(`Delete page ${id}`);

        await sleep(1500)
            .then(() => setDeleteId(null));
        console.log(`Deleted page ${id}`);
    }

    return (<div>

        <ButtonGroup>
            <Button to={`page/create`} >Create New Page</Button>
        </ButtonGroup>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Slug</th>
                    <th>Title</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>

                {data?.map((page: CmsPage) => {
                    return <tr key={page.id}>
                        <td>{page.id}</td>
                        <td>{page.slug}</td>
                        <td>{page.title}</td>
                        <td>
                            <div className="d-flex gap-2">
                                {deleteId !== page.id ? (<>
                                    <Button label="View" to={`page/${page.id}`} />
                                    <Button label="Delete" onClick={() => deletePage(page.id)} />
                                </>)
                                    :
                                    <span>Deleting...</span>
                                }
                            </div>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
    );
}

export { CmsList };