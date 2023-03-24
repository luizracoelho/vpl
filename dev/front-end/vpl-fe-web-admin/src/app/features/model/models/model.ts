import { VehicleType } from "../enums/vehicle-type";

export class Model {
    id!: number;
    brandId!: number;
    brandName?: string;
    brandLogo?: string;
    name!: string;
    description!: string;
    type!: VehicleType;
    productionStart!: Date;
    productionEnd?: Date;
    productionEnded!: boolean;

    // propriedades de visualização
    isRemoving?: boolean;
}