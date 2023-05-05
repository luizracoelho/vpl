
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/default-layout";
import BrandsPage from "./pages/brands-page";
import HomePage from "./pages/home-page";
import ModelsPage from "./pages/models-page";
import NotFoundPage from "./pages/not-found-page";
import VehiclesPage from "./pages/vehicles-page";
import ReferencesPage from "./pages/references-page";
import VehiclePriceReferenceTable from "./pages/vehicles-page/vehicle-price-reference-table";
import { Vehicle } from "./models/vehicle";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<DefaultLayout />}>
                    <Route path="" element={<HomePage />} />
                    <Route path="brands" element={<BrandsPage />} />
                    <Route path="brands/:brandId/models" element={<ModelsPage />} />
                    <Route path="models" element={<ModelsPage />} />
                    <Route path="priceReference/:priceReference/year/:year/vehicles" element={<VehiclesPage />} />
                    <Route path="brands/:brandId/models/:modelId/vehicles" element={<VehiclesPage />} />
                    <Route path="vehicles" element={<VehiclesPage />} />
                    <Route path="table-component" element={<VehiclePriceReferenceTable vehicleId={1} />} />
                    <Route path="references/:table" element={<ReferencesPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;