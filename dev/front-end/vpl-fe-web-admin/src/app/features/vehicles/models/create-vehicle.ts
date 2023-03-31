import { Brand } from "../../brand/models/brand";
import { VehicleType } from "../../model/enums/vehicle-type";
import { Model } from "../../model/models/model";

export class CreateVehicle {

    brandId!: number;
    brand!: Brand ;
    modelId!: number;
    model!: Model ;
    Name!: String;
    productionYear!: Date;
    modelYear!: Date;
    vehicleType!: VehicleType; 
}