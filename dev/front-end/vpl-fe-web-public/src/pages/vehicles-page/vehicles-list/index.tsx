import { Grid } from "@mui/material";
import { ApiResult, ApiResultStatus } from "../../../models/api-result-model";
import { Model } from "../../../models/model";
import { Vehicle } from "../../../models/vehicle";
import VehicleCard from "../vehicle-card";

export interface VehiclesListProps {
    vehiclesResult: ApiResult;
}

const VehiclesList = ({ vehiclesResult }: VehiclesListProps) => {

    return (
        <>
            {vehiclesResult.status === ApiResultStatus.loading && <p>Carregando...</p>}
            {vehiclesResult.status === ApiResultStatus.error && <p>Erro: {vehiclesResult.errorMessage}</p>}

            {vehiclesResult.status === ApiResultStatus.success && vehiclesResult.data.length > 0 &&
                <Grid container spacing={1} sx={{ my: 3 }}>
                    {vehiclesResult.data.map((vehicle: Vehicle) => (
                        <Grid item key={vehicle.id} xs={12} lg={6}>
                            <VehicleCard {...vehicle} />
                        </Grid>
                    ))}
                </Grid>
            }

            {vehiclesResult.status === ApiResultStatus.success && vehiclesResult.data.length === 0 &&
                <p>:( Nenhum Registro Encontrado</p>
            }
        </>
    );
};

export default VehiclesList;