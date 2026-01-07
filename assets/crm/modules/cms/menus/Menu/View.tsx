import { useParams } from "react-router-dom";

const ViewMenu = () => {

    const { id } = useParams<{ id: string }>();

    return (<div> modal to view menu #{id} </div>);
}
export { ViewMenu };