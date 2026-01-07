import { Route, Routes } from "react-router-dom";
import { ViewWidget } from "./Widget/View";
import { CreateWidget } from "./Widget/Create";
import { ListWidget } from "./Widget/List";


const CmsWidgets = () => {


    return (<div>

        <Routes>
            <Route index element={<ListWidget />} />
            <Route path="/create" element={<CreateWidget />} />
            <Route path="/:id" element={<ViewWidget />} />
        </Routes>
    </div>)
};



export { CmsWidgets };