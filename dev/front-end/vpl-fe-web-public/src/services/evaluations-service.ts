import { HttpStatusCode } from "axios";
import AppHttp from "../http/app-http";
import { Vehicle } from "../models/vehicle";
import { Evaluation } from "../models/evaluation";

export default class EvaluationsService {
    static myInstance: EvaluationsService | null = null;

    static get instance() {
        return EvaluationsService.myInstance ??= new EvaluationsService();
    }

    async listByVehicleId(vehicleId: number): Promise<Evaluation[]> {
        const response = await AppHttp.instance.get(`/prices/evaluations/listById/${vehicleId}`);

        if (response.status === HttpStatusCode.Ok)
            return response.data;
        else
            throw new Error(response.data);
    };
}