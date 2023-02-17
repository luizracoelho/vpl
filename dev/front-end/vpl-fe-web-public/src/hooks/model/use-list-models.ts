import { ApiResult } from "../../models/api-result-model";
import { Model } from "../../models/model";
import ModelsService from "../../services/models-service";

const useListModels = () => {
    return async () => {
        try {
            const data = await ModelsService.instance.list();
            return ApiResult.success<Model[]>(data);
        } catch (error: any) {
            return ApiResult.error(error.response?.data?.Message ?? error.message);
        }
    };
};

export default useListModels;