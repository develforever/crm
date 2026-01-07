import { useParams } from "react-router-dom";

const ViewWidget = () => {

    const { id } = useParams<{ id: string }>();

    return (<div> modal to view widget #{id} </div>);
}
export { ViewWidget };