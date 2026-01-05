import { Route, Routes } from "react-router-dom";
import { CmsList } from "./Page/CmsList";
import { CmsPage } from "./Page/CmsPage";
import { CmsPageCreate } from "./Page/CmsPageCreate";
import { CmsPageEdit } from "./Page/CmsPageEdit";


const CmsPages = () => {


    return (
        <Routes>
            <Route path="/" element={<CmsList />} />
            <Route path="/page/create" element={<CmsPageCreate />} />
            <Route path="/page/:id/edit" element={<CmsPageEdit />} />
            <Route path="/page/:id" element={<CmsPage />} />
        </Routes>);
};



export { CmsPages };