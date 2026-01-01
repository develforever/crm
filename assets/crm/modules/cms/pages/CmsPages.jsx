import { Route, Routes } from "react-router-dom";
import { CmsList } from "./Page/CmsList";
import { CmsPage } from "./Page/CmsPage";


const CmsPages = () => {


    return (
        <Routes>
            <Route name="cms_page_list" path="/" element={<CmsList />} />
            <Route name="cms_page_view" path="/page/:id" element={<CmsPage />} />
        </Routes>);
};



export { CmsPages };