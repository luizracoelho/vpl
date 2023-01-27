import DefaultLayout from "layouts/default-layout";
import BrandsPage from "pages/brands-page";
import HomePage from "pages/home-page";
import NotFoundPage from "pages/not-found-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<DefaultLayout />}>
                    <Route path="" element={<HomePage />} />
                    <Route path="brands" element={<BrandsPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;