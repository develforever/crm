import { Navigate, NavLink } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { CmsPages } from "./pages/CmsPages";
import { useCallback, useEffect, useRef } from "react";

const CMS = () => {

    const contentSubRef = useRef<HTMLUListElement>(null);


    const docClick = useCallback((e: MouseEvent) => {

        const target = e.target as HTMLElement | null;

        if (!target) return;

        if (target.closest('.navbar-nav-sub')) {

            if (contentSubRef.current && !contentSubRef.current.classList.contains("collapsed")) {
                contentSubRef.current.classList.add("collapsed");
            }
        }

    }, []);

    useEffect(() => {


        contentSubRef.current?.ownerDocument.addEventListener("click", docClick);

        return () => {
            console.log("CMS Unmounted");
            contentSubRef.current?.ownerDocument.removeEventListener("click", docClick);
        };
    }, []);

    return (<div>
        <h2>CMS</h2>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="/cms/pages" className="nav-link">Pages</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/cms/widgets" className="nav-link">Widgets</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/cms/menus" className="nav-link">Menus</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/cms/contents" onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (contentSubRef.current) {
                            contentSubRef.current.classList.toggle("collapsed");
                        }
                    }} className="nav-link">Contents</NavLink>
                    <ul className="navbar-nav-sub collapsed" ref={contentSubRef}>
                        <li className="nav-item">
                            <NavLink to="/cms/contents/images" className="nav-link">Images</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/cms/contents/htmls" className="nav-link">Htmls</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/cms/contents/texts" className="nav-link">Texts</NavLink>
                        </li>
                    </ul>
                </li>

            </ul>
        </nav>

        <Routes>
            <Route index element={<Navigate to="/cms/pages" />} />
            <Route path="/widgets/*" element={<>Widgets</>} />
            <Route path="/menus/*" element={<>Menus</>} />
            <Route path="/contents/images/*" element={<>Images</>} />
            <Route path="/contents/htmls/*" element={<>Htmls</>} />
            <Route path="/contents/texts/*" element={<>Texts</>} />
            <Route path="/pages/*" element={<CmsPages />} />
        </Routes>
    </div>);
}


export { CMS };