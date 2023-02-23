import { ApiResult } from "../../models/api-result-model";
import { Brand } from "../../models/brand";
import BrandsService from "../../services/brands-service";

const useFindBrand = () => {
    return async (id: number) => {
        try {
            const data = await BrandsService.instance.find(id);
            return ApiResult.success<Brand>(data);
        } catch (error: any) {
            return ApiResult.error(error.response?.data?.Message ?? error.message);
        }
    };
};

export default useFindBrand;