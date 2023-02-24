import { Avatar, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useFindBrand from "../../hooks/brand/use-find-brand";
import useFindModel from "../../hooks/model/use-find-model";
import useListVehicles from "../../hooks/vehicle/use-list-vehicles";
import useListVehiclesByModelId from "../../hooks/vehicle/use-list-vehicles-by-model-id";
import { ApiResult, ApiResultStatus } from "../../models/api-result-model";
import VehiclesList from "./vehicles-list";

const VehiclesPage = () => {
    const [vehiclesResult, setVehiclesResult] = useState<ApiResult>(ApiResult.start());
    const [brandResult, setBrandResult] = useState<ApiResult>(ApiResult.start());

    const { brandId, modelId } = useParams();
    const { state } = useLocation();

    const listVehicles = useListVehicles();
    const listVehiclesByModelId = useListVehiclesByModelId();
    const findBrand = useFindBrand();

    const fetchData = async () => {
        if (modelId && state)
            setVehiclesResult(await listVehiclesByModelId(parseInt(modelId)));
        else if (brandId && modelId) {
            setBrandResult(await findBrand(parseInt(brandId)));
            setVehiclesResult(await listVehiclesByModelId(parseInt(modelId)));
        }
        else
            setVehiclesResult(await listVehicles());
    };

    useEffect(() => {
        if (vehiclesResult.status === ApiResultStatus.loading)
            fetchData();
    });


    if (state) {
        const { brandName, brandLogo, modelName } = state;

        return (
            <>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'between',
                    alignItems: 'center',
                    mb: 5
                }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h1" component="h1">Veículos</Typography>
                        <Typography variant="h6" component="p">
                            Encontre o seu novo veículo do modelo <strong>{modelName}</strong>,
                            <br />
                            clique sobre ele para ver o veículo.
                        </Typography>
                    </Box>
                    <Avatar
                        src={brandLogo}
                        alt={brandName}
                        sx={{
                            width: 120,
                            height: 120
                        }}>
                        <Typography variant="h4">{brandName[0]}</Typography>
                    </Avatar>
                </Box>

                <VehiclesList vehiclesResult={vehiclesResult} />

            </>
        )
    } else if (brandId && modelId) {
        let brandName: string = '';
        let brandLogo: string = '';
        let modelName: string = '';

        if (vehiclesResult.status === ApiResultStatus.success && vehiclesResult.data.length > 0) {
            brandName = vehiclesResult.data[0].brandName;
            brandLogo = vehiclesResult.data[0].brandLogo;
            modelName = vehiclesResult.data[0].model;
        } else if (brandResult.status === ApiResultStatus.success) {
            brandName = brandResult.data.name;
            brandLogo = brandResult.data.logo;
        }

        return (
            <>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'between',
                    alignItems: 'center',
                    mb: 5
                }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h1" component="h1">Veículos</Typography>
                        <Typography variant="h6" component="p">
                            Encontre o seu novo veículo do modelo <strong>{modelName}</strong>,
                            <br />
                            clique sobre ele para ver o veículo.
                        </Typography>
                    </Box>
                    <Avatar
                        src={brandLogo}
                        alt={brandName}
                        sx={{
                            width: 120,
                            height: 120
                        }}>
                        <Typography variant="h4">{brandName}</Typography>
                    </Avatar>
                </Box>

                <VehiclesList vehiclesResult={vehiclesResult} />

            </>
        )
    } else {
        return (
            <>
                <Box sx={{ mb: 5 }}>
                    <Typography variant="h1" component="h1">Veículos</Typography>
                    <Typography variant="h6" component="p">
                        Encontre o seu novo veículo,
                        <br />
                        clique para ver o veículo.
                    </Typography>
                </Box>

                <VehiclesList vehiclesResult={vehiclesResult} />

            </>
        )
    }
}

export default VehiclesPage;