import { Route, Routes } from "react-router-dom";
import { ViewWidget } from "./Widgets/View";
import { CreateWidget } from "./Widgets/Create";
import { ListWidget } from "./Widgets/List";


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