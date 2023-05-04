import { ApiResult } from "../../models/api-result-model";
import { Brand } from "../../models/brand";
import { Evaluation } from "../../models/evaluation";
import BrandsService from "../../services/brands-service";
import EvaluationsService from "../../services/evaluations-service";

const useListEvaluationsByVehicleId = () => {
    return async (vehicleId: number) => {
        try {
            const data = await EvaluationsService.instance.listByVehicleId(vehicleId);
            return ApiResult.success<Evaluation[]>(data);
        } catch (error: any) {
            return ApiResult.error(error.response?.data?.Message ?? error.message);
        }
    };
};

export default useListEvaluationsByVehicleId;