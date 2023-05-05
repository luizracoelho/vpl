import { HttpStatusCode } from "axios";
import AppHttp from "../http/app-http";
import { Evaluation } from "../models/evaluation";

export default class EvaluationsService {
    static myInstance: EvaluationsService | null = null;

    static get instance() {
        return EvaluationsService.myInstance ??= new EvaluationsService();
    }

    async list(): Promise<Evaluation[]> {
        const response = await AppHttp.instance.get('/prices/evaluations');

        if (response.status === HttpStatusCode.Ok)
            return response.data;
        else
            throw new Error(response.data);
    }

    async listByVehicleId(vehicleId: number): Promise<Evaluation[]> {
        const response = await AppHttp.instance.get(`/prices/evaluations/vehicle/${vehicleId}`);

        if (response.status === HttpStatusCode.Ok)
            return response.data;
        else
            throw new Error(response.data);
    };

    async find(id: number): Promise<Evaluation> {
        const response = await AppHttp.instance.get(`/prices/evaluations/${id}`);

        if (response.status === HttpStatusCode.Ok)
            return response.data;
        else
            throw new Error(response.data);
    }
}