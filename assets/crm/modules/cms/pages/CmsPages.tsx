import { Route, Routes } from "react-router-dom";
import { List } from "./Page/List";
import { ViewPage } from "./Page/View";
import { CreatePage } from "./Page/Create";
import { EditPage } from "./Page/Edit";


const CmsPages = () => {


    return (
        <Routes>
            <Route path="/" element={<List />} />
            <Route path="/page/create" element={<CreatePage />} />
            <Route path="/page/:id/edit" element={<EditPage />} />
            <Route path="/page/:id" element={<ViewPage />} />
        </Routes>);
};



export { CmsPages };