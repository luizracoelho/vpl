
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/default-layout";
import BrandsPage from "./pages/brands-page";
import HomePage from "./pages/home-page";
import ModelsPage from "./pages/models-page";
import NotFoundPage from "./pages/not-found-page";
import VehiclesPage from "./pages/vehicles-page";
import VeicleTestePage from "./components/chart/line";
import ReferencesPage from "./pages/references-page";
import VehicleDetails from "./pages/vehicles-page/vehicle-details";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<DefaultLayout />}>
                    <Route path="" element={<HomePage />} />
                    <Route path="brands" element={<BrandsPage />} />
                    <Route path="models" element={<ModelsPage />} />
                    <Route path="brands/:brandId/models" element={<ModelsPage />} />
                    <Route path="vehicles" element={<VehiclesPage />} />
                    <Route path="brands/:brandId/models/:modelId/vehicles" element={<VehiclesPage />} />
                    <Route path="priceReference/:priceReference/year/:year/vehicles" element={<VehiclesPage />} />
                    <Route path="vehicle/details/:id" element={<VehicleDetails />} />
                    <Route path="brands/:brandId/models/:modelId/vehicle/details/:vehicleId" element={<VehicleDetails />} />
                    <Route path="priceReference/:priceReference/year/:year/vehicle/details/:vehicleId" element={<VehicleDetails />} />
                    <Route path="references/:table" element={<ReferencesPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;