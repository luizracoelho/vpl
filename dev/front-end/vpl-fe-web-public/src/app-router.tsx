
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/default-layout";
import BrandsPage from "./pages/brands-page";
import HomePage from "./pages/home-page";
import ModelsPage from "./pages/models-page";
import NotFoundPage from "./pages/not-found-page";
import VehiclesPage from "./pages/vehicles-page";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<DefaultLayout />}>
                    <Route path="" element={<HomePage />} />
                    <Route path="brands" element={<BrandsPage />} />
                    <Route path="brands/:brandId/models" element={<ModelsPage />} />
                    <Route path="models" element={<ModelsPage />} />
                    <Route path="brands/:brandId/models/:modelId/vehicles" element={<VehiclesPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;