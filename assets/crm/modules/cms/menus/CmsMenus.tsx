import { Route, Routes } from "react-router-dom";
import { List } from "./Menu/List";
import { CreateMenu } from "./Menu/Create";
import { ViewMenu } from "./Menu/View";


const CmsMenus = () => {


    return (<div>

        <Routes>
            <Route index element={<List />} />
            <Route path="/create" element={<CreateMenu />} />
            <Route path="/:id" element={<ViewMenu />} />
        </Routes>
    </div>)
};



export { CmsMenus };