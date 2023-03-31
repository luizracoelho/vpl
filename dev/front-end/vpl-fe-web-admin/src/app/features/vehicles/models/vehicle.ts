import { Type } from "@angular/core";
import { Brand } from "../../brand/models/brand";
import { VehicleType } from "../../model/enums/vehicle-type";
import { Model } from "../../model/models/model";

export class Vehicle {

    id!: number;
    brandId!: number;
    brand!: Brand ;
    modelId!: number;
    model!: Model ;
    name!: String;
    productionYear!: Date;
    modelYear!: Date;
    vehicleType!: VehicleType; 


    // propriedades de visualização
    isRemoving?: boolean;
}