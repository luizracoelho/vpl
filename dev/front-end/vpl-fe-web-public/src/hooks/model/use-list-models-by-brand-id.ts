import { ApiResult } from "../../models/api-result-model";
import { Model } from "../../models/model";
import ModelsService from "../../services/models-service";

const useListModelsByBrandId = () => {
    return async (brandId: number) => {
        try {
            const data = await ModelsService.instance.listByBrandId(brandId);
            return ApiResult.success<Model[]>(data);
        } catch (error: any) {
            return ApiResult.error(error.response?.data?.Message ?? error.message);
        }
    };
};

export default useListModelsByBrandId;