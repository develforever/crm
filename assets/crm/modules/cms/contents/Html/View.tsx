import { useParams } from "react-router-dom";

const View = () => {

    const { id } = useParams<{ id: string }>();

    return (<div> modal to view html #{id} </div>);
}

export { View };