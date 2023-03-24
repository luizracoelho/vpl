import { VehicleType } from "../enums/vehicle-type";

export class CreateModel {
    brandId!: number;
    name!: string;
    description!: string;
    type!: VehicleType;
    productionStart!: Date;
}