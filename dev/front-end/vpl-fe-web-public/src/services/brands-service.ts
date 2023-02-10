import { HttpStatusCode } from "axios";
import AppHttp from "../http/app-http";
import { Brand } from "../models/brand";

export default class BrandsService {
    static myInstance: BrandsService | null = null;

    static get instance() {
        return BrandsService.myInstance ??= new BrandsService();
    }

    async list(): Promise<Brand[]> {
        const response = await AppHttp.instance.get('/brands');

        if (response.status === HttpStatusCode.Ok)
            return response.data;
        else
            throw new Error(response.data);
    }
}