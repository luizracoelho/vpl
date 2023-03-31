import { HttpStatusCode } from "axios";
import AppHttp from "../http/app-http";
import { Vehicle } from "../models/vehicle";

export default class VehiclesService {
    static myInstance: VehiclesService | null = null;

    static get instance() {
        return VehiclesService.myInstance ??= new VehiclesService();
    }

    async list(): Promise<Vehicle[]> {
        const response = await AppHttp.instance.get('/vehicles/vehicles');

        if (response.status === HttpStatusCode.Ok)
            return response.data;
        else
            throw new Error(response.data);
    }

    async listByModelId(brandId: number): Promise<Vehicle[]> {
        const response = await AppHttp.instance.get(`/vehicles/vehicles/model/${brandId}`);

        if (response.status === HttpStatusCode.Ok)
            return response.data;
        else
            throw new Error(response.data);
    };
}