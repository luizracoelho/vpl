import { ApiResult } from "../../models/api-result-model";
import { Evaluation } from "../../models/evaluation";
import { Model } from "../../models/model";
import EvaluationsService from "../../services/evaluation-service";

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