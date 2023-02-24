import { VehicleType } from "./model";

export class Vehicle {
    id!: number;
    name!: string;
    brandName!: string;
    brandLogo!: string;
    model!: string;
    productionYear!: number;
    modelYear!: number;
    type!: VehicleType;
}