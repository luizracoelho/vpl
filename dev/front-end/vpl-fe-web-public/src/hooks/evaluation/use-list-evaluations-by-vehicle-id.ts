import { PriceReference } from "../../enums/price-reference.enum";
import { ApiResult } from "../../models/api-result-model";
import { Evaluation } from "../../models/evaluation";
import EvaluationsService from "../../services/evaluations-service";

const useListEvaluationsByVehicleId = () => {
    return async (vehicleId: number, priceReference: PriceReference) => {
        try {
            const data = await EvaluationsService.instance.listByVehicleId(vehicleId, priceReference);
            return ApiResult.success<Evaluation[]>(data);
        } catch (error: any) {
            return ApiResult.error(error.response?.data?.Message ?? error.message);
        }
    };
};

export default useListEvaluationsByVehicleId;