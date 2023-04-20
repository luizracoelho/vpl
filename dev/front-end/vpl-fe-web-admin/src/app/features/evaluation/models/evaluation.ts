export class Evaluation {
    id!: number;
    year!: number;
    value!: number;
    vehicleId!: number;
    vehicleName?: string;
    referenceYearName!: number;
    referenceYearId!: number;

    // Propriedades de visualização
    isRemoving?: boolean;
}