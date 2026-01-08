import { Route, Routes } from "react-router-dom";
import { Texts } from "./Text/Texts";
import { Htmls } from "./Html/Htmls";


const CmsContents = () => {


    return (<div>

        <Routes>
            <Route path="/images/*" element={<>Images</>} />
            <Route path="/htmls/*" element={<Htmls />} />
            <Route path="/texts/*" element={<Texts />} />
        </Routes>
    </div>)
};



export { CmsContents };