import { Route, Routes } from "react-router-dom";
import { List } from "./List";
import { Create } from "./Create";
import { View } from "./View";


const Texts = () => {
    return (<div>
        <h1>Texts</h1>


        <Routes>
            <Route index path="/" element={<List />} />
            <Route path="/create" element={<Create />} />
            <Route path="/:id" element={<View />} />
        </Routes>
    </div>);
}

export { Texts };