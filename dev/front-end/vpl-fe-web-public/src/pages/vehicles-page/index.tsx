import { Avatar, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFindBrand from "../../hooks/brand/use-find-brand";
import useFindModel from "../../hooks/model/use-find-model";
import useListVehicles from "../../hooks/vehicle/use-list-vehicles";
import useListVehiclesByModelId from "../../hooks/vehicle/use-list-vehicles-by-model-id";
import { ApiResult, ApiResultStatus } from "../../models/api-result-model";
import VehiclesList from "./vehicles-list";
import { Brand } from "../../models/brand";
import { PriceReference } from "../../enums/price-reference.enum";

// JSX Veículos padrão
const VehiclesFlow = () => {
    const [vehiclesResult, setVehiclesResult] = useState<ApiResult>(ApiResult.start());

    const listVehicles = useListVehicles();

    const fetchDataVehicles = async () => {
        setVehiclesResult(await listVehicles());
    };

    useEffect(() => {
        if (vehiclesResult.status === ApiResultStatus.loading) {
            fetchDataVehicles();
        }
    });

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
    );
};

// JSX Veículo por Marca/Modelo
const VehiclesBrandModelFlow = () => {
    const [vehiclesResult, setVehiclesResult] = useState<ApiResult>(ApiResult.start());
    const [brandResult, setBrandResult] = useState<ApiResult>(ApiResult.start());

    const { brandId, modelId } = useParams();
    const { state } = useLocation();

    const listVehiclesByModelId = useListVehiclesByModelId();
    const findBrand = useFindBrand();

    const fetchDataBrandModel = async () => {
        if (modelId && state)
            setVehiclesResult(await listVehiclesByModelId(parseInt(modelId)));
        else if (brandId && modelId) {
            setBrandResult(await findBrand(parseInt(brandId)));
            setVehiclesResult(await listVehiclesByModelId(parseInt(modelId)));
        }
    };

    useEffect(() => {
        if (vehiclesResult.status === ApiResultStatus.loading) {
            fetchDataBrandModel();
        }
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
    } else {
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
    }
}

// JSX Veículos padrão
const VehiclesReferenceYearFlow = () => {
    const [vehiclesResult, setVehiclesResult] = useState<ApiResult>(ApiResult.start());

    const { priceReference, year } = useParams();

    const navigate = useNavigate();

    // TODO: Validar ano da tabela de preço
    // TODO: Listar método correto no back-end
    // const listVehiclesByReferenceYear = useListVehiclesByReferenceYear();
    const listVehicles = useListVehicles();

    const fetchDataReferenceYear = async () => {
        if (priceReference && year) {
            setVehiclesResult(await listVehicles());
            // setVehiclesResult(await listVehiclesByReferenceYear(parseInt(priceReference), parseInt(year)));
        }
    };

    useEffect(() => {
        if (vehiclesResult.status === ApiResultStatus.loading) {
            fetchDataReferenceYear();
        }
    });

    let priceReferenceName: string | null = null;

    useEffect(() => {
        if (!priceReferenceName) {
            navigate(-1);
        }
    }, [priceReferenceName]);

    if (priceReference) {
        const value: PriceReference = parseInt(priceReference) as PriceReference;

        switch (value) {
            case PriceReference.Fipe:
                priceReferenceName = 'FIPE';
                break;
            case PriceReference.Molicar:
                priceReferenceName = 'Molicar';
                break;
            default:
                priceReferenceName = '';
                break;
        }
    }

    return (
        <>
            <Typography variant="h1" component="h1">Veículos</Typography>
            <Box sx={{ mb: 5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                    <Typography variant="h6" component="p">
                        Encontre o seu novo veículo,
                        <br />
                        clique para ver o veículo.
                    </Typography>
                </Box>
                <Box sx={{ textAlign: "end" }}>
                    <Typography component="h4" variant="h4">{year}</Typography>
                    <Typography component="h5" variant="h5">{priceReferenceName}</Typography>
                </Box>
            </Box>

            <VehiclesList vehiclesResult={vehiclesResult} />
        </>
    );
};






// Descobrir o fluxo
enum VehiclesPageFlow {
    Vehicles,
    BrandModel,
    PriceReferenceYear
}

function getVehiclesPageFlow(modelId: any, state: any, brandId: any, priceReference: any, year: any) {
    return ((modelId && state) || (brandId && modelId)) ? VehiclesPageFlow.BrandModel :
        (priceReference && year) ? VehiclesPageFlow.PriceReferenceYear :
            VehiclesPageFlow.Vehicles;
}

const VehiclesPage = () => {

    const { brandId, modelId, priceReference, year } = useParams();
    const { state } = useLocation();

    // Recuperar fluxo
    const flow = getVehiclesPageFlow(modelId, state, brandId, priceReference, year);

    switch (flow) {
        case VehiclesPageFlow.Vehicles:
            return <VehiclesFlow />
        case VehiclesPageFlow.BrandModel:
            return <VehiclesBrandModelFlow />
        case VehiclesPageFlow.PriceReferenceYear:
            return <VehiclesReferenceYearFlow />
    }
}

export default VehiclesPage;